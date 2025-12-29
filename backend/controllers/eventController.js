const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.findAll({
    order: [['date', 'ASC']],
  });
  res.json(events);
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (TODO: Add auth)
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, type, status } = req.body;

  const event = await Event.create({
    title,
    description,
    date,
    location,
    type,
    status,
  });

  res.status(201).json(event);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByPk(req.params.id);

  if (event) {
    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.location = req.body.location || event.location;
    event.type = req.body.type || event.type;
    event.status = req.body.status || event.status;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByPk(req.params.id);

  if (event) {
    await event.destroy();
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};