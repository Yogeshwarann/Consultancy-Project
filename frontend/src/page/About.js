import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <div style={styles.content}>
        <p>Welcome to our electrical shop, where we provide a wide range of electrical products and services to meet your needs.</p><p> Our shop has been serving the community for <strong>[3 Years]</strong>,offering high-quality products at competitive prices.</p>
        <p>At our shop, we prioritize customer satisfaction above all else.</p><p> Our team of experts is dedicated to helping you find the right solutions for your electrical needs,</p><p> whether you're working on a small project at home or a large-scale industrial project.</p>
        <p>Our goal is to be your go-to destination for all things electrical.</p><p> We strive to provide <strong>exceptional service</strong></p><p> A wide selection of products, and <strong>expert advice</strong> to ensure that you have everything you need to complete your projects successfully.</p>
        <p>Thank you for choosing our shop.</p><p> We look forward to serving you and building a long-lasting relationship with you.</p>
      </div>
      <div style={styles.imagesContainer}>
        <img src="https://lh3.googleusercontent.com/p/AF1QipPWuRI3hUrcdmkK7lwH0iVR_DtwvC7EYM-xRlPt=s680-w680-h510" alt="Image 1" style={styles.image} />
        <img src="https://lh3.googleusercontent.com/p/AF1QipON3minKpRpO1Xp3asw4-QYISRpqguItYnn6pEP=s680-w680-h510" alt="Image 2" style={styles.image} />
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
    color:"#333",
  },
  content: {
    fontSize: '1.1em',
    lineHeight: '1.6',
    color: '#666',
  },
  imagesContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  image: {
    width: '200px',
    height: '200px',
    margin: '0 10px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
};

export default About;
