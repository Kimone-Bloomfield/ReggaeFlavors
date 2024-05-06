import React, { useState } from 'react';
import { Dialog, DialogContent, Button } from '@mui/material';
import supabase from '../utils/supabase';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Store the form data in the 'Response' table in Supabase
      const { data, error } = await supabase
        .from('contact')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (error) {
        console.error('Error storing form response in Supabase:', error);
      } else {
        console.log('Form response stored in Supabase:', data);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClose = () => {
    setSubmitSuccess(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <div className="input-item">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-item">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="message-input">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

      <Dialog open={submitSuccess} onClose={handleClose}>
      <DialogContent className="success-message">
        <p>Message submitted successfully!</p>
        <div className="close-button">
          <button onClick={handleClose}>Close</button>
        </div>
      </DialogContent>
    </Dialog>

    </div>
  );
};

export default ContactForm;
