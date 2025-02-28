import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as mpPose from "@mediapipe/pose";

function App() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // State for yoga pose timers
    const [treePoseTime, setTreePoseTime] = useState(0);
    const [forwardFoldTime, setForwardFoldTime] = useState(0);
    const [mountainPoseTime, setMountainPoseTime] = useState(0);
    const [poseStatus, setPoseStatus] = useState("Ready");
    
    // Debug state for development
    const [debugInfo, setDebugInfo] = useState({});

    // Timer state refs
    const timerRefs = useRef({
        treePose: { active: false, elapsedTime: 0 },
        forwardFold: { active: false, elapsedTime: 0 },
        mountainPose: { active: false, elapsedTime: 0 },
        lastFrameTime: null
    });

    // Add new state to track whether we should reset timers
    const [resetTimers, setResetTimers] = useState(false);

    useEffect(() => {
        async function initialize() {
            await tf.setBackend("webgl");
            await tf.ready();
            await setupCamera();
        }

        initialize();
        
        // Cleanup timers on component unmount
        return () => {
            timerRefs.current = {
                treePose: { active: false, elapsedTime: 0 },
                forwardFold: { active: false, elapsedTime: 0 },
                mountainPose: { active: false, elapsedTime: 0 },
                lastFrameTime: null
            };
        };
    }, []);

    // Add reset timer function and button
    const handleResetTimers = () => {
        timerRefs.current.treePose.elapsedTime = 0;
        timerRefs.current.forwardFold.elapsedTime = 0;
        timerRefs.current.mountainPose.elapsedTime = 0;
        setTreePoseTime(0);
        setForwardFoldTime(0);
        setMountainPoseTime(0);
    };

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

        // Update last frame time for accurate timing
        const now = Date.now();
        if (!timerRefs.current.lastFrameTime) {
            timerRefs.current.lastFrameTime = now;
        }
        const deltaTime = now - timerRefs.current.lastFrameTime;
        timerRefs.current.lastFrameTime = now;

        if (results.poseLandmarks) {
            // Draw skeleton connections for better visualization
            drawSkeleton(results.poseLandmarks, ctx);
            drawKeypoints(results.poseLandmarks, ctx);

            // Detect yoga poses
            const isTreePose = detectTreePose(results.poseLandmarks);
            const isForwardFold = detectForwardFold(results.poseLandmarks);
            const isMountainPose = detectMountainPose(results.poseLandmarks);
            
            // For debugging
            setDebugInfo({
                treePose: isTreePose,
                forwardFold: isForwardFold,
                mountainPose: isMountainPose
            });
            
            // Update timers based on pose detection
            updatePoseTimers(isTreePose, isForwardFold, isMountainPose, deltaTime);
            
            // Update pose status for UI
            updatePoseStatus(isTreePose, isForwardFold, isMountainPose);
        } else {
            setPoseStatus("No pose detected. Please stand in frame.");
            pauseAllTimers();
        }
    }

    function pauseAllTimers() {
        // Stop all timers if pose is not detected or body not in frame
        if (timerRefs.current.treePose.active) {
            timerRefs.current.treePose.active = false;
        }
        
        if (timerRefs.current.forwardFold.active) {
            timerRefs.current.forwardFold.active = false;
        }
        
        if (timerRefs.current.mountainPose.active) {
            timerRefs.current.mountainPose.active = false;
        }
    }

    function updatePoseTimers(isTreePose, isForwardFold, isMountainPose, deltaTime) {
        // Tree Pose Timer
        if (isTreePose) {
            if (!timerRefs.current.treePose.active) {
                timerRefs.current.treePose.active = true;
            }
            // Add deltaTime in seconds to elapsed time
            const newTime = timerRefs.current.treePose.elapsedTime + (deltaTime / 1000);
            timerRefs.current.treePose.elapsedTime = newTime;
            setTreePoseTime(Math.floor(newTime));
        } else if (timerRefs.current.treePose.active) {
            timerRefs.current.treePose.active = false;
        }
        
        // Forward Fold Timer
        if (isForwardFold) {
            if (!timerRefs.current.forwardFold.active) {
                timerRefs.current.forwardFold.active = true;
            }
            // Add deltaTime in seconds to elapsed time
            const newTime = timerRefs.current.forwardFold.elapsedTime + (deltaTime / 1000);
            timerRefs.current.forwardFold.elapsedTime = newTime;
            setForwardFoldTime(Math.floor(newTime));
        } else if (timerRefs.current.forwardFold.active) {
            timerRefs.current.forwardFold.active = false;
        }
        
        // Mountain Pose Timer
        if (isMountainPose) {
            if (!timerRefs.current.mountainPose.active) {
                timerRefs.current.mountainPose.active = true;
            }
            // Add deltaTime in seconds to elapsed time
            const newTime = timerRefs.current.mountainPose.elapsedTime + (deltaTime / 1000);
            timerRefs.current.mountainPose.elapsedTime = newTime;
            setMountainPoseTime(Math.floor(newTime));
        } else if (timerRefs.current.mountainPose.active) {
            timerRefs.current.mountainPose.active = false;
        }
    }

    function drawSkeleton(landmarks, ctx) {
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

            if (point1 && point2 && point1.visibility > 0.3 && point2.visibility > 0.3) {
                ctx.beginPath();
                ctx.moveTo(point1.x * canvasRef.current.width, point1.y * canvasRef.current.height);
                ctx.lineTo(point2.x * canvasRef.current.width, point2.y * canvasRef.current.height);
                ctx.stroke();
            }
        });
    }

    function drawKeypoints(landmarks, ctx) {
        landmarks.forEach((point, index) => {
            if (index < 33 && point.visibility > 0.3) {
                ctx.beginPath();
                ctx.arc(point.x * canvasRef.current.width, point.y * canvasRef.current.height, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
            }
        });
    }

    // Calculate angle between three points
    function calculateAngle(a, b, c) {
        const ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        const bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
        const ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
        
        // Law of cosines
        const cosB = (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / (2 * ab * bc);
        return Math.acos(Math.min(Math.max(cosB, -1), 1)) * (180 / Math.PI);
    }

    function detectTreePose(landmarks) {
        const leftHip = landmarks[mpPose.POSE_LANDMARKS.LEFT_HIP];
        const rightHip = landmarks[mpPose.POSE_LANDMARKS.RIGHT_HIP];
        const leftKnee = landmarks[mpPose.POSE_LANDMARKS.LEFT_KNEE];
        const rightKnee = landmarks[mpPose.POSE_LANDMARKS.RIGHT_KNEE];
        const leftAnkle = landmarks[mpPose.POSE_LANDMARKS.LEFT_ANKLE];
        const rightAnkle = landmarks[mpPose.POSE_LANDMARKS.RIGHT_ANKLE];
        const leftShoulder = landmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER];
        const rightShoulder = landmarks[mpPose.POSE_LANDMARKS.RIGHT_SHOULDER];

        if (!leftHip || !rightHip || !leftKnee || !rightKnee || 
            !leftAnkle || !rightAnkle || !leftShoulder || !rightShoulder) {
            return false;
        }

        // Check if one foot is positioned near the other leg (Tree Pose)
        const leftFootNearRightKnee = Math.abs(leftAnkle.x - rightKnee.x) < 0.1 && 
                                     Math.abs(leftAnkle.y - rightKnee.y) < 0.1;
        
        const rightFootNearLeftKnee = Math.abs(rightAnkle.x - leftKnee.x) < 0.1 && 
                                     Math.abs(rightAnkle.y - leftKnee.y) < 0.1;

        // Check if shoulders are aligned and torso is upright
        const shouldersAligned = Math.abs(leftShoulder.y - rightShoulder.y) < 0.05;
        const uprightTorso = Math.abs(leftShoulder.x - leftHip.x) < 0.1 && 
                            Math.abs(rightShoulder.x - rightHip.x) < 0.1;

        return (leftFootNearRightKnee || rightFootNearLeftKnee) && shouldersAligned && uprightTorso;
    }

    function detectForwardFold(landmarks) {
        const leftHip = landmarks[mpPose.POSE_LANDMARKS.LEFT_HIP];
        const rightHip = landmarks[mpPose.POSE_LANDMARKS.RIGHT_HIP];
        const leftShoulder = landmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER];
        const rightShoulder = landmarks[mpPose.POSE_LANDMARKS.RIGHT_SHOULDER];
        const leftWrist = landmarks[mpPose.POSE_LANDMARKS.LEFT_WRIST];
        const rightWrist = landmarks[mpPose.POSE_LANDMARKS.RIGHT_WRIST];
        
        // Check if main landmarks are available with adequate visibility
        if (!leftHip || !rightHip || !leftShoulder || !rightShoulder) {
            return false;
        }

        // SIMPLIFIED CRITERIA FOR FORWARD FOLD:
        
        // 1. Shoulders are significantly below hips
        // This is the key characteristic of a forward fold
        const shouldersBelowHips = 
            (leftShoulder.y > leftHip.y + 0.1) && 
            (rightShoulder.y > rightHip.y + 0.1);
            
        // 2. Shoulders are roughly the same height (person isn't twisted)
        const shouldersAligned = Math.abs(leftShoulder.y - rightShoulder.y) < 0.15;
        
        // 3. Optional check: If wrists are visible, they should be lower than shoulders
        // But this is optional as hands might be reaching for ankles or floor
        let handsBelow = true;
        if (leftWrist && rightWrist && leftWrist.visibility > 0.5 && rightWrist.visibility > 0.5) {
            handsBelow = 
                (leftWrist.y > leftShoulder.y) && 
                (rightWrist.y > rightShoulder.y);
        }

        return shouldersBelowHips && shouldersAligned && handsBelow;
    }

    function detectMountainPose(landmarks) {
        const leftShoulder = landmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER];
        const rightShoulder = landmarks[mpPose.POSE_LANDMARKS.RIGHT_SHOULDER];
        const leftHip = landmarks[mpPose.POSE_LANDMARKS.LEFT_HIP];
        const rightHip = landmarks[mpPose.POSE_LANDMARKS.RIGHT_HIP];
        const leftKnee = landmarks[mpPose.POSE_LANDMARKS.LEFT_KNEE];
        const rightKnee = landmarks[mpPose.POSE_LANDMARKS.RIGHT_KNEE];
        const leftAnkle = landmarks[mpPose.POSE_LANDMARKS.LEFT_ANKLE];
        const rightAnkle = landmarks[mpPose.POSE_LANDMARKS.RIGHT_ANKLE];
        
        // Basic visibility check
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip || 
            !leftKnee || !rightKnee || !leftAnkle || !rightAnkle) {
            return false;
        }
        
        // IMPROVED CRITERIA FOR MOUNTAIN POSE:
        
        // 1. Vertical alignment with stricter thresholds
        const verticallyAligned = 
            (leftShoulder.y < leftHip.y) && (leftHip.y < leftKnee.y) && (leftKnee.y < leftAnkle.y) &&
            (rightShoulder.y < rightHip.y) && (rightHip.y < rightKnee.y) && (rightKnee.y < rightAnkle.y);
        
        // 2. Horizontal alignment - body parts at similar heights on both sides
        const horizontallyAligned = 
            Math.abs(leftShoulder.y - rightShoulder.y) < 0.05 && 
            Math.abs(leftHip.y - rightHip.y) < 0.05 && 
            Math.abs(leftAnkle.y - rightAnkle.y) < 0.05;
        
        // 3. Feet are not too far apart but also not crossed
        const feetTogether = 
            Math.abs(leftAnkle.x - rightAnkle.x) < 0.2 && 
            Math.abs(leftAnkle.x - rightAnkle.x) > 0.02;
        
        // 4. Body is straight (not leaning)
        const standingStraight = 
            Math.abs((leftShoulder.x + rightShoulder.x)/2 - (leftAnkle.x + rightAnkle.x)/2) < 0.1;
        
        // 5. Knees are straight (not bent as when sitting)
        // This is the key addition to distinguish from sitting
        const kneeHipAnkleAngle1 = calculateAngle(leftHip, leftKnee, leftAnkle);
        const kneeHipAnkleAngle2 = calculateAngle(rightHip, rightKnee, rightAnkle);
        const kneesStraight = 
            kneeHipAnkleAngle1 > 160 && kneeHipAnkleAngle2 > 160; // Close to 180 degrees = straight legs
        
        // 6. Check that hips and knees have significant vertical distance
        // This helps ensure the person is standing, not sitting
        const hipKneeDistance = 
            Math.abs(leftHip.y - leftKnee.y) > 0.15 && 
            Math.abs(rightHip.y - rightKnee.y) > 0.15;

        return verticallyAligned && horizontallyAligned && feetTogether && 
               standingStraight && kneesStraight && hipKneeDistance;
    }

    function updatePoseStatus(isTreePose, isForwardFold, isMountainPose) {
        if (isTreePose) {
            setPoseStatus("Tree Pose 🌳");
        } else if (isForwardFold) {
            setPoseStatus("Forward Fold 🙇‍♂️");
        } else if (isMountainPose) {
            setPoseStatus("Mountain Pose 🏔️");
        } else {
            setPoseStatus("Ready - Position detected ✓");
        }
    }

    return (
        <div style={{ backgroundColor: '#073B4C', padding: '20px', borderRadius: '12px', color: 'white', display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
    <div style={{ position: 'relative' }}>
        <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted></video>
        <canvas ref={canvasRef} style={{ width: "640px", height: "480px", border: "4px solid #EF476F", borderRadius: '8px' }}></canvas>
        <div style={{ 
            position: 'absolute', 
            top: '10px', 
            left: '10px', 
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '10px',
            borderRadius: '6px',
            fontWeight: 'bold'
        }}>
            <p style={{ margin: '0' }}>Status: {poseStatus}</p>
        </div>
    </div>
    
    <div>
        <h1 style={{ textAlign: 'center', color: '#FFD166', marginBottom: '20px' }}>
            Yoga Pose Timer (Tree Pose, Forward Fold, Mountain Pose)
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
            <div style={{ 
                padding: '20px', 
                backgroundColor: '#06D6A0', 
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                width: '140px',
                textAlign: 'center',
                color: 'white'
            }}>
                <h2 style={{ marginBottom: '10px' }}>Tree Pose</h2>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>{treePoseTime}s</p>
            </div>
            
            <div style={{ 
                padding: '20px', 
                backgroundColor: '#118AB2', 
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                width: '140px',
                textAlign: 'center',
                color: 'white'
            }}>
                <h2 style={{ marginBottom: '10px' }}>Forward Fold</h2>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>{forwardFoldTime}s</p>
            </div>
            
            <div style={{ 
                padding: '20px', 
                backgroundColor: '#FFD166', 
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                width: '140px',
                textAlign: 'center',
                color: 'black'
            }}>
                <h2 style={{ marginBottom: '10px' }}>Mountain Pose</h2>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>{mountainPoseTime}s</p>
            </div>
            
            <div>
                <button 
                    onClick={handleResetTimers}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#EF476F',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                    }}
                >
                    Reset All Timers
                </button>
            </div>
        </div>
    </div>
</div>


    );
}

export default App;