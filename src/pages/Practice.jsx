import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as mpPose from "@mediapipe/pose";

function App() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [squatCount, setSquatCount] = useState(0);
    const [pushupCount, setPushupCount] = useState(0);
    const [jumpingJackCount, setJumpingJackCount] = useState(0);
    const [toeTouchCount, setToeTouchCount] = useState(0);
    const [curlCount, setCurlCount] = useState(0); // New state for curl counter
    const [exerciseStatus, setExerciseStatus] = useState("Ready");

    let lastSquatPos = "up", lastPushupPos = "up", lastJumpingJackPos = "closed";
    let lastToeTouchPos = "up";
    let curlStage = null; // New variable for curl stage tracking

    let squatCooldown = false, pushupCooldown = false, jumpingJackCooldown = false;
    let toeTouchCooldown = false;
    let curlCooldown = false; // New cooldown for curl counter

    useEffect(() => {
        async function initialize() {
            await tf.setBackend("webgl");
            await tf.ready();
            await setupCamera();
        }

        initialize();
    }, []);

    async function setupCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                    loadPoseModel();
                };
            }
        } catch (error) {
            console.error("❌ Camera access error:", error);
        }
    }

    function loadPoseModel() {
        const pose = new mpPose.Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7,
        });

        pose.onResults(onResults);
        startTracking(pose);
    }

    function startTracking(pose) {
        async function detectPose() {
            if (!videoRef.current) return;
            await pose.send({ image: videoRef.current });
            requestAnimationFrame(detectPose);
        }
        detectPose();
    }

    function onResults(results) {
        if (!canvasRef.current || !videoRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        
        // Set canvas dimensions to match video
        if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
        }
        
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        if (results.poseLandmarks) {
            // Draw skeleton connections for better visualization
            drawSkeleton(results.poseLandmarks, ctx);
            drawKeypoints(results.poseLandmarks, ctx);
            
            // Draw the status box (similar to the Python code)
            drawStatusBox(ctx, curlCount, curlStage);
            
            // Detect exercises
            countSquats(results.poseLandmarks);
            countPushups(results.poseLandmarks);
            countJumpingJacks(results.poseLandmarks);
            countAlternateToeTouch(results.poseLandmarks);
            countCurls(results.poseLandmarks, ctx); // New function for counting curls
            
            // Update exercise status based on poses
            updateExerciseStatus(results.poseLandmarks);
        } else {
            setExerciseStatus("No pose detected. Please stand in frame.");
        }
    }
    
    // New function to draw status box similar to Python code
    function drawStatusBox(ctx, counter, stage) {
        // Setup status box
        ctx.fillStyle = "rgba(245, 117, 16, 0.75)";
        ctx.fillRect(0, 0, 225, 73);
        
        // Rep data
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText('CURLS', 15, 12);
        
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText(counter, 10, 60);
        
        // Stage data
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText('STAGE', 65, 12);
        
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText(stage || "", 60, 60);
    }
    
    // Draw skeleton to visualize body position better
    function drawSkeleton(landmarks, ctx) {
        // Define connections between keypoints
        const connections = [
            // Torso
            [mpPose.POSE_LANDMARKS.LEFT_SHOULDER, mpPose.POSE_LANDMARKS.RIGHT_SHOULDER],
            [mpPose.POSE_LANDMARKS.LEFT_SHOULDER, mpPose.POSE_LANDMARKS.LEFT_HIP],
            [mpPose.POSE_LANDMARKS.RIGHT_SHOULDER, mpPose.POSE_LANDMARKS.RIGHT_HIP],
            [mpPose.POSE_LANDMARKS.LEFT_HIP, mpPose.POSE_LANDMARKS.RIGHT_HIP],
            
            // Arms
            [mpPose.POSE_LANDMARKS.LEFT_SHOULDER, mpPose.POSE_LANDMARKS.LEFT_ELBOW],
            [mpPose.POSE_LANDMARKS.LEFT_ELBOW, mpPose.POSE_LANDMARKS.LEFT_WRIST],
            [mpPose.POSE_LANDMARKS.RIGHT_SHOULDER, mpPose.POSE_LANDMARKS.RIGHT_ELBOW],
            [mpPose.POSE_LANDMARKS.RIGHT_ELBOW, mpPose.POSE_LANDMARKS.RIGHT_WRIST],
            
            // Legs
            [mpPose.POSE_LANDMARKS.LEFT_HIP, mpPose.POSE_LANDMARKS.LEFT_KNEE],
            [mpPose.POSE_LANDMARKS.LEFT_KNEE, mpPose.POSE_LANDMARKS.LEFT_ANKLE],
            [mpPose.POSE_LANDMARKS.RIGHT_HIP, mpPose.POSE_LANDMARKS.RIGHT_KNEE],
            [mpPose.POSE_LANDMARKS.RIGHT_KNEE, mpPose.POSE_LANDMARKS.RIGHT_ANKLE]
        ];
        
        // Draw each connection
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        
        connections.forEach(connection => {
            const [idx1, idx2] = connection;
            const point1 = landmarks[idx1];
            const point2 = landmarks[idx2];
            
            if (point1 && point2 && point1.visibility > 0.5 && point2.visibility > 0.5) {
                ctx.beginPath();
                ctx.moveTo(point1.x * canvasRef.current.width, point1.y * canvasRef.current.height);
                ctx.lineTo(point2.x * canvasRef.current.width, point2.y * canvasRef.current.height);
                ctx.stroke();
            }
        });
    }
    
    // Update status message based on current exercise detection
    function updateExerciseStatus(landmarks) {
        const leftHip = landmarks[mpPose.POSE_LANDMARKS.LEFT_HIP];
        const rightHip = landmarks[mpPose.POSE_LANDMARKS.RIGHT_HIP];
        const leftKnee = landmarks[mpPose.POSE_LANDMARKS.LEFT_KNEE];
        const rightKnee = landmarks[mpPose.POSE_LANDMARKS.RIGHT_KNEE];
        
        if (!leftHip || !rightHip || !leftKnee || !rightKnee) {
            setExerciseStatus("Move into frame completely");
            return;
        }
        
        // Check visibility scores
        const keypoints = [
            landmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER],
            landmarks[mpPose.POSE_LANDMARKS.RIGHT_SHOULDER],
            landmarks[mpPose.POSE_LANDMARKS.LEFT_ELBOW],
            landmarks[mpPose.POSE_LANDMARKS.RIGHT_ELBOW],
            landmarks[mpPose.POSE_LANDMARKS.LEFT_WRIST],
            landmarks[mpPose.POSE_LANDMARKS.RIGHT_WRIST],
            landmarks[mpPose.POSE_LANDMARKS.LEFT_HIP],
            landmarks[mpPose.POSE_LANDMARKS.RIGHT_HIP],
            landmarks[mpPose.POSE_LANDMARKS.LEFT_KNEE],
            landmarks[mpPose.POSE_LANDMARKS.RIGHT_KNEE],
            landmarks[mpPose.POSE_LANDMARKS.LEFT_ANKLE],
            landmarks[mpPose.POSE_LANDMARKS.RIGHT_ANKLE]
        ];
        
        const avgVisibility = keypoints.reduce((sum, point) => sum + (point?.visibility || 0), 0) / keypoints.length;
        
        if (avgVisibility < 0.7) {
            setExerciseStatus("Low visibility. Adjust lighting or position");
            return;
        }
        
        // Different statuses for different exercises based on pose
        if (curlStage === "down") {
            setExerciseStatus("Curl - Arm down ⬇️");
        } else if (curlStage === "up") {
            setExerciseStatus("Curl - Arm up ⬆️");
        } else if (lastSquatPos === "down") {
            setExerciseStatus("Squat - Going down ⬇️");
        } else if (lastPushupPos === "down") {
            setExerciseStatus("Pushup - Lowering ⬇️");
        } else if (lastJumpingJackPos === "open") {
            setExerciseStatus("Jumping Jack - Arms up ⬆️");
        } else {
            setExerciseStatus("Ready - Position detected ✓");
        }
    }

    function drawKeypoints(landmarks, ctx) {
        landmarks.forEach((point, index) => {
            if (index < 33) {
                ctx.beginPath();
                ctx.arc(point.x * canvasRef.current.width, point.y * canvasRef.current.height, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
            }
        });
    }

    // New function to count bicep curls (converted from Python code)
    function countCurls(landmarks, ctx) {
        const leftShoulder = landmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER];
        const leftElbow = landmarks[mpPose.POSE_LANDMARKS.LEFT_ELBOW];
        const leftWrist = landmarks[mpPose.POSE_LANDMARKS.LEFT_WRIST];
        
        if (!leftShoulder || !leftElbow || !leftWrist) return;
        
        // Get coordinates
        const shoulder = [
            leftShoulder.x * canvasRef.current.width,
            leftShoulder.y * canvasRef.current.height
        ];
        const elbow = [
            leftElbow.x * canvasRef.current.width,
            leftElbow.y * canvasRef.current.height
        ];
        const wrist = [
            leftWrist.x * canvasRef.current.width,
            leftWrist.y * canvasRef.current.height
        ];
        
        // Calculate angle
        const angle = calculateAngle(shoulder, elbow, wrist);
        
        // Visualize angle
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(Math.round(angle), elbow[0], elbow[1]);
        
        // Curl counter logic
        if (angle > 160 && curlStage !== "down") {
            curlStage = "down";
        }
        if (angle < 30 && curlStage === "down" && !curlCooldown) {
            curlStage = "up";
            setCurlCount(prev => prev + 1);
            curlCooldown = true;
            setTimeout(() => curlCooldown = false, 500);
        }
    }

    function countSquats(landmarks) {
        const leftHip = landmarks[mpPose.POSE_LANDMARKS.LEFT_HIP];
        const rightHip = landmarks[mpPose.POSE_LANDMARKS.RIGHT_HIP];
        const leftKnee = landmarks[mpPose.POSE_LANDMARKS.LEFT_KNEE];
        const rightKnee = landmarks[mpPose.POSE_LANDMARKS.RIGHT_KNEE];
        const leftAnkle = landmarks[mpPose.POSE_LANDMARKS.LEFT_ANKLE];
        const rightAnkle = landmarks[mpPose.POSE_LANDMARKS.RIGHT_ANKLE];
        const leftShoulder = landmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER];
        const rightShoulder = landmarks[mpPose.POSE_LANDMARKS.RIGHT_SHOULDER];

        if (!leftHip || !rightHip || !leftKnee || !rightKnee || !leftAnkle || !rightAnkle || 
            !leftShoulder || !rightShoulder) return;

        // Calculate joint positions in pixel coordinates
        const avgHipY = ((leftHip.y + rightHip.y) / 2) * canvasRef.current.height;
        const avgKneeY = ((leftKnee.y + rightKnee.y) / 2) * canvasRef.current.height;
        const avgAnkleY = ((leftAnkle.y + rightAnkle.y) / 2) * canvasRef.current.height;
        const avgShoulderY = ((leftShoulder.y + rightShoulder.y) / 2) * canvasRef.current.height;

        // Calculate knee angle to detect proper squat form
        const leftHipKneeAngle = calculateAngle(
            [leftHip.x * canvasRef.current.width, leftHip.y * canvasRef.current.height],
            [leftKnee.x * canvasRef.current.width, leftKnee.y * canvasRef.current.height],
            [leftAnkle.x * canvasRef.current.width, leftAnkle.y * canvasRef.current.height]
        );
        
        const rightHipKneeAngle = calculateAngle(
            [rightHip.x * canvasRef.current.width, rightHip.y * canvasRef.current.height],
            [rightKnee.x * canvasRef.current.width, rightKnee.y * canvasRef.current.height],
            [rightAnkle.x * canvasRef.current.width, rightAnkle.y * canvasRef.current.height]
        );

        const avgKneeAngle = (leftHipKneeAngle + rightHipKneeAngle) / 2;
        
        // More accurate squat detection using both hip position and knee angle
        // A proper squat should have:
        // 1. Hip lowered below a certain point
        // 2. Knee angle decreased significantly (more bent knees)
        const kneeAngleThreshold = 120; // Degrees - lower value means deeper bend
        const hipPositionThreshold = 0.2; // Relative to knee position
        
        const hipKneeDistance = avgKneeY - avgHipY;
        const kneeAnkleDistance = avgAnkleY - avgKneeY;
        
        // Hip should lower to close to knee level for a proper squat
        const hipLoweredEnough = hipKneeDistance < kneeAnkleDistance * hipPositionThreshold;
        
        // Check if user is in squat position (knees bent significantly and hips lowered)
        if (avgKneeAngle < kneeAngleThreshold && hipLoweredEnough && lastSquatPos === "up" && !squatCooldown) {
            // Valid squat detected
            setSquatCount(prev => prev + 1);
            lastSquatPos = "down";
            squatCooldown = true;
            setTimeout(() => squatCooldown = false, 800);
        } else if (avgKneeAngle > 160 && lastSquatPos === "down") {
            // Standing up position detected
            lastSquatPos = "up";
        }
    }

    function countPushups(landmarks) {
        const leftShoulder = landmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER];
        const rightShoulder = landmarks[mpPose.POSE_LANDMARKS.RIGHT_SHOULDER];
        const leftElbow = landmarks[mpPose.POSE_LANDMARKS.LEFT_ELBOW];
        const rightElbow = landmarks[mpPose.POSE_LANDMARKS.RIGHT_ELBOW];
        const leftWrist = landmarks[mpPose.POSE_LANDMARKS.LEFT_WRIST];
        const rightWrist = landmarks[mpPose.POSE_LANDMARKS.RIGHT_WRIST];
        const leftHip = landmarks[mpPose.POSE_LANDMARKS.LEFT_HIP];
        const rightHip = landmarks[mpPose.POSE_LANDMARKS.RIGHT_HIP];

        if (!leftShoulder || !rightShoulder || !leftElbow || !rightElbow || 
            !leftWrist || !rightWrist || !leftHip || !rightHip) return;

        // Calculate positions in pixel coordinates
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;
        
        const leftShoulderPos = { x: leftShoulder.x * canvasWidth, y: leftShoulder.y * canvasHeight };
        const rightShoulderPos = { x: rightShoulder.x * canvasWidth, y: rightShoulder.y * canvasHeight };
        const leftElbowPos = { x: leftElbow.x * canvasWidth, y: leftElbow.y * canvasHeight };
        const rightElbowPos = { x: rightElbow.x * canvasWidth, y: rightElbow.y * canvasHeight };
        const leftWristPos = { x: leftWrist.x * canvasWidth, y: leftWrist.y * canvasHeight };
        const rightWristPos = { x: rightWrist.x * canvasWidth, y: rightWrist.y * canvasHeight };
        const leftHipPos = { x: leftHip.x * canvasWidth, y: leftHip.y * canvasHeight };
        const rightHipPos = { x: rightHip.x * canvasWidth, y: rightHip.y * canvasHeight };

        // Calculate shoulder and hip positions
        const avgShoulderY = (leftShoulderPos.y + rightShoulderPos.y) / 2;
        const avgHipY = (leftHipPos.y + rightHipPos.y) / 2;

        // Calculate elbow angles to detect pushup form
        const leftElbowAngle = calculateAngle(
            [leftShoulderPos.x, leftShoulderPos.y],
            [leftElbowPos.x, leftElbowPos.y],
            [leftWristPos.x, leftWristPos.y]
        );
        
        const rightElbowAngle = calculateAngle(
            [rightShoulderPos.x, rightShoulderPos.y],
            [rightElbowPos.x, rightElbowPos.y],
            [rightWristPos.x, rightWristPos.y]
        );

        const avgElbowAngle = (leftElbowAngle + rightElbowAngle) / 2;

        // Pushup detection logic
        const elbowAngleThreshold = 90; // Degrees - lower value means deeper pushup
        const shoulderHipDistanceThreshold = 0.2; // Relative to shoulder width
        
        // Check if user is in pushup position (elbows bent significantly and shoulders lowered)
        if (avgElbowAngle < elbowAngleThreshold && avgShoulderY > avgHipY && lastPushupPos === "up" && !pushupCooldown) {
            // Valid pushup detected
            setPushupCount(prev => prev + 1);
            lastPushupPos = "down";
            pushupCooldown = true;
            setTimeout(() => pushupCooldown = false, 800);
        } else if (avgElbowAngle > 160 && lastPushupPos === "down") {
            // Standing up position detected
            lastPushupPos = "up";
        }
    }

    function countJumpingJacks(landmarks) {
        const leftShoulder = landmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER];
        const rightShoulder = landmarks[mpPose.POSE_LANDMARKS.RIGHT_SHOULDER];
        const leftWrist = landmarks[mpPose.POSE_LANDMARKS.LEFT_WRIST];
        const rightWrist = landmarks[mpPose.POSE_LANDMARKS.RIGHT_WRIST];
        const leftAnkle = landmarks[mpPose.POSE_LANDMARKS.LEFT_ANKLE];
        const rightAnkle = landmarks[mpPose.POSE_LANDMARKS.RIGHT_ANKLE];
        const leftHip = landmarks[mpPose.POSE_LANDMARKS.LEFT_HIP];
        const rightHip = landmarks[mpPose.POSE_LANDMARKS.RIGHT_HIP];

        if (!leftShoulder || !rightShoulder || !leftWrist || !rightWrist || 
            !leftAnkle || !rightAnkle || !leftHip || !rightHip) return;

        // Calculate positions in pixel coordinates
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;
        
        // Track wrists (hands) instead of shoulders for more accurate detection
        const leftWristPos = { x: leftWrist.x * canvasWidth, y: leftWrist.y * canvasHeight };
        const rightWristPos = { x: rightWrist.x * canvasWidth, y: rightWrist.y * canvasHeight };
        const leftShoulderPos = { x: leftShoulder.x * canvasWidth, y: leftShoulder.y * canvasHeight };
        const rightShoulderPos = { x: rightShoulder.x * canvasWidth, y: rightShoulder.y * canvasHeight };
        const leftAnklePos = { x: leftAnkle.x * canvasWidth, y: leftAnkle.y * canvasHeight };
        const rightAnklePos = { x: rightAnkle.x * canvasWidth, y: rightAnkle.y * canvasHeight };
        const leftHipPos = { x: leftHip.x * canvasWidth, y: leftHip.y * canvasHeight };
        const rightHipPos = { x: rightHip.x * canvasWidth, y: rightHip.y * canvasHeight };

        // Calculate horizontal distance between feet
        const feetDistance = Math.abs(leftAnklePos.x - rightAnklePos.x);
        const hipDistance = Math.abs(leftHipPos.x - rightHipPos.x);
        
        // Normalize feet distance relative to hip width to account for different camera distances
        const normalizedFeetDistance = feetDistance / hipDistance;
        
        // Calculate hands positions relative to shoulders
        // In jumping jacks, hands go above shoulders
        const leftHandAboveShoulder = leftWristPos.y < leftShoulderPos.y;
        const rightHandAboveShoulder = rightWristPos.y < rightShoulderPos.y;
        
        // Calculate horizontal distance between hands
        const handsDistance = Math.abs(leftWristPos.x - rightWristPos.x);
        const shoulderDistance = Math.abs(leftShoulderPos.x - rightShoulderPos.x);
        
        // Hands should be wide apart in the "open" position
        // Normalize to shoulder width to account for different body sizes
        const normalizedHandsDistance = handsDistance / shoulderDistance;
        
        // Define thresholds for jumping jack detection
        const feetApartThreshold = 1.5; // Feet should be wider than hip width
        const handsApartThreshold = 1.8; // Hands should be wider than shoulder width
        
        // Check if in "open" position (hands up and feet apart)
        const inOpenPosition = 
            leftHandAboveShoulder && 
            rightHandAboveShoulder && 
            normalizedHandsDistance > handsApartThreshold && 
            normalizedFeetDistance > feetApartThreshold;
            
        // Check if in "closed" position (hands down and feet together)
        const inClosedPosition = 
            !leftHandAboveShoulder && 
            !rightHandAboveShoulder && 
            normalizedFeetDistance < 1.2;
        
        // Count jumping jack when transitioning from closed to open position
        if (inOpenPosition && lastJumpingJackPos === "closed" && !jumpingJackCooldown) {
            setJumpingJackCount(prev => prev + 1);
            lastJumpingJackPos = "open";
            jumpingJackCooldown = true;
            setTimeout(() => jumpingJackCooldown = false, 500);
        } else if (inClosedPosition && lastJumpingJackPos === "open") {
            lastJumpingJackPos = "closed";
        }
    }

    // Function to count Alternate Toe Touch
    function countAlternateToeTouch(landmarks) {
        const leftShoulder = landmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER];
        const rightShoulder = landmarks[mpPose.POSE_LANDMARKS.RIGHT_SHOULDER];
        const leftHip = landmarks[mpPose.POSE_LANDMARKS.LEFT_HIP];
        const rightHip = landmarks[mpPose.POSE_LANDMARKS.RIGHT_HIP];
        const leftWrist = landmarks[mpPose.POSE_LANDMARKS.LEFT_WRIST];
        const rightWrist = landmarks[mpPose.POSE_LANDMARKS.RIGHT_WRIST];
        const leftAnkle = landmarks[mpPose.POSE_LANDMARKS.LEFT_ANKLE];
        const rightAnkle = landmarks[mpPose.POSE_LANDMARKS.RIGHT_ANKLE];

        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip || 
            !leftWrist || !rightWrist || !leftAnkle || !rightAnkle) return;

        // Calculate positions in pixel coordinates
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;

        const leftWristPos = { x: leftWrist.x * canvasWidth, y: leftWrist.y * canvasHeight };
        const rightWristPos = { x: rightWrist.x * canvasWidth, y: rightWrist.y * canvasHeight };
        const leftAnklePos = { x: leftAnkle.x * canvasWidth, y: leftAnkle.y * canvasHeight };
        const rightAnklePos = { x: rightAnkle.x * canvasWidth, y: rightAnkle.y * canvasHeight };

        // Check if wrist is close to opposite ankle (toe touch position)
        const leftWristToRightAnkleDistance = Math.sqrt(
            Math.pow(leftWristPos.x - rightAnklePos.x, 2) + 
            Math.pow(leftWristPos.y - rightAnklePos.y, 2)
        );
        const rightWristToLeftAnkleDistance = Math.sqrt(
            Math.pow(rightWristPos.x - leftAnklePos.x, 2) + 
            Math.pow(rightWristPos.y - leftAnklePos.y, 2)
        );

        const toeTouchThreshold = 50; // Distance threshold in pixels

        // Alternate toe touch detection logic
        if ((leftWristToRightAnkleDistance < toeTouchThreshold || 
             rightWristToLeftAnkleDistance < toeTouchThreshold) && 
            lastToeTouchPos === "up" && !toeTouchCooldown) {
            setToeTouchCount(prev => prev + 1);
            lastToeTouchPos = "down";
            toeTouchCooldown = true;
            setTimeout(() => toeTouchCooldown = false, 500);
        } else if (leftWristToRightAnkleDistance > toeTouchThreshold && 
                   rightWristToLeftAnkleDistance > toeTouchThreshold && 
                   lastToeTouchPos === "down") {
            lastToeTouchPos = "up";
        }
    }

    // Helper function to calculate angle between three points
    function calculateAngle(p1, p2, p3) {
        // Calculate vectors
        const vector1 = [p1[0] - p2[0], p1[1] - p2[1]];
        const vector2 = [p3[0] - p2[0], p3[1] - p2[1]];
        
        // Calculate dot product
        const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1];
        
        // Calculate magnitudes
        const magnitude1 = Math.sqrt(vector1[0] * vector1[0] + vector1[1] * vector1[1]);
        const magnitude2 = Math.sqrt(vector2[0] * vector2[0] + vector2[1] * vector2[1]);
        
        // Calculate angle in radians and convert to degrees
        const angleRadians = Math.acos(dotProduct / (magnitude1 * magnitude2));
        const angleDegrees = angleRadians * (180 / Math.PI);
        
        return angleDegrees;
    }

    return (
        <div style={{ 
            display: 'flex', 
            fontFamily: 'Arial, sans-serif', 
            padding: '20px', 
            gap: '20px', 
            alignItems: 'flex-start' 
        }}>
            {/* Video Feed on the Left */}
            <div style={{ 
                position: 'relative', 
                flex: '1', 
                maxWidth: '640px' 
            }}>
                <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted></video>
                <canvas ref={canvasRef} style={{ 
                    width: "100%", 
                    height: "480px", 
                    border: "4px solid #FF6F61", 
                    borderRadius: '12px' 
                }}></canvas>
                
                {/* Status Box */}
                <div style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    left: '20px', 
                    backgroundColor: '#FF6F61',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}>
                    <p style={{ margin: '0', fontWeight: 'bold', fontSize: '18px' }}>Status: {exerciseStatus}</p>
                </div>
            </div>
        
            {/* Output in Two Columns on the Right */}
            <div style={{ 
                flex: '1', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px' 
            }}>
                {/* First Column */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    gap: '20px' 
                }}>
                    <div style={{ 
                        padding: '20px', 
                        backgroundColor: '#FFD166', 
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '24px' }}>Squats</h2>
                        <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '0', color: '#333' }}>{squatCount}</p>
                    </div>
                    
                    <div style={{ 
                        padding: '20px', 
                        backgroundColor: '#EF476F', 
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0', color: '#FFF', fontSize: '24px' }}>Pushups</h2>
                        <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '0', color: '#FFF' }}>{pushupCount}</p>
                    </div>
                </div>
        
                {/* Second Column */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    gap: '20px' 
                }}>
                    <div style={{ 
                        padding: '20px', 
                        backgroundColor: '#118AB2', 
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0', color: '#FFF', fontSize: '24px' }}>Jumping Jacks</h2>
                        <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '0', color: '#FFF' }}>{jumpingJackCount}</p>
                    </div>
        
                    <div style={{ 
                        padding: '20px', 
                        backgroundColor: '#06D6A0', 
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '24px' }}>Toe Touch</h2>
                        <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '0', color: '#333' }}>{toeTouchCount}</p>
                    </div>
                </div>
        
                {/* Third Column (Single Box for Curls) */}
                <div style={{ 
                    padding: '20px', 
                    backgroundColor: '#073B4C', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <h2 style={{ margin: '0 0 10px 0', color: '#FFF', fontSize: '24px' }}>Curls</h2>
                    <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '0', color: '#FFF' }}>{curlCount}</p>
                </div>
            </div>
        </div>
    );
}
export default App;
