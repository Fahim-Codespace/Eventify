import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="eventify-hero d-flex align-items-center justify-content-center" style={{minHeight: '80vh', position: 'relative'}}>
      {/* White Background */}
      <div className="eventify-hero-bg" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        opacity: 1
      }} />
      
      <div className="eventify-hero-content container text-center" style={{position: 'relative', zIndex: 2}}>
        <h1 className="eventify-title fw-bold mb-3" style={{
          fontSize: '3rem',
          color: '#333333',
          textShadow: 'none'
        }}>
          Make Every Event<br />
          Unforgettable with Eventify
        </h1>
        
        <p className="eventify-subtitle mb-4" style={{
          fontSize: '1.2rem',
          color: '#666666',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Streamline your event planning process with tools that ensure success—from start to finish.
        </p>
        
        <a href="/events" className="btn btn-primary eventify-btn px-4 py-3" style={{
          fontSize: '1.2rem',
          borderRadius: '12px',
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          Explore Events
        </a>
      </div>
    </div>
  );
}

export default Home;