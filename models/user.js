'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  accountId: {type: String, required: true},
  profileIconId: {type: String, required: true},
  
}, {timestamps: true});

// userSchema.

userSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('lolUser', userSchema);