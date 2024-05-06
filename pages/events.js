// Events.jsx

import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { supabase } from "../utils/supabase";

export default function Events() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null); // Changed initial state to null

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        throw error;
      }
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
    setEventDetails(filteredEvents);
  };

  const tileContent = ({ date, view }) => {
    const eventForDate = events.find((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });

    return eventForDate ? <div className="event-dot" /> : null;
  };

  const handleEventClick = (event) => {
    alert(`Event Time: ${event.time}\nDescription: ${event.description}`);
  };

  const pastEventsImages = [
    {
      original: "event1.jpg",
    },
    {
      original: "event2.1.jpg",
    },
  ];

  return (
    <div className="events-container">
      <NavBar />
      <div className="events-content">
        <section className="calendar-section">
          <h2 style={{ color: "white", background: "linear-gradient(to right, green, black)", padding: "10px", width: '53%' }}> 
            Calendar
          </h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
          />
        </section>
        <section className="event-details">
          <div className="past-events-gallery">
            <h2 style={{ color: "white", background: "linear-gradient(to right, green, black)", padding: "10px", width: '45%' }}>Past Events</h2>
            {eventDetails && eventDetails.length > 0 && (
              <div>
                {eventDetails.map((event) => (
                  <div
                    key={event.id}
                    className="event-item"
                    onClick={() => handleEventClick(event)}
                  >
                    <h3>{event.time}</h3>
                    <p>{event.description}</p>
                  </div>
                ))}
              </div>
            )}
            <Gallery items={pastEventsImages} />
          </div>
        </section>
      </div>
    </div>
  );
}
