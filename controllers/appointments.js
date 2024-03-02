const Appointment = require("../models/Appointment");
const Campground = require("../models/Campground");

// @desc:    Get all appointments
// @route:   GET api/v1/appointments
// @access:  Private
exports.getAppointments = async (req, res, next) => {
  let query;

  // General users can see only their appointment
  if (req.user.role !== "admin") {
    query = Appointment.find({ user: req.user.id }).populate({
      path: "campground",
      select: "name province tel",
    });
  } else {
    // If you are an admin, you can see all appointments!
    if (req.params.campgroundId) {
      console.log(req.params.campgroundId);
      query = Appointment.find({
        campground: req.params.campgroundId,
      }).populate({
        path: "campground",
        select: "name province tel",
      });
    } else {
      query = Appointment.find().populate({
        path: "campground",
        select: "name province tel",
      });
    }
  }

  try {
    const appointments = await query;
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot find Appointment",
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/v1/appointments/:id
// @access  Public
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate({
      path: "campground",
      select: "name province tel",
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `No appointment with the id of ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Appointment" });
  }
};

// @desc    Add appointment
// @route   POST /api/v1/campgrounds/:campgroundId/appointments/
// @access  Private
exports.addAppointment = async (req, res, next) => {
  try {
    req.body.campground = req.params.campgroundId;

    const campground = await Campground.findById(req.params.campgroundId);

    if (!campground) {
      return res.status(404).json({
        success: false,
        message: `No campground with the id of ${req.params.campgroundId}`,
      });
    }

    const appointment = await Appointment.create(req.body);
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create Appointment" });
  }
};