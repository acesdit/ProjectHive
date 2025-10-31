const User = require('../models/User');
const { generateToken } = require('../config/passport');
const { sendOTPEmail } = require('../utils/emailService');

// @desc    Get current user
// @route   GET /api/auth/user
// @access  Private
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-local.password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Handle Google/Facebook OAuth callback
// @route   GET /api/auth/(google|facebook)/callback
// @access  Public
exports.googleCallback = async (req, res) => {
  try {
    // Set role based on login path
    if (req.isAdminLogin) {
      req.user.role = 'admin';
      await User.findByIdAndUpdate(req.user.id, { role: 'admin' });
    }

    // Generate JWT token
    const token = generateToken(req.user);

    // Redirect to appropriate dashboard
    const redirectPath = req.user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
    res.redirect(`${process.env.CLIENT_URL}${redirectPath}?token=${token}`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/auth/failure`);
  }
};

// @desc    Handle Facebook OAuth callback
// @route   GET /api/auth/facebook/callback
// @access  Public
exports.facebookCallback = async (req, res) => {
  try {
    // Set role based on login path
    if (req.isAdminLogin) {
      req.user.role = 'admin';
      await User.findByIdAndUpdate(req.user.id, { role: 'admin' });
    }

    // Generate JWT token
    const token = generateToken(req.user);

    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/auth/failure`);
  }
};

// @desc    Handle OAuth logout
// @route   GET /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).json({ success: true, message: 'Successfully logged out' });
  });
};

// @desc    Update user role (Admin only)
// @route   PUT /api/auth/role/:userId
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid role (user or admin)'
      });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No user found with id ${req.params.userId}`
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Register user with email/password
// @route   POST /api/auth/register
//         POST /api/auth/admin/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user with role based on registration endpoint
    user = await User.create({
      name,
      email,
      password,
      role: req.isAdminLogin ? 'admin' : 'user'
    });

    // Generate OTP for verification
    const otp = user.generateOTP();
    await user.save();

    // Send verification email
    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Error sending verification email'
      });
    }

    res.status(200).json({
      success: true,
      message: `${req.isAdminLogin ? 'Admin' : 'User'} registered. Please check your email for verification code.`,
      data: {
        email,
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Resend verification email
// @route   POST /api/auth/resend-verification
// @access  Public
exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+otpSecret +otpExpires');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate new OTP
    const otp = user.generateOTP();
    await user.save();

    // Send verification email
    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Error sending verification email'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Verification email sent successfully',
      data: {
        email,
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user with email/password
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Get user and include password and account lock fields
    const user = await User.findOne({ email })
      .select('+password +loginAttempts +lockUntil');

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }    // Generate token and send response
    const token = generateToken(user);
    
    // Determine redirect URL based on role
    const redirectUrl = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.status(200).json({
      success: true,
      token, // Also send in response for non-cookie clients
      redirectUrl,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Verify email with OTP
// @route   POST /api/auth/verify-email
// @access  Public
exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and OTP'
      });
    }

    // Find user and include OTP fields
    const user = await User.findOne({ email }).select('+otpSecret +otpExpires');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify OTP
    if (!user.verifyOTP(otp)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Update user verification status
    user.isEmailVerified = true;
    user.otpSecret = undefined;
    user.otpExpires = undefined;
    await user.save();    // Generate token and determine redirect
    const token = generateToken(user);
    const redirectUrl = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      token,
      redirectUrl,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
