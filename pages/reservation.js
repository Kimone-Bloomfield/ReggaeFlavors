import React, { useState } from "react";
import NavBar from "../components/navBar";
import supabase from '../utils/supabase';
import { Dialog, DialogContent, Button } from '@mui/material';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
  });
  const [error, setError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setSubmitSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
  
    // Check if the selected date and time are within restaurant opening hours
    const selectedDate = new Date(formData.date + 'T' + formData.time);
    const openTime = new Date(selectedDate);
    openTime.setHours(11, 0, 0); // Restaurant opening time
    const closeTime = new Date(selectedDate);
    closeTime.setHours(21, 0, 0); // Restaurant closing time
    if (selectedDate < openTime || selectedDate >= closeTime) {
      setError("Restaurant is closed at this time. Please choose a time between 11am and 9pm.");
      return;
    }
  
    try {
      // Check if there's already a reservation for the selected date, time, and number of guests
      const { data: existingReservations, error: existingError } = await supabase
        .from('reservations')
        .select('*')
        .eq('date', formData.date)
        .eq('time', formData.time)
        .eq('number_of_guest', formData.guests);
  
      if (existingError) {
        console.error('Error checking existing reservations:', existingError);
        // Handle the error, show an error message, etc.
        return;
      }
  
      if (existingReservations.length >= 10) {
        setError("This date and time slot is already fully booked. Please choose another date or time.");
        return;
      }
  
      // Store the form data in the 'Reservation' table in Supabase
      const { data, error } = await supabase
        .from('reservations')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            date: formData.date,
            time: formData.time,
            number_of_guest: formData.guests,
          },
        ]);
  
      if (error) {
        console.error('Error storing form response in Supabase:', error);
        // Handle the error, show an error message, etc.
      } else {
        console.log('Form response stored in Supabase:', data);
        // Display success message and clear the form
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          date: '',
          time: '',
          guests: 1,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="reservation-page" style={{backgroundImage: `url('/reservation.jpg')`}}>
      <NavBar />
      <div className="reservation-container">
        <div className="reservation-form">
          <h2>Make a Reservation</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

            <label htmlFor="time">Time:</label>
            <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />

            <label htmlFor="guests">Number of Guests:</label>
            <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} required />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {submitSuccess && (
        <Dialog open={submitSuccess} onClose={handleClose}>
          <DialogContent className="success-message">
            <p>Reservation submitted successfully!</p>
            <div className="close-button">
              <button onClick={handleClose}>Close</button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
