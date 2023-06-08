import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  favorites: [mongoose.Schema.Types.ObjectId],
});

// Add pre-save middleware to update the updatedAt field
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Add pre-update middleware to update the updatedAt field
userSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedAt = new Date();
  next();
});

const User = mongoose.model('User', userSchema);

export default User;