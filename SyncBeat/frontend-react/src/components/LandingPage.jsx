import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="landing-page">
            {/* Botão no topo esquerdo */}
      <button
        className="instructions-button"
        onClick={() => setIsModalOpen(true)}
      >
        FAQ
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>FAQ</h2>
            <p>Move!Dance!</p>
            <ul>
              <li>Movimente o mouse para interagir com os elementos.</li>
              <li>Clique no botão "Start Your Experience" para começar.</li>
              <li>Siga as etapas na próxima página para configurar sua câmera.</li>
            </ul>
            <button onClick={() => setIsModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}
      <div className="background">
        <div
          className="follow-mouse"
          style={{
            transform: `translate(${mousePosition.x-100}px, ${mousePosition.y-100}px)`,
          }}
        ></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
      <div className="content">
        <h1 className="project-title">SyncBeat</h1>
        <h1 className="project-sub-title">Draw! Move!<br /> Let the sound happen.</h1>
        <button className="start-button" onClick={() => navigate('/camera')}>Start Your Experience</button>
      </div>
    </div>
  );
}

export default LandingPage;