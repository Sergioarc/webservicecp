/**
 * Author: Sergio A.
 * Security middlewares
 */

var basicAuth = require('express-basic-auth');
var credentials = require('./credentials');

// Middleware od security endpoints with basic auth
var securityService = basicAuth({
  users: credentials,
  // challenge: true,
  unauthorizedResponse: unauthorizedResponse,
});

// Function response to unauthorized user
function unauthorizedResponse(req){
  return {
    status: 'error',
    code: '401',
    msg: 'Unathorized',
  };
}

module.exports = securityService;