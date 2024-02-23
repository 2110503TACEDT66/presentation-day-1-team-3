const CampgroundDB = require('../models/campgrounds')

// @desc:    Get all campgrounds
// @route:   GET /api/v1/campgrounds
// @access:  Public
exports.getCampgrounds = async (req, res, next) => {
    try {
        const campgrounds = await CampgroundDB.find();  

        res.status(200).json({
            success: true,
            data: campgrounds
        });
    } catch(err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// @desc:    Get a single campgrounds with an id
// @route:   GET /api/v1/campgrounds/:id
// @access:  Public
exports.getCampground = async (req, res, next) => {
    try {
        const campgound = CampgroundDB.findById(req.params.id)

        if (!campgounds) {
            throw new Error('Campground Not found');
        }

        res.status(200).json({
            success: true,
            data : campgound
        });
    } catch(err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
};

// @desc:    Create a new campground
// @route:   POST /api/v1/campgrounds
// @access:  Private
exports.createCampground = async (req, res, next) => {
    try {
        const campground = await CampgroundDB.create(req.body);

        res.status(201).json({
            success: true,
            data: campground
        });
    } catch(err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
};

// @desc:    Update a campground with an id
// @route:   PUT /api/v1/campgrounds
// @access:  Private
exports.updateCampground = async (req, res, next) => {
    try {
        const campgound = await CampgroundDB.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!campgound) throw new Error('Campground Not found');

        res.status(200).json({
            success: true,
            data: campgound
        });
    } catch(err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
};

// @desc:    Delete a campground with an id
// @route:   DELETE /api/v1/campgrounds/:id
// @access:  Private
exports.deleteCampground = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Delete a campground with an id: ${req.params.id}`
    });
};