'use strict';

const express = require('express');
const router = express.Router();
const lolUser = require('../models/user');
const match = require('../models/match');
const matchDetails = require('../models/matchDetails');
const { API_KEY } = require('../config');
const { getAccountInfo, getMatchInfo, getMatchDetails } = require('../helpers/getSummonerInfo');

router.get('/:name', (req, res, next) => {
  let {name} = req.params;
  let endResult = {};
  let id;
  let userId;
  let accountId;

  lolUser.find({name})
    .then(nameResult => {
      
      if(nameResult.length){
        id = nameResult[0].accountId;
        
        endResult.account = nameResult[0];
        return matchDetails.find({accountId: id});
        // .then(result => res.json(result)).catch();
      }
      
      return getAccountInfo(name, API_KEY);

    })
    .then(result  => {
      let matchDetailResult;
      if(result.name) return result;
      // console.log(result[0]);
      // console.log(result);
      endResult.matchDetails = result;

      // res.json(endResult);
    })
    .then(result => {
      let accountInfo = result;
      accountInfo.name = result.name.toLowerCase();
      // console.log(result);
      // console.log(accountInfo);
      userId = result.id;
      accountId = result.accountId;
      return lolUser.create(accountInfo);
      
    })
    .then(account => {
      let accountId = account.accountId;
      endResult.account = account;
      return getMatchInfo(accountId,'','',API_KEY );
    })
    .then(matchInfo => {
      console.log(matchInfo);
      let tempArr;

      tempArr = matchInfo.matches.map(match => match.gameId);

      return tempArr;
      
    })
    .then(tempArr => {
      // console.log(userId);
      let tempMatchDesc = tempArr;
      const matchDesc = Promise.all(tempMatchDesc.map(id =>{
        // console.log(id);//undefined for grabbing matchDetails gotta fix
        return getMatchDetails(id, API_KEY, endResult.account.accountId);
      }));
      return Promise.all([matchDesc]);
    })
    .then(([result]) => {
      return matchDetails.insertMany(result);
    })
    .then(() => {
      // console.log(endResult.account.accountId);
      return matchDetails.find({accountId: endResult.account.accountId});
    })
    .then(result => {
      endResult.matchDetails = result;
      res.json(endResult);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
// getMatchInfo(result[0].accountId, '', '', API_KEY)
//           .then(result => {            
//             let endResult = {accountInfo};
//             endResult.matchList = result;
//             res.json(endResult);
//           });


// let testArr = result.matches;
//       testArr = testArr.map(match => match.gameId);
//       endResult.matches = result;
//       const test2 = Promise.all(testArr.map(id =>
//         getMatchDetails(id, API_KEY)
//       ));
//       Promise.all([test2])
//         .then(result => {
//           endResult.matchDetails = result;
//           res.json(endResult);
//           console.log(testArr);
//         })
//         .catch(err => {
//           res.json(err);
//         });

//catch
//lolUser.find({_id: accountId}).then(result => res.json({result}));
// match.find({accountId: userId})
//   .then(result => {
//     endResult.matches = result;
//     res.json(endResult);
//   });