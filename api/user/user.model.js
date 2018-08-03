const mongoose = require('mongoose');
const ROLES = require('../../shared/enums/roles.enum');

const userSchema = mongoose.Schema({
  pseudo: { type: String, required: true },
  color: String,
  password: { type: String, required: true },
  roles: [{ type: String, enum: Object.keys(ROLES) }],
  token: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
