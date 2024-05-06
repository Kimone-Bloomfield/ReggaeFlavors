import React, { useState, useEffect } from 'react';
import NavBar from '../components/navBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import supabase from '../utils/supabase';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const EventDot = () => <div style={{ backgroundColor: 'blue', width: '5px', height: '5px', borderRadius: '50%', position: 'relative', left: '40%' }} />;


const EventPopup = ({ event, onClose }) => (
  <Dialog onClose={onClose} open={event !== null}>
    <DialogTitle>Event Details</DialogTitle>
    <DialogContent>
      <h3>{event?.time}</h3>
      <p>{event?.description}</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Close</Button>
    </DialogActions>
  </Dialog>
);


const Events = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventsByDate, setEventsByDate] = useState({});
  const [eventDetails, setEventDetails] = useState(null);

  const pastEventsImages = [
    {
      original: 'event1.jpg',
    },
    {
      original: 'event2.1.jpg',
    },
  ]; // Define pastEventsImages here

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*');
      if (error) {
        throw error;
      }
      setEvents(data);
      const eventsByDateObj = {};
      data.forEach((event) => {
        const dateStr = event.date.split('T')[0]; // Assuming 'date' is a string in format 'YYYY-MM-DD'
        if (!eventsByDateObj[dateStr]) {
          eventsByDateObj[dateStr] = [];
        }
        eventsByDateObj[dateStr].push(event);
      });
      setEventsByDate(eventsByDateObj);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateStr = date.toISOString().split('T')[0];
    const event = eventsByDate[dateStr] ? eventsByDate[dateStr][0] : null;
    setEventDetails(event);
  };

  const tileContent = ({ date, view }) => {
    const dateStr = date.toISOString().split('T')[0];
    return eventsByDate[dateStr] ? <EventDot /> : null;
  };

  const handleEventClick = (event) => {
    setEventDetails(event);
  };

  const handleClosePopup = () => {
    setEventDetails(null);
  };

  return (
    <div className="events-container">
      <NavBar />
      <div className="events-content">
        <section className="calendar-section">
          <h2 style={{ color: "white", background: "linear-gradient(to right, green, black)", padding: "10px", width: '53%' }}>Calendar</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
            onClickDay={handleDateChange}
          />
        </section>

        <section className="event-popup">
          <EventPopup event={eventDetails} onClose={handleClosePopup} />
        </section>
        <section className="past-events-gallary">
          <h2 style={{ color: "white", background: "linear-gradient(to right, green, black)", padding: "10px", width: '53%' }}>Past Events</h2>
          <Gallery items={pastEventsImages} />
        </section>
      </div>
    </div>
  );
};

export default Events;
