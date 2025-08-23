

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="eventify-hero d-flex align-items-center justify-content-center" style={{minHeight: '80vh', position: 'relative'}}>
      <div className="eventify-hero-bg" />
      <div className="eventify-hero-content container text-center" style={{position: 'relative', zIndex: 2}}>
        <h1 className="eventify-title fw-bold mb-3" style={{fontSize: '3rem'}}>
          Make Every Event<br />
          Unforgettable with Eventify
        </h1>
        <p className="eventify-subtitle" >
          Streamline your event planning process with tools that ensure success--from start to finish.
        </p>
        <a href="/signup" className="btn btn-primary eventify-btn px-4 py-3" style={{fontSize: '1.2rem', borderRadius: '12px'}}>Get Started</a>
      </div>
    </div>
  );
}

export default Home;
