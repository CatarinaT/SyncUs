import React, { useEffect, useRef, useState } from 'react';
import './CameraExperience.css';

// Importa as dependências necessárias do MediaPipe Hands
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

function CameraExperience() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [movementDetected, setMovementDetected] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');

    // Função que será chamada ao processar os resultados da detecção de mãos
    function onResults(results) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.translate(canvasElement.width, 0);
      canvasCtx.scale(-1, 1);
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      // Desenha os pontos e as conexões das mãos detectadas
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
          drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
        }
      }

      canvasCtx.restore();
    }

    // Configuração do MediaPipe Hands
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    // Mudar aqyu cenas, max maos para limitar para performance
    hands.setOptions({
      maxNumHands: 8,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 1280,
      height: 720,
    });

    camera.start();

    return () => {
      camera.stop();
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
        {/* A referência ao vídeo */}
        <video ref={videoRef} autoPlay playsInline className="camera-feed"></video>
        {/* A referência ao canvas para desenhar as mãos detectadas */}
        <canvas ref={canvasRef} className="tracking-canvas" />
      </div>
      {movementDetected && <div className="movement-indicator">Movimento Detectado!</div>}
    </div>
  );
}

export default CameraExperience;
