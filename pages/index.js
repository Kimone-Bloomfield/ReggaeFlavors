import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogContent, Box } from '@mui/material';
import NavBar from '../components/navBar';
import Slider from '../components/imageSlider';

export default function Index() {
  const [dialogOpen, setDialogOpen] = useState(true);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <NavBar />
      <div className='container'>

        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          PaperProps={{
            style: {
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              boxShadow: 'none',
            },
          }}
        >
          <DialogContent>
            <Box textAlign="center" mb={2}>
              <img
                src="/logo.png"
                alt="Logo"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
            </Box>

            <Typography variant="h4" color="black" align="center" style={{ fontFamily: 'MyCustomCursiveFont', fontWeight: 200, fontStyle: 'italic' }}>
              Welcome to Reggae Flavors.
            </Typography>
            <br></br>
            <Typography variant="h4" color="black" align="center" style={{ fontFamily: 'MyCustomCursiveFont', fontWeight: 200, fontStyle: 'italic' }}>
              Feel the groove, taste the spice at Reggae Flavors, it's oh so nice!
            </Typography>

            <Box textAlign="center" mt={2}>
              <Button onClick={handleCloseDialog} style={{ backgroundColor: 'green', color: 'white' }} variant="contained">
                Continue
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        <div className="center-box">
          <div className='box-container'>
            <Slider></Slider>
          </div>

          <div className='flex-container' style={{ maxHeight: '50vh', overflowY: 'auto', display: 'flex' }}>
            {/* About Section Box */}
            <Box className="about-box" style={{ backgroundColor: 'rgba(255, 255, 0, 0.3)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', flex: '1', marginRight: '20px', marginBottom: '20px' }}>

              <Typography variant="h5" color="black" style={{ fontWeight: 600, textAlign: 'center', fontFamily: 'MyCustomCursiveFont' }}>
                About Us
              </Typography>
              <Typography variant="h6" color="black" style={{ fontWeight: 700, textAlign: 'left', fontFamily: 'MyCustomCursiveFont', fontStyle: 'italic'}}>
                <img
                  src="/chef.jpg"
                  alt="head chef"
                  style={{ width: '35%', height: '35%', float: 'left', marginRight: '10px' }}
                />
                Welcome to Reggae Flavors, where the sun meets the sea, and the vibrant culture of Jamaica comes alive on your plate. At Reggae Flavors, we pride ourselves on delivering an authentic Jamaican dining experience.
              </Typography>
            </Box>

            {/* Testimonials Box */}
            <Box className="testimonal-box" style={{ backgroundColor: 'rgba(255, 255, 0, 0.3)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', flex: '1', marginRight: '20px', marginBottom: '20px' }}>
              <Typography variant="h5" color="black" style={{ fontWeight: 600, textAlign: 'center', fontFamily: 'MyCustomCursiveFont', marginBottom: '20px' }}>
                Testimonials
              </Typography>
              <div style={{ textAlign: 'left' }}>
                <Typography variant="h6" color="black" style={{ fontWeight: 600, textAlign: 'center', fontFamily: 'MyCustomCursiveFont', marginBottom: '20px', fontStyle: 'italic' }}>
                  <strong>John Doe:</strong> "Absolutely delicious! The jerk chicken is a must-try."
                </Typography>
                <Typography variant="h6" color="black" style={{ fontWeight: 600, textAlign: 'center', fontFamily: 'MyCustomCursiveFont', marginBottom: '20px', fontStyle: 'italic' }}>
                  <strong>Jane Smith:</strong> "Reggae Flavors takes me back to Jamaica with every bite. Amazing food!"
                </Typography>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
