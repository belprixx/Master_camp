//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var Mongo = Package.mongo.Mongo;
var PersistentMinimongo = Package['frozeman:persistent-minimongo'].PersistentMinimongo;
var Web3 = Package['ethereum:web3'].Web3;
var BigNumber = Package['ethereum:web3'].BigNumber;

/* Package-scope variables */
var EthAccounts;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ethereum_accounts/accounts.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**                                                                                                                   // 1
                                                                                                                      // 2
@module Ethereum:accounts                                                                                             // 3
*/                                                                                                                    // 4
                                                                                                                      // 5
                                                                                                                      // 6
                                                                                                                      // 7
/**                                                                                                                   // 8
The accounts collection, with some ethereum additions.                                                                // 9
                                                                                                                      // 10
@class EthAccounts                                                                                                    // 11
@constructor                                                                                                          // 12
*/                                                                                                                    // 13
var collection = new Mongo.Collection('ethereum_accounts', {connection: null});                                       // 14
EthAccounts = _.clone(collection);                                                                                    // 15
EthAccounts._collection = collection;                                                                                 // 16
                                                                                                                      // 17
                                                                                                                      // 18
if(typeof PersistentMinimongo !== 'undefined')                                                                        // 19
    new PersistentMinimongo(EthAccounts._collection);                                                                 // 20
                                                                                                                      // 21
                                                                                                                      // 22
                                                                                                                      // 23
/**                                                                                                                   // 24
Updates the accounts balances, by watching for new blocks and checking the balance.                                   // 25
                                                                                                                      // 26
@method _watchBalance                                                                                                 // 27
*/                                                                                                                    // 28
EthAccounts._watchBalance = function(){                                                                               // 29
    var _this = this;                                                                                                 // 30
                                                                                                                      // 31
    if(this.blockSubscription) {                                                                                      // 32
        this.blockSubscription.stopWatching();                                                                        // 33
    }                                                                                                                 // 34
                                                                                                                      // 35
    // UPDATE SIMPLE ACCOUNTS balance on each new block                                                               // 36
    this.blockSubscription = web3.eth.filter('latest');                                                               // 37
    this.blockSubscription.watch(function(e, res){                                                                    // 38
        if(!e) {                                                                                                      // 39
            _this._updateBalance();                                                                                   // 40
        }                                                                                                             // 41
    });                                                                                                               // 42
};                                                                                                                    // 43
                                                                                                                      // 44
/**                                                                                                                   // 45
Updates the accounts balances.                                                                                        // 46
                                                                                                                      // 47
@method _updateBalance                                                                                                // 48
*/                                                                                                                    // 49
EthAccounts._updateBalance = function(){                                                                              // 50
    var _this = this;                                                                                                 // 51
                                                                                                                      // 52
    _.each(EthAccounts.find({}).fetch(), function(account){                                                           // 53
        web3.eth.getBalance(account.address, function(err, res){                                                      // 54
            if(!err) {                                                                                                // 55
                if(res.toFixed) {                                                                                     // 56
                    res = res.toFixed();                                                                              // 57
                }                                                                                                     // 58
                                                                                                                      // 59
                EthAccounts.update(account._id, {                                                                     // 60
                    $set: {                                                                                           // 61
                        balance: res                                                                                  // 62
                    }                                                                                                 // 63
                });                                                                                                   // 64
            }                                                                                                         // 65
        });                                                                                                           // 66
    });                                                                                                               // 67
}                                                                                                                     // 68
                                                                                                                      // 69
/**                                                                                                                   // 70
Updates the accounts list,                                                                                            // 71
if its finds a difference between the accounts in the collection and the accounts in the accounts array.              // 72
                                                                                                                      // 73
@method _addAccounts                                                                                                  // 74
*/                                                                                                                    // 75
EthAccounts._addAccounts = function(){                                                                                // 76
    var _this = this;                                                                                                 // 77
                                                                                                                      // 78
    // UPDATE normal accounts on start                                                                                // 79
    web3.eth.getAccounts(function(e, accounts){                                                                       // 80
        if(!e) {                                                                                                      // 81
            var visibleAccounts = _.pluck(EthAccounts.find().fetch(), 'address');                                     // 82
                                                                                                                      // 83
                                                                                                                      // 84
            if(!_.isEmpty(accounts) &&                                                                                // 85
                _.difference(accounts, visibleAccounts).length === 0 &&                                               // 86
                _.difference(visibleAccounts, accounts).length === 0)                                                 // 87
                return;                                                                                               // 88
                                                                                                                      // 89
                                                                                                                      // 90
            var localAccounts = EthAccounts.findAll().fetch();                                                        // 91
                                                                                                                      // 92
            // if the accounts are different, update the local ones                                                   // 93
            _.each(localAccounts, function(account){                                                                  // 94
                                                                                                                      // 95
                // needs to have the balance                                                                          // 96
                if(!account.balance)                                                                                  // 97
                    return;                                                                                           // 98
                                                                                                                      // 99
                // set status deactivated, if it seem to be gone                                                      // 100
                if(!_.contains(accounts, account.address)) {                                                          // 101
                    EthAccounts.updateAll(account._id, {                                                              // 102
                        $set: {                                                                                       // 103
                            deactivated: true                                                                         // 104
                        }                                                                                             // 105
                    });                                                                                               // 106
                } else {                                                                                              // 107
                    EthAccounts.updateAll(account._id, {                                                              // 108
                        $unset: {                                                                                     // 109
                            deactivated: ''                                                                           // 110
                        }                                                                                             // 111
                    });                                                                                               // 112
                }                                                                                                     // 113
                                                                                                                      // 114
                accounts = _.without(accounts, account.address);                                                      // 115
            });                                                                                                       // 116
                                                                                                                      // 117
            // ADD missing accounts                                                                                   // 118
            var accountsCount = visibleAccounts.length + 1;                                                           // 119
            _.each(accounts, function(address){                                                                       // 120
                                                                                                                      // 121
                web3.eth.getBalance(address, function(e, balance){                                                    // 122
                    if(!e) {                                                                                          // 123
                        if(balance.toFixed) {                                                                         // 124
                            balance = balance.toFixed();                                                              // 125
                        }                                                                                             // 126
                                                                                                                      // 127
                        web3.eth.getCoinbase(function(e, coinbase){                                                   // 128
                            var doc = EthAccounts.findAll({                                                           // 129
                                address: address,                                                                     // 130
                            }).fetch()[0];                                                                            // 131
                                                                                                                      // 132
                            var insert = {                                                                            // 133
                                type: 'account',                                                                      // 134
                                address: address,                                                                     // 135
                                balance: balance,                                                                     // 136
                                name: (address === coinbase) ? 'Main account (Etherbase)' : 'Account '+ accountsCount
                            };                                                                                        // 138
                                                                                                                      // 139
                            if(doc) {                                                                                 // 140
                                EthAccounts.updateAll(doc._id, {                                                      // 141
                                    $set: insert                                                                      // 142
                                });                                                                                   // 143
                            } else {                                                                                  // 144
                                EthAccounts.insert(insert);                                                           // 145
                            }                                                                                         // 146
                                                                                                                      // 147
                            if(address !== coinbase)                                                                  // 148
                                accountsCount++;                                                                      // 149
                        });                                                                                           // 150
                    }                                                                                                 // 151
                });                                                                                                   // 152
                                                                                                                      // 153
            });                                                                                                       // 154
        }                                                                                                             // 155
    });                                                                                                               // 156
};                                                                                                                    // 157
                                                                                                                      // 158
                                                                                                                      // 159
                                                                                                                      // 160
/**                                                                                                                   // 161
Builds the query with the addition of "{deactivated: {$exists: false}}"                                               // 162
                                                                                                                      // 163
@method _addToQuery                                                                                                   // 164
@param {Mixed} arg                                                                                                    // 165
@param {Object} options                                                                                               // 166
@param {Object} options.includeDeactivated If set then de-activated accounts are also included.                       // 167
@return {Object} The query                                                                                            // 168
*/                                                                                                                    // 169
EthAccounts._addToQuery = function(args, options){                                                                    // 170
    var _this = this;                                                                                                 // 171
                                                                                                                      // 172
    options = _.extend({                                                                                              // 173
        includeDeactivated: false                                                                                     // 174
    }, options);                                                                                                      // 175
                                                                                                                      // 176
    var args = Array.prototype.slice.call(args);                                                                      // 177
                                                                                                                      // 178
    if(_.isString(args[0])) {                                                                                         // 179
        args[0] = {                                                                                                   // 180
            _id: args[0],                                                                                             // 181
        };                                                                                                            // 182
    }                                                                                                                 // 183
    else if (!_.isObject(args[0])) {                                                                                  // 184
        args[0] = {};                                                                                                 // 185
    }                                                                                                                 // 186
                                                                                                                      // 187
    if (!options.includeDeactivated) {                                                                                // 188
        args[0] = _.extend(args[0], {                                                                                 // 189
            deactivated: {$exists: false}                                                                             // 190
        });                                                                                                           // 191
    }                                                                                                                 // 192
                                                                                                                      // 193
    return args;                                                                                                      // 194
};                                                                                                                    // 195
                                                                                                                      // 196
                                                                                                                      // 197
/**                                                                                                                   // 198
Find all accounts, besides the deactivated ones                                                                       // 199
                                                                                                                      // 200
@method find                                                                                                          // 201
@return {Object} cursor                                                                                               // 202
*/                                                                                                                    // 203
EthAccounts.find = function(){                                                                                        // 204
    return this._collection.find.apply(this, this._addToQuery(arguments));                                            // 205
};                                                                                                                    // 206
                                                                                                                      // 207
/**                                                                                                                   // 208
Find all accounts, including the deactivated ones                                                                     // 209
                                                                                                                      // 210
@method findAll                                                                                                       // 211
@return {Object} cursor                                                                                               // 212
*/                                                                                                                    // 213
EthAccounts.findAll = function() {                                                                                    // 214
    return this._collection.find.apply(this, this._addToQuery(arguments, {                                            // 215
        includeDeactivated: true                                                                                      // 216
    }));                                                                                                              // 217
}                                                                                                                     // 218
                                                                                                                      // 219
/**                                                                                                                   // 220
Find one accounts, besides the deactivated ones                                                                       // 221
                                                                                                                      // 222
@method findOne                                                                                                       // 223
@return {Object} cursor                                                                                               // 224
*/                                                                                                                    // 225
EthAccounts.findOne = function(){                                                                                     // 226
    return this._collection.findOne.apply(this, this._addToQuery(arguments));                                         // 227
};                                                                                                                    // 228
                                                                                                                      // 229
/**                                                                                                                   // 230
Update accounts, besides the deactivated ones                                                                         // 231
                                                                                                                      // 232
@method update                                                                                                        // 233
@return {Object} cursor                                                                                               // 234
*/                                                                                                                    // 235
EthAccounts.update = function(){                                                                                      // 236
    return this._collection.update.apply(this, this._addToQuery(arguments));                                          // 237
};                                                                                                                    // 238
                                                                                                                      // 239
/**                                                                                                                   // 240
Update accounts, including the deactivated ones                                                                       // 241
                                                                                                                      // 242
@method updateAll                                                                                                     // 243
@return {Object} cursor                                                                                               // 244
*/                                                                                                                    // 245
EthAccounts.updateAll = function() {                                                                                  // 246
    return this._collection.update.apply(this, this._addToQuery(arguments, {                                          // 247
        includeDeactivated: true                                                                                      // 248
    }));                                                                                                              // 249
}                                                                                                                     // 250
                                                                                                                      // 251
/**                                                                                                                   // 252
Update accounts, including the deactivated ones                                                                       // 253
                                                                                                                      // 254
@method upsert                                                                                                        // 255
@return {Object} cursor                                                                                               // 256
*/                                                                                                                    // 257
EthAccounts.upsert = function() {                                                                                     // 258
    return this._collection.upsert.apply(this, this._addToQuery(arguments, {                                          // 259
        includeDeactivated: true                                                                                      // 260
    }));                                                                                                              // 261
}                                                                                                                     // 262
                                                                                                                      // 263
                                                                                                                      // 264
/**                                                                                                                   // 265
Starts fetching and watching the accounts                                                                             // 266
                                                                                                                      // 267
@method init                                                                                                          // 268
*/                                                                                                                    // 269
EthAccounts.init = function() {                                                                                       // 270
    var _this = this;                                                                                                 // 271
                                                                                                                      // 272
    if(typeof web3 === 'undefined') {                                                                                 // 273
        console.warn('EthAccounts couldn\'t find web3, please make sure to instantiate a web3 object before calling EthAccounts.init()');
        return;                                                                                                       // 275
    }                                                                                                                 // 276
                                                                                                                      // 277
    Tracker.nonreactive(function(){                                                                                   // 278
                                                                                                                      // 279
        _this._addAccounts();                                                                                         // 280
                                                                                                                      // 281
        _this._updateBalance();                                                                                       // 282
        _this._watchBalance();                                                                                        // 283
                                                                                                                      // 284
        // check for new accounts every 2s                                                                            // 285
        Meteor.clearInterval(_this._intervalId);                                                                      // 286
        _this._intervalId = Meteor.setInterval(function(){                                                            // 287
            _this._addAccounts();                                                                                     // 288
        }, 2000);                                                                                                     // 289
                                                                                                                      // 290
    });                                                                                                               // 291
};                                                                                                                    // 292
                                                                                                                      // 293
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['ethereum:accounts'] = {}, {
  EthAccounts: EthAccounts
});

})();
