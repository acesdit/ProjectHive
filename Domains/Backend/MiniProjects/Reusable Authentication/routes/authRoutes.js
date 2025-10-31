const express = require('express');
const router = express.Router();
const { passport } = require('../config/passport');
const { 
  googleCallback, 
  facebookCallback, 
  logout, 
  getCurrentUser, 
  updateUserRole,
  register,     // Add these new imports
  login,
  verifyEmail,
  resendVerification  // Add this import
} = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/auth');

// Regular user Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/auth/failure` }), 
  googleCallback
);

// Admin Google OAuth routes
router.get('/admin/google', (req, res, next) => {
  req.isAdminLogin = true;
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});
router.get('/admin/google/callback', 
  (req, res, next) => {
    req.isAdminLogin = true;
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/auth/failure` })(req, res, next);
  },
  googleCallback
);

// Regular user Facebook OAuth routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', 
  passport.authenticate('facebook', { session: false, failureRedirect: `${process.env.CLIENT_URL}/auth/failure` }), 
  facebookCallback
);

// Admin Facebook OAuth routes
router.get('/admin/facebook', (req, res, next) => {
  req.isAdminLogin = true;
  passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
});
router.get('/admin/facebook/callback',
  (req, res, next) => {
    req.isAdminLogin = true;
    passport.authenticate('facebook', { session: false, failureRedirect: `${process.env.CLIENT_URL}/auth/failure` })(req, res, next);
  },
  facebookCallback
);

// Email/Password Auth Routes - Regular Users
router.post('/register', register);
router.post('/login', login);

// Email/Password Auth Routes - Admin
router.post('/admin/register', (req, res, next) => {
  req.isAdminLogin = true;
  register(req, res, next);
});
router.post('/admin/login', (req, res, next) => {
  req.isAdminLogin = true;
  login(req, res, next);
});

// Email verification routes (public routes)
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);

// Get current logged in user
router.get('/user', protect, getCurrentUser);

// Update user role (admin only)
router.put('/role/:userId', protect, authorize('admin'), updateUserRole);

// Logout
router.get('/logout', logout);

module.exports = router;
