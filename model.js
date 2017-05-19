var log = require('logger')('model-vehicles');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var types = require('validators').types;

var vehicle = Schema({
    has: {type: Object, default: {}},
    allowed: {type: Object, default: {}},
    created: {type: Date, default: Date.now},
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
        validator: types.ref()
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        validator: types.ref()
    },
    contacts: {
        type: Schema.Types.Mixed,
        validator: types.contacts({
            max: 10
        })
    },
    type: {
        type: String,
        enum: [
            'bicycle',
            'excavator',
            'loader',
            'bulldozer',
            'truck',
            'cement-mixer',
            'crane',
            'road-roller',
            'motorbike',
            'three-wheeler',
            'scooter',
            'car',
            'van',
            'suv',
            'cab',
            'lorry',
            'van',
            'bus'
        ]
    },
    make: {
        type: Schema.Types.ObjectId,
        ref: 'vehicle-makes',
        validator: types.ref()
    },
    model: {
        type: Schema.Types.ObjectId,
        ref: 'vehicle-models',
        validator: types.ref()
    },
    manufactured: {
        type: Date,
        validator: types.date({
            max: Date.now
        })
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'countries',
        validator: types.ref()
    },
    fuel: {
        type: String,
        enum: ['none', 'petrol', 'diesel', 'electric', 'hybrid']
    },
    transmission: {
        type: String,
        enum: ['none', 'manual', 'automatic', 'manumatic']
    },
    doors: {
        type: Number,
        validator: types.number({
            max: 50,
            min: 0
        })
    },
    steering: {
        type: String,
        enum: ['left', 'right']
    },
    seats: {
        type: Number,
        validator: types.number({
            max: 1000,
            min: 0
        })
    },
    driveType: {
        type: String,
        enum: ['front', 'rear', 'all']
    },
    mileage: {
        type: Number,
        validator: types.number({
            min: 0
        })
    },
    condition: {
        type: String,
        enum: ['brand-new', 'unregistered', 'used']
    },
    engine: {
        type: Number,
        validator: types.number({
            max: 20000
        })
    },
    color: {
        type: String,
        validator: types.color()
    },
    description: {
        type: String,
        validator: types.string({
            length: 1000
        })
    },
    photos: {
        type: [String],
        validator: types.array({
            max: 10,
            validator: types.url({
                field: 'photos[*]'
            })
        })
    },
    price: {
        type: Number,
        validator: types.number({
            min: 0
        })
    },
    currency: {
        type: String,
        validator: types.currency()
    },
    centralLock: {
        type: Boolean,
        validator: types.boolean()
    },
    sunroof: {
        type: Boolean,
        validator: types.boolean()
    },
    spareWheels: {
        type: Boolean,
        validator: types.boolean()
    },
    toookit: {
        type: Boolean,
        validator: types.boolean()
    },
    tinted: {
        type: Boolean,
        validator: types.boolean()
    },
    airConditioned: {
        type: Boolean,
        validator: types.boolean()
    },
    navigator: {
        type: Boolean,
        validator: types.boolean()
    },
    entertainment: {
        type: Boolean,
        validator: types.boolean()
    },
    security: {
        type: Boolean,
        validator: types.boolean()
    },
    racks: {
        type: Boolean,
        validator: types.boolean()
    },
    powerShutters: {
        type: Boolean,
        validator: types.boolean()
    },
    powerMirrors: {
        type: Boolean,
        validator: types.boolean()
    },
    seatBelts: {
        type: Boolean,
        validator: types.boolean()
    },
    canopy: {
        type: Boolean,
        validator: types.boolean()
    }
});

vehicle.set('toJSON', {
    getters: true,
    //virtuals: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
    }
});

vehicle.virtual('id').get(function () {
    return this._id;
});

module.exports = mongoose.model('vehicles', vehicle);