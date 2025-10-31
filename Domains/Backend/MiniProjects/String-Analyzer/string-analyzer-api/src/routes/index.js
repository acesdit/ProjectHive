const express = require('express');
const stringsRouter = require('./strings');

const setupRoutes = (app) => {
    app.use('/api/strings', stringsRouter);
};

module.exports = setupRoutes;