import React, { useEffect, useRef, useState } from 'react';
// import * as tracking from 'tracking';
import './CameraExperience.css';

function CameraExperience() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [movementDetected, setMovementDetected] = useState(false);

  useEffect(() => {
    // Acessar a câmera do usuário
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Erro ao acessar a câmera:', err);
      });

    // // Configuração do tracking de movimento
    // const tracker = new tracking.ObjectTracker('all'); // Pode configurar para 'face', 'tracking', etc.
    // tracker.on('track', (event) => {
    //   const canvas = canvasRef.current;
    //   const context = canvas.getContext('2d');
    //   context.clearRect(0, 0, canvas.width, canvas.height);  // Limpar canvas

    //   let isMovementDetected = false;

    //   // Desenhar as caixas nos objetos detectados
    //   event.data.forEach((rect) => {
    //     context.strokeStyle = '#ff0000';  // Cor das caixas
    //     context.lineWidth = 3;
    //     context.strokeRect(rect.x, rect.y, rect.width, rect.height);  // Desenhar caixa ao redor do objeto

    //     // Verificar se o objeto é grande o suficiente para ser considerado como movimento
    //     if (rect.width > 100 && rect.height > 100) {
    //       isMovementDetected = true;
    //     }
    //   });

    //   // Atualizar o estado se movimento foi detectado
    //   setMovementDetected(isMovementDetected);
    // });

    // // Iniciar o tracking na câmera
    // tracking.track(videoRef.current, tracker);

    // return () => {
    //   // Limpar o tracking quando o componente for desmontado
    //   tracking.stop();
    // };
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
        <h1 className="title-camera">Expressa-te</h1>
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
