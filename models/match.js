'use strict';
const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
  platformId: {type: String, require: true},
  gameId: {type: String, require: true, unique: true},
  champion: {type: String, require: true},
  queue:{type: String, require: true},
  season: {type: String, require: true},
  timestamp: {type: String, require: true},
  roles: {type: String, require: true},
  lane: {type: String, require: true},
  accountId : {type: String, ref: 'lolUser', index: true}
}, {timestamps: true});

// matchSchema.index({gameId: 1, accountId: 1}, {unique: true});

matchSchema.set('toObject', {
  transform: function(doc, ret){
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('match', matchSchema); 