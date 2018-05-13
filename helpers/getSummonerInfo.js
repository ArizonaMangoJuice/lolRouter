'use strict';
const rp = require('request-promise');

function getAccountInfo(name, api){
  return rp.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${api}`)
    .then(result => {
      return JSON.parse(result);
    })
    .catch(err => {
      return err;
    });
}

function getMatchInfo(accountId, beginIndex ,endIndex, api){
  let beginIndexNotUndefined = !beginIndex ? '' : `beginIndex=${beginIndex}&`;//if beginIndex is defined add the param option
  let endIndexNotUndefined = !endIndex ? 'endIndex=5&' : `endIndex=${endIndex}&`;//if endIndex is not defined we give it a default value
  return rp.get(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?${beginIndexNotUndefined}${endIndexNotUndefined}api_key=${api}`)
    .then(result => {
      // console.log(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?${beginIndexNotUndefined}${endIndexNotUndefined}api_key=${api}`);
      return JSON.parse(result);
    })
    .catch(err => {
      err = new Error('cannot find matches for this player');
      err.status = 404;
      console.log(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?${beginIndexNotUndefined}${endIndexNotUndefined}api_key=${api}`);
      return err;
    });
}

function getMatchDetails(matchId, api, accountId){
  return rp.get(`https://na1.api.riotgames.com/lol/match/v3/matches/${matchId}?api_key=${api}`)
    .then(result => {
      result = JSON.parse(result);
      result.accountId = accountId;
      console.log(`https://na1.api.riotgames.com/lol/match/v3/matches/${matchId}?api_key=${api}`);
      // if(result.status.status_code) return Promise.reject(result); 
      return Promise.resolve(result);
      
    })
    .catch(err => {
      err = new Error('cannot find match details for this player');
      err.status = 404;
      console.log(`https://na1.api.riotgames.com/lol/match/v3/matches/${matchId}?api_key=${api}`);
      return Promise.reject(err);
    });
}
module.exports = {getAccountInfo, getMatchInfo, getMatchDetails};