import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ContactForm from '../components/contactForm';
import NavBar from '../components/navBar';
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';


const Contact = () => {
  return (
    <div>
      <NavBar />
      <Head>
        <title>Contact Us | Your Restaurant Name</title>
        <meta name="description" content="Contact us for inquiries and reservations." />
      </Head>

      <div className="header">
        <Image src="/restaurant-image.jpg" alt="Restaurant Image" width={1200} height={400} />
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '800px', margin: '20px auto', color: 'aliceblue', marginTop: '5%'}}>
        {/* Contact Information Box */}
        <Box className="contact-box" sx={{ fontFamily: 'sans-serif', backgroundColor: 'rgba(144, 238, 144, 0.5)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', flex: '1', marginRight: '10px', marginBottom: '20px', marginLeft: '10px'}}>
          <div className="contact-container">
             <Typography variant="h4"  style={{ fontWeight: 600, textAlign: 'center',color:'black' }}>Contact Information</Typography>
            <section className="contact-info">
              <Typography variant="h6">
                <strong>Address:</strong> Manor Park Plaza
              </Typography>
              <Typography variant="h6">
                <strong>Phone:</strong> 876-990-1111
              </Typography>
              <Typography variant="h6">
                <strong>Opening Hours:</strong> Monday-Sunday, 11:00 AM - 9:00 PM
              </Typography>
              <div className="social-media">
                <a href="https://facebook.com/yourrestaurant" target="_blank" rel="noopener noreferrer">
                  <Image src="/facebooklogo.png" alt="facebook logo" width={40} height={35} />
                </a>
                <a href="https://twitter.com/yourrestaurant" target="_blank" rel="noopener noreferrer">
                  <Image src="/xlogo.jpg" alt="facebook logo" width={45} height={30} />
                </a>
              </div>
            </section>
          </div>
        </Box>

        {/* Message Form Box */}
        <Box className="message-box" sx={{ fontFamily: 'sans-serif', backgroundColor: 'rgba(144, 238, 144, 0.5)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', flex: '1', marginBottom: '20px', marginRight: '10px', marginLeft: '10px'}}>
          <section className="message-form">
            <Typography variant="h4"  style={{ fontWeight: 600, textAlign: 'center' }}>Message Us</Typography>
            <ContactForm />
          </section>
        </Box>
      </Box>
    </div>
  );
};

export default Contact;


