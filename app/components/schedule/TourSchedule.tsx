"use client";
import React, { useState } from 'react';

interface Event {
  time: string;
  activity: string;
  location: string;
}

interface TourScheduleProps {
  schedule: Event[];
}

const TourSchedule: React.FC<TourScheduleProps> = ({ schedule }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="tour-schedule">
      <div className="schedule-timeline">
        {schedule.map((event, index) => (
          <div
            key={index}
            className="event"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
          >
            <div
              className="time-dot"
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: 'white',
                borderRadius: '50%',
                transition: 'background-color 0.3s',
              }}
            ></div>
            
            <div
              className="time"
              style={{
                width: '100px',
                fontWeight: 'bold',
                color: hoveredIndex === index ? 'orange' : '#FFFFFF',
                transition: 'color 0.3s',
              }}
            >
              {event.time}
            </div>
            
            <div className="event-info" style={{ paddingLeft: '10px', width: '200px' }}>
              <h3>{event.activity}</h3>
              <p style={{ marginBottom: '10px' }}>{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourSchedule;
