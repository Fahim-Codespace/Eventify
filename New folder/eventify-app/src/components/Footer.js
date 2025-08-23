import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

function Footer() {
  return (
    <footer className="eventify-footer bg-light text-center py-4 mt-auto">
      <div className="container">
        <span className="text-muted">&copy; {new Date().getFullYear()} Eventify. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
