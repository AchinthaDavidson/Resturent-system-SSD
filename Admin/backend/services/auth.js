const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const APP_SECRET =  process.env.APP_SECRET

const JWT_OPTIONS = {
  algorithm: "HS256",
  issuer: "davidson.com/api",
  audience: "davidson.com",
  expiresIn: 3600,
};

// Function to hash the password
function createPasswordHash(password) {
  return bcrypt.hash(password, 10);
}

// Function to validate the password
function validatePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Function to sign a token after validating the password
async function signToken(password, hash, payload) {
  const checkPassword = await validatePassword(password, hash);

  if (!checkPassword) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(payload, APP_SECRET, JWT_OPTIONS);

  return {
    token,
    life: 3600,
  };
}

// Function to verify the token
async function verifyToken(token) {
  const payload = jwt.verify(token, APP_SECRET, JWT_OPTIONS);
  return payload; // In JavaScript, we don't use TypeScript interfaces like IauthPayload, so just return the payload.
}

module.exports = {
  createPasswordHash,
  validatePassword,
  signToken,
  verifyToken
};
