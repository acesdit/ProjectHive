const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't return password in queries by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    avatar: String,
    otpSecret: {
      type: String,
      select: false
    },
    otpExpires: {
      type: Date
    },
    refreshToken: {
      type: String,
      select: false
    },
    // Google auth
    google: {
      id: {
        type: String,
        sparse: true
      },
      email: {
        type: String,
        lowercase: true
      }
    },
    // Facebook auth
    facebook: {
      id: {
        type: String,
        sparse: true
      },
      email: {
        type: String,
        lowercase: true
      }
    }
  },
  {
    timestamps: true
  }
);

// Middleware to hash password before save
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate OTP
userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otpSecret = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return otp;
};

// Method to verify OTP
userSchema.methods.verifyOTP = function(otp) {
  return this.otpSecret === otp && Date.now() < this.otpExpires;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
