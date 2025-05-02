import React, { useEffect, useRef, useState } from 'react';
// import tracking from 'tracking'; // Import the tracking library
import './CameraExperience.css';

function CameraExperience() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [movementDetected, setMovementDetected] = useState(false);
  
  useEffect(() => {
    const tracker = new window.tracking.ObjectTracker('face');
    console.log(tracker);
  
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
  
          videoRef.current.onloadedmetadata = () => {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          };
  
          videoRef.current.onplay = () => {
            tracking.track(videoRef.current, tracker);
          };
        }
      })
      .catch((err) => {
        console.error('Erro ao acessar a câmera:', err);
      });
  
    tracker.on('track', (event) => {
        console.log(event.data);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      let isMovementDetected = false;
  
      event.data.forEach((rect) => {
        context.strokeStyle = '#ff0000';
        context.lineWidth = 3;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  
        if (rect.width > 100 && rect.height > 100) {
          isMovementDetected = true;
        }
      });
  
      setMovementDetected(isMovementDetected);
    });
  
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="camera-experience">
      <div className="background-camera">
        <div className="ball-camera"></div>
        <div className="ball-camera"></div>
        <div className="ball-camera"></div>
        <div className="ball-camera"></div>
      </div>
      <div className="header-camera">
        <h2 className="syncbeat-logo-camera">SyncBeat</h2>
      </div>
      <div className="content-camera">
        <h1 className="title-camera">Express yourself</h1>
      </div>
      <div className="camera-container">
        <video ref={videoRef} autoPlay playsInline className="camera-feed"></video>
        <canvas ref={canvasRef} className="tracking-canvas" />
      </div>
      {movementDetected && <div className="movement-indicator">Movimento Detectado!</div>}
    </div>
  );
}

export default CameraExperience;
