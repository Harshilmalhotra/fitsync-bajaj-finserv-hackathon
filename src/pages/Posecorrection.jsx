import React, { useRef, useState, useEffect } from 'react';
import IssueItem from './IssueItem';

const PoseCorrection = () => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false); 
  const [stream, setStream] = useState(null); 

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream); // Store the stream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream; // Attach stream to the video element
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
      setIsCameraOn(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stream]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pose Correction</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Live Posture Feedback</h3>
          <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: "100%", maxWidth: "500px", border: "2px solid #000", borderRadius: "8px" }}
            ></video>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <button onClick={startCamera} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Start Session
            </button>
            <button onClick={stopCamera} className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50">
              Stop Session
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Current Issues</h3>
          <div className="space-y-4">
            <IssueItem
              title="Forward Head Posture"
              severity="Moderate"
              recommendation="Chin tucks, 3 sets of 10"
            />
            <IssueItem
              title="Rounded Shoulders"
              severity="Mild"
              recommendation="Wall angels, 2 sets of 12"
            />
            <IssueItem
              title="Anterior Pelvic Tilt"
              severity="Minor"
              recommendation="Glute bridges, 3 sets of 15"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Improvement History</h3>
        <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder: Posture improvement over time</p>
        </div>
      </div>
    </div>
  );
};

export default PoseCorrection;