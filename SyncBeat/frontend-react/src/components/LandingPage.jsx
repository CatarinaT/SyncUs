import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
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
        <button className="start-button" onClick={() => navigate('/camera')}>Start Your Experience</button>
      </div>
    </div>
  );
}

export default LandingPage;