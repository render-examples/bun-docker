import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const handleDateClick = (info) => {
  alert('Clicked on: ' + info.dateStr);
};

const handleEventClick = (info) => {
  alert('Event: ' + info.event.title);
};

const initCalendar = () => {
  const calendarEl = document.getElementById('calendar');
  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: handleDateClick,
    eventClick: handleEventClick
  });
  calendar.render();
};

// Call initCalendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initCalendar();
});
