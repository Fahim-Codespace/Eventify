import React from 'react';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

const universityLogo = '/main_logo.png'; // Use your logo path

function CertificateGenerator() {
  const user = JSON.parse(localStorage.getItem('certificateUser') || '{}');
  const event = JSON.parse(localStorage.getItem('certificateEvent') || '{}');

  const generateCertificate = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    // Branding colors
    doc.setFillColor(41, 141, 255);
    doc.rect(0, 0, 297, 30, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(41, 141, 255);
    doc.setFontSize(32);
    doc.text('Certificate of Participation', 148, 50, { align: 'center' });
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(
      `This is to certify that`,
      148,
      70,
      { align: 'center' }
    );
    doc.setFontSize(24);
    doc.setTextColor(41, 141, 255);
    doc.text(user.name || 'Participant Name', 148, 85, { align: 'center' });
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(
      `has participated in the event`,
      148,
      100,
      { align: 'center' }
    );
    doc.setFontSize(20);
    doc.setTextColor(41, 141, 255);
    doc.text(event.title || 'Event Title', 148, 115, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text(
      `Date: ${event.date || 'Event Date'}    Organizer: ${event.organizer || 'Organizer'}`,
      148,
      130,
      { align: 'center' }
    );
    // Branding
    doc.addImage(universityLogo, 'PNG', 20, 10, 30, 30);
    doc.setFontSize(12);
    doc.setTextColor(120, 120, 120);
    doc.text('Ahsanullah University of Science & Technology', 148, 145, { align: 'center' });
    doc.text('Eventify', 148, 155, { align: 'center' });
    doc.save(`Certificate_${user.name || 'participant'}.pdf`);
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Your certificate is ready!</h2>
      <p>Click the button below to download your certificate of participation for the event.</p>
      <button className="btn btn-primary px-4 py-2" onClick={generateCertificate}>
        Download Certificate
      </button>
    </div>
  );
}

export default CertificateGenerator;
