import React, { useState, useEffect } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        <h1 className="project-title">Sync Beat</h1>
        <button className="start-button">Start Your Experience</button>
      </div>
    </div>
  );
}

export default LandingPage;