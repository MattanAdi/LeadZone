import { useState } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin
} from 'lucide-react'
import './Calendar.css'

// Sample events data
const initialEvents = [
  { id: 1, title: 'Team Meeting', date: new Date(2024, 11, 10), time: '10:00 AM', type: 'meeting', attendees: ['Sarah', 'Michael'] },
  { id: 2, title: 'Client Call - TechCorp', date: new Date(2024, 11, 12), time: '2:00 PM', type: 'call', attendees: ['Sarah'] },
  { id: 3, title: 'Product Demo', date: new Date(2024, 11, 15), time: '11:00 AM', type: 'meeting', attendees: ['Emily', 'James'] },
  { id: 4, title: 'Follow-up Email', date: new Date(2024, 11, 8), time: '3:00 PM', type: 'task', attendees: ['Michael'] },
  { id: 5, title: 'Quarterly Review', date: new Date(2024, 11, 20), time: '9:00 AM', type: 'meeting', attendees: ['Sarah', 'Emily', 'James'] },
]

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events] = useState(initialEvents)
  const [selectedDate, setSelectedDate] = useState(null)

  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1))
  }

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = event.date
      return eventDate.getDate() === date &&
             eventDate.getMonth() === month &&
             eventDate.getFullYear() === year
    })
  }

  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() &&
           month === today.getMonth() &&
           year === today.getFullYear()
  }

  const renderCalendarDays = () => {
    const days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day)
      const isSelected = selectedDate === day
      const isTodayDate = isToday(day)

      days.push(
        <div
          key={day}
          className={`calendar-day ${isTodayDate ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
          onClick={() => setSelectedDate(day)}
        >
          <span className="day-number">{day}</span>
          {dayEvents.length > 0 && (
            <div className="day-events">
              {dayEvents.slice(0, 3).map(event => (
                <div key={event.id} className={`event-dot event-${event.type}`} title={event.title}></div>
              ))}
              {dayEvents.length > 3 && (
                <span className="more-events">+{dayEvents.length - 3}</span>
              )}
            </div>
          )}
        </div>
      )
    }

    return days
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []
  const upcomingEvents = events
    .filter(event => {
      const eventDate = event.date
      return eventDate >= new Date(new Date().setHours(0, 0, 0, 0))
    })
    .sort((a, b) => a.date - b.date)
    .slice(0, 5)

  return (
    <div className="calendar-page">
      <div className="page-header animate-slide-up">
        <div className="page-title-section">
          <h1>Calendar</h1>
          <p>View and manage your schedule</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>New Event</span>
        </button>
      </div>

      <div className="calendar-container animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="calendar-main">
          <div className="calendar-header">
            <button className="nav-btn" onClick={() => navigateMonth(-1)}>
              <ChevronLeft size={20} />
            </button>
            <h2 className="month-year">
              {monthNames[month]} {year}
            </h2>
            <button className="nav-btn" onClick={() => navigateMonth(1)}>
              <ChevronRight size={20} />
            </button>
            <button className="today-btn" onClick={() => setCurrentDate(new Date())}>
              Today
            </button>
          </div>

          <div className="calendar-grid">
            <div className="calendar-weekdays">
              {dayNames.map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            <div className="calendar-days">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        <div className="calendar-sidebar">
          {selectedDate ? (
            <div className="selected-date-events">
              <h3 className="sidebar-title">
                {monthNames[month]} {selectedDate}, {year}
              </h3>
              {selectedDateEvents.length > 0 ? (
                <div className="events-list">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className="event-card">
                      <div className={`event-type-badge event-${event.type}`}>
                        {event.type}
                      </div>
                      <div className="event-content">
                        <h4 className="event-title">{event.title}</h4>
                        <div className="event-details">
                          <span className="event-time">
                            <Clock size={14} />
                            {event.time}
                          </span>
                          {event.attendees && event.attendees.length > 0 && (
                            <span className="event-attendees">
                              <User size={14} />
                              {event.attendees.length} attendee{event.attendees.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-events">
                  <p>No events scheduled for this day</p>
                </div>
              )}
            </div>
          ) : (
            <div className="upcoming-events">
              <h3 className="sidebar-title">Upcoming Events</h3>
              {upcomingEvents.length > 0 ? (
                <div className="events-list">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="event-card">
                      <div className={`event-type-badge event-${event.type}`}>
                        {event.type}
                      </div>
                      <div className="event-content">
                        <h4 className="event-title">{event.title}</h4>
                        <div className="event-details">
                          <span className="event-date">
                            <CalendarIcon size={14} />
                            {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="event-time">
                            <Clock size={14} />
                            {event.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-events">
                  <p>No upcoming events</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calendar

