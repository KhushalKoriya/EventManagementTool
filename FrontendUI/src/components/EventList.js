import React, { useEffect, useState } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api/events';
import './EventList.css';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    id: null,
    name: '',
    description: '',
    images: [],
    startDate: '',
    endDate: '',
    totalGuests: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination and filtering state
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('name');
  const [sortDirection, setSortDirection] = useState('ASC');
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      newEvent.userId = user.id; 
      setUsername(user.username);
    }
  }, [navigate]);

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      setError(null);
      const userId = JSON.parse(localStorage.getItem('user')).id;
      try {
        const payload = {
          page: currentPage,
          limit: eventsPerPage,
          sort: sortOrder,
          order: sortDirection,
          search: searchTerm,
          filters: {
            startDate: startDateFilter,
            endDate: endDateFilter,
          },
          userId, 
        };

        const { events: fetchedEvents, totalCount } = await fetchEvents(payload);
        setEvents(fetchedEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, [currentPage, searchTerm, sortOrder, sortDirection, startDateFilter, endDateFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEvent.name || !newEvent.description || !newEvent.startDate || !newEvent.endDate || newEvent.totalGuests <= 0) {
      alert('Please fill in all fields correctly.');
      return;
    }
  
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null; // Get the user ID
  
    if (!userId) {
      alert('User is not logged in.');
      return;
    }
  
    const eventToSave = {
      id: newEvent.id,
      name: newEvent.name,
      description: newEvent.description,
      images: newEvent.images.length ? newEvent.images : ['defaultImage.jpg'],
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      totalGuests: newEvent.totalGuests,
      userId, 
    };
  console.log("eventToSave",eventToSave);
  
    setLoading(true);
    setError(null);
    try {
      if (isEditing) {
        await updateEvent(eventToSave);
      } else {
        await createEvent(eventToSave);
      }
  
      // Re-fetch events after create/update
      const { events: fetchedEvents } = await fetchEvents({
        page: currentPage,
        limit: eventsPerPage,
        sort: sortOrder,
        order: sortDirection,
        search: searchTerm,
        filters: {
          startDate: startDateFilter,
          endDate: endDateFilter,
        },
        userId, // Fetch events for this user
      });
  
      setEvents(fetchedEvents);
    } catch (err) {
      console.error('Error while saving event:', err);
      alert('Failed to save event. Please try again.');
    } finally {
      setLoading(false);
      resetForm();
    }
  };
  

  const handleEdit = (event) => {
    setNewEvent({
      ...event,
      startDate: new Date(event.startDate).toISOString().split('T')[0], 
      endDate: new Date(event.endDate).toISOString().split('T')[0],     
    });
    setIsEditing(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setLoading(true);
      try {
        await deleteEvent(eventId);
        setEvents(events.filter((event) => event.id !== eventId));
      } catch (err) {
        console.error('Error while deleting event:', err);
        alert('Failed to delete event. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setNewEvent({
      id: null,
      name: '',
      description: '',
      images: [],
      startDate: '',
      endDate: '',
      totalGuests: 0,
      userId: newEvent.userId, 
    });
    setIsEditing(false);
  };

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <div className="event-header" >
        <h1><center>{isEditing ? 'Edit Event' : 'Add Event'}</center></h1>
        <button className="logout-button" onClick={handleLogout}>Logout {username && `(${username})`}</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Search Input */}
        <br/><br/>
        <div className='filter-section'>
          <input
            type='text'
            placeholder='Search events'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type='date'
            placeholder='Start Date'
            value={startDateFilter || ''}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
          <input
            type='date'
            placeholder='End Date'
            value={endDateFilter || ''}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value='name'>Sort by Name</option>
            <option value='startDate'>Sort by Start Date</option>
          </select>
          <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
            <option value='ASC'>Ascending</option>
            <option value='DESC'>Descending</option>
          </select>
        </div>
      </div>

      <div className='eventMain'>
        {/* Event Form */}
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Name'
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <input
            type='text'
            placeholder='Description'
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <input
            type='text'
            placeholder='Owner'
            value={newEvent.images.join(',')}
            onChange={(e) => setNewEvent({ ...newEvent, images: e.target.value.split(',') })}
          />
          <input
            type='date'
            value={newEvent.startDate}
            onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
          />
          <input
            type='date'
            value={newEvent.endDate}
            onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
          />
          <input
            type='number'
            value={newEvent.totalGuests}
            onChange={(e) => setNewEvent({ ...newEvent, totalGuests: Number(e.target.value) })}
          />
          <button type='submit' disabled={loading}>
            {isEditing ? 'Update Event' : 'Add Event'}
          </button>
        </form>

        {/* Event List */}
        <ul>
          {events.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage).map((event) => (
            <li key={event.id}>
              <div className='event-details'>
                <strong>{event.name}</strong> <br />
                {event.description} <br />
                <em>
                  {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                </em>
                <div className='button-group'>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className='pagination'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventList;
