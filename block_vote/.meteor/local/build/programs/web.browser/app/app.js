var require = meteorInstall({"client":{"template":{"components":{"template.accountInfo.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/template/components/template.accountInfo.js                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("accountBalanceComponent");                                                                    // 2
Template["accountBalanceComponent"] = new Template("Template.accountBalanceComponent", (function() {                // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    class: "panel panel-primary"                                                                                    // 6
  }, HTML.Raw('\n    <div class="panel-heading">\n      <h4>Account Balance</h4>\n    </div>\n    '), HTML.TABLE({  // 7
    class: "table"                                                                                                  // 8
  }, "\n      ", HTML.THEAD("\n        ", HTML.TR("\n          ", HTML.TH("Name"), "\n          ", HTML.TH("Address"), "\n          ", HTML.TH("Balance[in ether]"), "\n        "), "\n      "), "\n      ", HTML.TBODY("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("accounts"));                                                                 // 10
  }, function() {                                                                                                   // 11
    return [ "\n          ", Spacebars.include(view.lookupTemplate("accountBalanceItem")), "\n        " ];          // 12
  }), "\n      "), "\n    "), "\n  ");                                                                              // 13
}));                                                                                                                // 14
                                                                                                                    // 15
Template.__checkName("accountBalanceItem");                                                                         // 16
Template["accountBalanceItem"] = new Template("Template.accountBalanceItem", (function() {                          // 17
  var view = this;                                                                                                  // 18
  return HTML.TR("\n    ", HTML.TD(Blaze.View("lookup:name", function() {                                           // 19
    return Spacebars.mustache(view.lookup("name"));                                                                 // 20
  })), "\n    ", HTML.TD(Blaze.View("lookup:address", function() {                                                  // 21
    return Spacebars.mustache(view.lookup("address"));                                                              // 22
  })), "\n    ", HTML.TD(Blaze.View("lookup:balance", function() {                                                  // 23
    return Spacebars.mustache(view.lookup("balance"));                                                              // 24
  })), "\n  ");                                                                                                     // 25
}));                                                                                                                // 26
                                                                                                                    // 27
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.sendEther.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/template/components/template.sendEther.js                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("sendEtherComponent");                                                                         // 2
Template["sendEtherComponent"] = new Template("Template.sendEtherComponent", (function() {                          // 3
  var view = this;                                                                                                  // 4
  return [ HTML.DIV({                                                                                               // 5
    class: "panel panel-primary"                                                                                    // 6
  }, "\n    ", HTML.Raw('<div class="panel-heading">\n      <h4>Send Ether</h4>\n    </div>'), "\n    ", HTML.DIV({
    class: "panel-body"                                                                                             // 8
  }, "\n      ", HTML.FORM({                                                                                        // 9
    class: "form-horizontal"                                                                                        // 10
  }, "\n        ", Blaze._TemplateWith(function() {                                                                 // 11
    return {                                                                                                        // 12
      inputId: Spacebars.call("f-addr"),                                                                            // 13
      labelStr: Spacebars.call("From:"),                                                                            // 14
      placeholderStr: Spacebars.call("0x1234abcdef....")                                                            // 15
    };                                                                                                              // 16
  }, function() {                                                                                                   // 17
    return Spacebars.include(view.lookupTemplate("sendInputTemplate"));                                             // 18
  }), "\n        ", Blaze._TemplateWith(function() {                                                                // 19
    return {                                                                                                        // 20
      inputId: Spacebars.call("t-addr"),                                                                            // 21
      labelStr: Spacebars.call("To:"),                                                                              // 22
      placeholderStr: Spacebars.call("0x1234abcdef....")                                                            // 23
    };                                                                                                              // 24
  }, function() {                                                                                                   // 25
    return Spacebars.include(view.lookupTemplate("sendInputTemplate"));                                             // 26
  }), "\n        ", Blaze._TemplateWith(function() {                                                                // 27
    return {                                                                                                        // 28
      inputId: Spacebars.call("amount"),                                                                            // 29
      labelStr: Spacebars.call("Amount(ether):"),                                                                   // 30
      placeholderStr: Spacebars.call("0.0")                                                                         // 31
    };                                                                                                              // 32
  }, function() {                                                                                                   // 33
    return Spacebars.include(view.lookupTemplate("sendInputTemplate"));                                             // 34
  }), "\n        ", HTML.Raw('<input type="submit" value="submit" class="btn btn-primary col-md-offset-6">'), "\n      "), "\n    "), "\n  "), "\n  ", Spacebars.include(view.lookupTemplate("sendConfirmModalTemplate")) ];
}));                                                                                                                // 36
                                                                                                                    // 37
Template.__checkName("sendInputTemplate");                                                                          // 38
Template["sendInputTemplate"] = new Template("Template.sendInputTemplate", (function() {                            // 39
  var view = this;                                                                                                  // 40
  return HTML.DIV({                                                                                                 // 41
    class: "form-group"                                                                                             // 42
  }, "\n    ", HTML.LABEL({                                                                                         // 43
    class: "control-label col-md-3",                                                                                // 44
    for: function() {                                                                                               // 45
      return Spacebars.mustache(view.lookup("inputId"));                                                            // 46
    }                                                                                                               // 47
  }, Blaze.View("lookup:labelStr", function() {                                                                     // 48
    return Spacebars.mustache(view.lookup("labelStr"));                                                             // 49
  })), "\n    ", HTML.DIV({                                                                                         // 50
    class: "controls col-md-6"                                                                                      // 51
  }, "\n      ", HTML.INPUT({                                                                                       // 52
    name: function() {                                                                                              // 53
      return Spacebars.mustache(view.lookup("inputId"));                                                            // 54
    },                                                                                                              // 55
    id: function() {                                                                                                // 56
      return Spacebars.mustache(view.lookup("iputId"));                                                             // 57
    },                                                                                                              // 58
    type: "text",                                                                                                   // 59
    value: "",                                                                                                      // 60
    placeholder: function() {                                                                                       // 61
      return Spacebars.mustache(view.lookup("placeholderStr"));                                                     // 62
    },                                                                                                              // 63
    class: "form-control"                                                                                           // 64
  }), "\n    "), "\n  ");                                                                                           // 65
}));                                                                                                                // 66
                                                                                                                    // 67
Template.__checkName("sendConfirmModalTemplate");                                                                   // 68
Template["sendConfirmModalTemplate"] = new Template("Template.sendConfirmModalTemplate", (function() {              // 69
  var view = this;                                                                                                  // 70
  return HTML.DIV({                                                                                                 // 71
    class: "modal fade",                                                                                            // 72
    id: "sendConfirmModal"                                                                                          // 73
  }, "\n    ", HTML.DIV({                                                                                           // 74
    class: "modal-dialog"                                                                                           // 75
  }, "\n      ", HTML.DIV({                                                                                         // 76
    class: "modal-content"                                                                                          // 77
  }, "\n        ", HTML.Raw('<div class="modal-header alert-danger">\n          <h4 class="modal-title">Confirmation</h4>\n        </div>'), "\n        ", HTML.DIV({
    class: "modal-body"                                                                                             // 79
  }, "\n          ", HTML.H4("Send ", Blaze.View("lookup:sendAmountInEther", function() {                           // 80
    return Spacebars.mustache(view.lookup("sendAmountInEther"));                                                    // 81
  }), " ETHER"), "\n          ", HTML.UL("\n            ", HTML.LI(HTML.Raw("<b>From:</b>"), " ", Blaze.View("lookup:fAddr", function() {
    return Spacebars.mustache(view.lookup("fAddr"));                                                                // 83
  })), "\n            ", HTML.LI(HTML.Raw("<b>To:</b>"), " ", Blaze.View("lookup:tAddr", function() {               // 84
    return Spacebars.mustache(view.lookup("tAddr"));                                                                // 85
  })), "\n            ", HTML.LI(HTML.Raw("<b>Estimated Fee:</b>"), " ", Blaze.View("lookup:fee", function() {      // 86
    return Spacebars.mustache(view.lookup("fee"));                                                                  // 87
  }), " Ether."), "\n          "), "\n          ", HTML.Raw("<br>"), "\n          ", HTML.Raw("<h4>Do you really send the Ether?</h4>"), "\n        "), "\n        ", HTML.Raw('<div class="modal-footer">\n          <button type="button" class="btn btn-default" id="send">Yes</button>\n            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>\n        </div>'), "\n      "), "\n    "), "\n  ");
}));                                                                                                                // 89
                                                                                                                    // 90
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"accountInfo.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/template/components/accountInfo.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Template.accountBalanceComponent.helpers({                                                                          // 1
  accounts: function () {                                                                                           // 2
    return EthAccounts.find({});                                                                                    // 3
  }                                                                                                                 // 4
});                                                                                                                 // 1
Template.accountBalanceItem.helpers({                                                                               // 7
  name: function () {                                                                                               // 8
    return this.name;                                                                                               // 9
  },                                                                                                                // 10
  address: function () {                                                                                            // 11
    return this.address;                                                                                            // 12
  },                                                                                                                // 13
  balance: function () {                                                                                            // 14
    var balanceEth = web3.fromWei(this.balance, "ether");                                                           // 15
    return parseFloat(balanceEth).toFixed(3);                                                                       // 16
  }                                                                                                                 // 17
});                                                                                                                 // 7
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sendEther.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/template/components/sendEther.js                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var estimatedFeeInWei = function () {                                                                               // 1
  var gas = Session.get('sendEther.estimatedGas');                                                                  // 2
  var gasPrice = new BigNumber(Session.get('sendEther.currentGasPrice'));                                           // 3
  return gasPrice.mul(gas);                                                                                         // 4
};                                                                                                                  // 5
                                                                                                                    //
var estimationCallback = function (e, res) {                                                                        // 7
  var template = this;                                                                                              // 8
  console.log('Estimated gas: ', res, e);                                                                           // 9
                                                                                                                    //
  if (!e && res) {                                                                                                  // 10
    Session.set('sendEther.estimatedGas', res);                                                                     // 11
  }                                                                                                                 // 12
};                                                                                                                  // 13
                                                                                                                    //
var getGasPriceCallback = function (e, res) {                                                                       // 15
  var template = this;                                                                                              // 16
  console.log('Current Gas Price in Wei: ', res.toString(10), e);                                                   // 17
                                                                                                                    //
  if (!e && res) {                                                                                                  // 18
    Session.set('sendEther.currentGasPrice', res.toString(10));                                                     // 19
  }                                                                                                                 // 20
};                                                                                                                  // 21
                                                                                                                    //
Template.sendEtherComponent.events({                                                                                // 23
  'submit form': function (e) {                                                                                     // 24
    var template = this;                                                                                            // 25
    e.preventDefault();                                                                                             // 26
    var fundInfo = {                                                                                                // 27
      fAddr: $(e.target).find('[name=f-addr]').val(),                                                               // 28
      tAddr: $(e.target).find('[name=t-addr]').val(),                                                               // 29
      amount: web3.toWei($(e.target).find('[name=amount]').val(), 'ether')                                          // 30
    };                                                                                                              // 27
                                                                                                                    //
    if (EthAccounts.findOne({                                                                                       // 33
      address: fundInfo.fAddr                                                                                       // 33
    }, {                                                                                                            // 33
      reactive: false                                                                                               // 33
    })) {                                                                                                           // 33
      Session.set('sendEther.fundInfo', fundInfo);                                                                  // 34
      web3.eth.estimateGas({                                                                                        // 35
        from: fundInfo.fAddr,                                                                                       // 35
        to: fundInfo.tAddr,                                                                                         // 35
        value: fundInfo.amount                                                                                      // 35
      }, estimationCallback.bind(template));                                                                        // 35
      web3.eth.getGasPrice(getGasPriceCallback.bind(template));                                                     // 36
      $('#sendConfirmModal').modal('show');                                                                         // 37
    }                                                                                                               // 38
  }                                                                                                                 // 39
});                                                                                                                 // 23
Template.sendConfirmModalTemplate.helpers({                                                                         // 42
  sendAmountInEther: function () {                                                                                  // 43
    var amountEth = web3.fromWei(Session.get("sendEther.fundInfo").amount, 'ether');                                // 44
    return parseFloat(amountEth).toFixed(3);                                                                        // 45
  },                                                                                                                // 46
  fAddr: function () {                                                                                              // 47
    return Session.get("sendEther.fundInfo").fAddr;                                                                 // 48
  },                                                                                                                // 49
  tAddr: function () {                                                                                              // 50
    return Session.get("sendEther.fundInfo").tAddr;                                                                 // 51
  },                                                                                                                // 52
  fee: function () {                                                                                                // 53
    return web3.fromWei(estimatedFeeInWei(), 'ether').toString(10);                                                 // 54
  }                                                                                                                 // 55
});                                                                                                                 // 42
Template.sendConfirmModalTemplate.events({                                                                          // 58
  'click #send': function (e) {                                                                                     // 59
    e.preventDefault();                                                                                             // 60
    var fundInfo = Session.get("sendEther.fundInfo");                                                               // 61
    web3.eth.sendTransaction({                                                                                      // 62
      from: fundInfo.fAddr,                                                                                         // 63
      to: fundInfo.tAddr,                                                                                           // 64
      value: fundInfo.amount                                                                                        // 65
    }, function (error, txHash) {                                                                                   // 62
      console.log("Transaction Hash:", txHash, error);                                                              // 67
                                                                                                                    //
      if (!error) {                                                                                                 // 68
        alert("Ether Transfer Succeeded");                                                                          // 69
      } else {                                                                                                      // 70
        alert("Ether Transfer Failed");                                                                             // 71
      }                                                                                                             // 72
    });                                                                                                             // 73
    $('#sendConfirmModal').modal('hide');                                                                           // 74
  }                                                                                                                 // 75
});                                                                                                                 // 58
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"views":{"template.dashboard.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/template/views/template.dashboard.js                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("dashboard");                                                                                  // 2
Template["dashboard"] = new Template("Template.dashboard", (function() {                                            // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    class: "row-fluid"                                                                                              // 6
  }, "\n    ", HTML.DIV({                                                                                           // 7
    class: "col-md-8 col-md-offset-2"                                                                               // 8
  }, "\n\n      ", Spacebars.include(view.lookupTemplate("accountBalanceComponent")), "\n    "), "\n  ");           // 9
}));                                                                                                                // 10
                                                                                                                    // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.send.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/template/views/template.send.js                                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("sendEther");                                                                                  // 2
Template["sendEther"] = new Template("Template.sendEther", (function() {                                            // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    class: "row-fluid"                                                                                              // 6
  }, "\n    ", HTML.DIV({                                                                                           // 7
    class: "col-md-8 col-md-offset-2"                                                                               // 8
  }, "\n      ", Spacebars.include(view.lookupTemplate("sendEtherComponent")), "\n    "), "\n  ");                  // 9
}));                                                                                                                // 10
                                                                                                                    // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"main.html":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/main.html                                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exports = require("./template.main.js");                                                                     // 1
                                                                                                                    // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.main.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/template.main.js                                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("walletLayout");                                                                               // 2
Template["walletLayout"] = new Template("Template.walletLayout", (function() {                                      // 3
  var view = this;                                                                                                  // 4
  return [ HTML.Raw('<header>\n          <h2 align="center" style="color:blue">Mini-Dashboard</h2>\n    </header>\n'), HTML.NAV({
    class: "navbar navbar-default"                                                                                  // 6
  }, "\n  ", HTML.DIV({                                                                                             // 7
    class: "container-fluid"                                                                                        // 8
  }, "\n    ", HTML.Raw('<div class="navbar-header">\n      <!--<a class="navbar-brand" href="{{pathFor \'dashboard\'}}">Mini Ether Dashboard</a> -->\n    </div>'), "\n    ", HTML.UL({
    class: "nav navbar-nav"                                                                                         // 10
  }, "\n      ", HTML.LI({                                                                                          // 11
    class: function() {                                                                                             // 12
      return Spacebars.mustache(view.lookup("activeIfCurrent"), "dashboard");                                       // 13
    }                                                                                                               // 14
  }, HTML.A({                                                                                                       // 15
    href: function() {                                                                                              // 16
      return Spacebars.mustache(view.lookup("pathFor"), "dashboard");                                               // 17
    }                                                                                                               // 18
  }, "Dashboard")), "\n      ", HTML.LI({                                                                           // 19
    class: function() {                                                                                             // 20
      return Spacebars.mustache(view.lookup("activeIfCurrent"), "sendEther");                                       // 21
    }                                                                                                               // 22
  }, HTML.A({                                                                                                       // 23
    href: function() {                                                                                              // 24
      return Spacebars.mustache(view.lookup("pathFor"), "sendEther");                                               // 25
    }                                                                                                               // 26
  }, "Send Ether")), "\n    "), "\n  "), "\n"), "\n", HTML.MAIN({                                                   // 27
    class: "container-fluid"                                                                                        // 28
  }, "\n  ", Spacebars.include(view.lookupTemplate("yield")), "\n"), HTML.Raw("\n<hr>\n<footer>MLGBlockchain @2017</footer>") ];
}));                                                                                                                // 30
                                                                                                                    // 31
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"modules":{"defaultSession.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/lib/modules/defaultSession.js                                                                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
defaultSessionVars = function () {                                                                                  // 1
        var initialFundInfo = {                                                                                     // 2
                ammount: 0,                                                                                         // 2
                fAddr: 0x0,                                                                                         // 2
                tAddr: 0x0                                                                                          // 2
        };                                                                                                          // 2
        Session.setDefault("sendEther.fundInfo", initialFundInfo);                                                  // 4
        Session.setDefault("sendEther.estimatedGas", 0);                                                            // 5
        Session.setDefault("sendEther.currentGasPrice", 0);                                                         // 6
};                                                                                                                  // 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"init.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/lib/init.js                                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Checks Web3 support                                                                                              // 1
if (typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {                                                   // 2
    // If there's a web3 library loaded, then make your own web3                                                    // 3
    web3 = new Web3(web3.currentProvider);                                                                          // 4
} else if (typeof Web3 !== 'undefined') {                                                                           // 5
    // If there isn't then set a provider                                                                           // 6
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));                                      // 7
} else if (typeof web3 == 'undefined') {                                                                            // 8
    // Alert the user he is not in a web3 compatible browser                                                        // 9
    return;                                                                                                         // 10
} //initialize the account                                                                                          // 11
                                                                                                                    //
                                                                                                                    //
EthAccounts.init //initialize the session with default value                                                        // 14
();                                                                                                                 // 14
defaultSessionVars();                                                                                               // 16
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"route.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/lib/route.js                                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Router.configure({                                                                                                  // 1
	// LayoutTemplate                                                                                                  // 2
	layoutTemplate: 'walletLayout'                                                                                     // 3
});                                                                                                                 // 1
Router.route('/', function () {                                                                                     // 6
	//set redirect assosiated with '/'                                                                                 // 7
	this.redirect('/dashboard');                                                                                       // 8
}); // Set mapping between URL and Route template.                                                                  // 9
                                                                                                                    //
Router.route('/dashboard', {                                                                                        // 12
	name: 'dashboard'                                                                                                  // 12
});                                                                                                                 // 12
Router.route('/sendEther', {                                                                                        // 13
	name: 'sendEther'                                                                                                  // 13
});                                                                                                                 // 13
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/main.js                                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var Template = void 0;                                                                                              // 1
module.watch(require("meteor/templating"), {                                                                        // 1
  Template: function (v) {                                                                                          // 1
    Template = v;                                                                                                   // 1
  }                                                                                                                 // 1
}, 0);                                                                                                              // 1
var ReactiveVar = void 0;                                                                                           // 1
module.watch(require("meteor/reactive-var"), {                                                                      // 1
  ReactiveVar: function (v) {                                                                                       // 1
    ReactiveVar = v;                                                                                                // 1
  }                                                                                                                 // 1
}, 1);                                                                                                              // 1
module.watch(require("./main.html"));                                                                               // 1
Template.walletLayout.helpers({                                                                                     // 6
  activeIfCurrent: function (template) {                                                                            // 8
    var currentRoute = Router.current();                                                                            // 9
                                                                                                                    //
    if (currentRoute && template === Router.current().route.getName()) {                                            // 10
      return 'active';                                                                                              // 11
    } else {                                                                                                        // 12
      return '';                                                                                                    // 13
    }                                                                                                               // 14
  }                                                                                                                 // 15
});                                                                                                                 // 6
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});
require("./client/template/components/template.accountInfo.js");
require("./client/template/components/template.sendEther.js");
require("./client/template/views/template.dashboard.js");
require("./client/template/views/template.send.js");
require("./client/template.main.js");
require("./client/lib/modules/defaultSession.js");
require("./client/lib/init.js");
require("./client/lib/route.js");
require("./client/template/components/accountInfo.js");
require("./client/template/components/sendEther.js");
require("./client/main.js");