import React from 'react';
import { GrTextAlignCenter } from 'react-icons/gr';

const Contact = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>
      <div style={styles.content}>
        <p>For any inquiries or assistance, please feel free to contact us using the information below:</p>
        <ul>
          <li><strong>Address:</strong> Vaiyapuri Nagar, Gandhi Puram, Karur, Tamil Nadu 639002</li>
          <li><strong>Phone:</strong> (+91) 63699 95929</li>
          <li><strong>Email:</strong> sumathielectricals@gmail.com</li>
        </ul>
        <p>We look forward to hearing from you!</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    textAlign:'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url('https://img.freepik.com/free-photo/blue-toned-collection-paper-sheets-with-copy-space_23-2148320445.jpg')`, // Placeholder image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heading: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#333',
  },
  content: {
    fontSize: '1.3em',
    lineHeight: '1.6',
    color: '#666',
  },
};

export default Contact;
