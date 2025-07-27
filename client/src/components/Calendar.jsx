import React from 'react';

export default function Calendar() {
  // Placeholder calendar
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className="calendar">
      {days.map((d) => (
        <div key={d} className="day">
          {d}
        </div>
      ))}
    </div>
  );
}
