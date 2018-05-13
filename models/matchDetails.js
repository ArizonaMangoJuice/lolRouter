'use strict';
const mongoose = require('mongoose');

const matchDetailSchema = mongoose.Schema({
  gameId: {type: String, require: true},
  platformId: {type: String, require: true},
  gameCreation: {type: String, require: true},
  gameDuration: {type: String, require: true},
  queueId: {type: String, require: true},
  mapId: {type: String, require: true},
  seasonId: {type: String, require: true},
  gameVersion: {type: String, require: true},
  gameMode: {type: String, require: true},
  gameType: {type: String, require: true},
  teams: [],
  participants: [],
  participantIdentities: [],
  accountId: {type: String, ref: 'lolUser', index: true}
});

matchDetailSchema.set('toObject', {
  transform : function(doc, ret){
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('matchDetail', matchDetailSchema);

// {
//   teamId: {type: String, require: true},
//   win: {type: String, require: true},
//   firstBlood: false,
//   firstTower: true,
//   firstInhibitor: true,
//   firstBaron: true,
//   firstDragon: true,
//   firstRiftHerald: false,
//   towerKills: {type: String, require: true},
//   inhibitorKills: {type: String, require: true},
//   baronKills: {type: String, require: true},
//   dragonKills: {type: String, require: true},
//   vilemawKills: {type: String, require: true},
//   riftHeraldKills: {type: String, require: true},
//   dominionVictoryScore: {type: String, require: true},
// }