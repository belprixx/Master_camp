var require = meteorInstall({"smart_contracts":{"solc-js":{"test":{"abi.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/test/abi.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var tape = require('tape');                                                                                          // 1
                                                                                                                     //
var abi = require('../abi.js');                                                                                      // 2
                                                                                                                     //
tape('ABI translator', function (t) {                                                                                // 4
  t.test('Empty ABI', function (st) {                                                                                // 5
    st.deepEqual(abi.update('0.4.0', []), []);                                                                       // 6
    st.end();                                                                                                        // 7
  });                                                                                                                // 8
  t.test('0.1.1 (no constructor)', function (st) {                                                                   // 9
    st.deepEqual(abi.update('0.1.1', []), [{                                                                         // 10
      inputs: [],                                                                                                    // 10
      payable: true,                                                                                                 // 10
      type: 'constructor'                                                                                            // 10
    }, {                                                                                                             // 10
      payable: true,                                                                                                 // 10
      type: 'fallback'                                                                                               // 10
    }]);                                                                                                             // 10
    st.end();                                                                                                        // 11
  });                                                                                                                // 12
  t.test('0.4.0 (has fallback)', function (st) {                                                                     // 13
    var input = [{                                                                                                   // 14
      inputs: [],                                                                                                    // 14
      type: 'constructor'                                                                                            // 14
    }];                                                                                                              // 14
    st.deepEqual(abi.update('0.4.0', input), [{                                                                      // 15
      inputs: [],                                                                                                    // 15
      payable: true,                                                                                                 // 15
      type: 'constructor'                                                                                            // 15
    }]);                                                                                                             // 15
    st.end();                                                                                                        // 16
  });                                                                                                                // 17
  t.test('0.4.1 (constructor not payable)', function (st) {                                                          // 18
    var input = [{                                                                                                   // 19
      inputs: [],                                                                                                    // 19
      payable: false,                                                                                                // 19
      type: 'constructor'                                                                                            // 19
    }];                                                                                                              // 19
    st.deepEqual(abi.update('0.4.1', input), [{                                                                      // 20
      inputs: [],                                                                                                    // 20
      payable: true,                                                                                                 // 20
      type: 'constructor'                                                                                            // 20
    }]);                                                                                                             // 20
    st.end();                                                                                                        // 21
  });                                                                                                                // 22
  t.test('0.4.5 (constructor payable)', function (st) {                                                              // 23
    var input = [{                                                                                                   // 24
      inputs: [],                                                                                                    // 24
      payable: false,                                                                                                // 24
      type: 'constructor'                                                                                            // 24
    }];                                                                                                              // 24
    st.deepEqual(abi.update('0.4.5', input), [{                                                                      // 25
      inputs: [],                                                                                                    // 25
      payable: false,                                                                                                // 25
      type: 'constructor'                                                                                            // 25
    }]);                                                                                                             // 25
    st.end();                                                                                                        // 26
  });                                                                                                                // 27
});                                                                                                                  // 28
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cli.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/test/cli.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var tape = require('tape');                                                                                          // 1
                                                                                                                     //
var spawn = require('tape-spawn');                                                                                   // 2
                                                                                                                     //
var pkg = require('../package.json');                                                                                // 3
                                                                                                                     //
tape('CLI', function (t) {                                                                                           // 5
  t.test('--version', function (st) {                                                                                // 6
    var spt = spawn(st, './solcjs --version');                                                                       // 7
    spt.stdout.match(RegExp(pkg.version + '(-[^a-zA-A0-9.+]+)?(\\+[^a-zA-Z0-9.-]+)?'));                              // 8
    spt.end();                                                                                                       // 9
  });                                                                                                                // 10
  t.test('no parameters', function (st) {                                                                            // 12
    var spt = spawn(st, './solcjs');                                                                                 // 13
    spt.stderr.match(/^Must provide a file/);                                                                        // 14
    spt.end();                                                                                                       // 15
  });                                                                                                                // 16
  t.test('no mode specified', function (st) {                                                                        // 18
    var spt = spawn(st, './solcjs test/DAO/Token.sol');                                                              // 19
    spt.stdout.match(/^Invalid option selected/);                                                                    // 20
    spt.end();                                                                                                       // 21
  });                                                                                                                // 22
  t.test('--bin', function (st) {                                                                                    // 24
    var spt = spawn(st, './solcjs --bin test/DAO/Token.sol');                                                        // 25
    spt.stderr.empty();                                                                                              // 26
    spt.succeeds();                                                                                                  // 27
    spt.end();                                                                                                       // 28
  });                                                                                                                // 29
  t.test('invalid file specified', function (st) {                                                                   // 31
    var spt = spawn(st, './solcjs --bin test/fileNotFound.sol');                                                     // 32
    spt.stdout.match(/^Error reading /);                                                                             // 33
    spt.end();                                                                                                       // 34
  });                                                                                                                // 35
  t.test('--abi', function (st) {                                                                                    // 37
    var spt = spawn(st, './solcjs --abi test/DAO/Token.sol');                                                        // 38
    spt.stderr.empty();                                                                                              // 39
    spt.succeeds();                                                                                                  // 40
    spt.end();                                                                                                       // 41
  });                                                                                                                // 42
  t.test('--bin --abi', function (st) {                                                                              // 44
    var spt = spawn(st, './solcjs --bin --abi test/DAO/Token.sol');                                                  // 45
    spt.stderr.empty();                                                                                              // 46
    spt.succeeds();                                                                                                  // 47
    spt.end();                                                                                                       // 48
  });                                                                                                                // 49
});                                                                                                                  // 50
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"determinism.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/test/determinism.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var tape = require('tape');                                                                                          // 1
                                                                                                                     //
var fs = require('fs');                                                                                              // 2
                                                                                                                     //
var solc = require('../index.js');                                                                                   // 3
                                                                                                                     //
tape('Deterministic Compilation', function (t) {                                                                     // 5
  t.test('DAO', function (st) {                                                                                      // 6
    var input = {};                                                                                                  // 7
    var prevBytecode = null;                                                                                         // 8
    var files = ['DAO.sol', 'Token.sol', 'TokenCreation.sol', 'ManagedAccount.sol'];                                 // 9
    var i;                                                                                                           // 10
                                                                                                                     //
    for (i in meteorBabelHelpers.sanitizeForInObject(files)) {                                                       // 11
      var file = files[i];                                                                                           // 12
      input[file] = fs.readFileSync('test/DAO/' + file, 'utf8');                                                     // 13
    }                                                                                                                // 14
                                                                                                                     //
    for (i = 0; i < 10; i++) {                                                                                       // 15
      var output = solc.compile({                                                                                    // 16
        sources: input                                                                                               // 16
      }, 1);                                                                                                         // 16
      var bytecode = output.contracts['DAO.sol:DAO'].bytecode;                                                       // 17
      st.ok(bytecode.length > 0);                                                                                    // 18
                                                                                                                     //
      if (prevBytecode !== null) {                                                                                   // 19
        st.equal(prevBytecode, bytecode);                                                                            // 20
      }                                                                                                              // 21
                                                                                                                     //
      prevBytecode = bytecode; // reset compiler state                                                               // 22
                                                                                                                     //
      solc.compile({                                                                                                 // 24
        sources: {                                                                                                   // 24
          f: 'contract c {}'                                                                                         // 24
        }                                                                                                            // 24
      }, 1);                                                                                                         // 24
    }                                                                                                                // 25
                                                                                                                     //
    st.end();                                                                                                        // 26
  });                                                                                                                // 27
});                                                                                                                  // 28
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/test/index.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
require('./package.js');                                                                                             // 1
                                                                                                                     //
require('./cli.js');                                                                                                 // 2
                                                                                                                     //
require('./determinism.js');                                                                                         // 3
                                                                                                                     //
require('./abi.js');                                                                                                 // 4
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"package.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/test/package.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var tape = require('tape');                                                                                          // 1
                                                                                                                     //
var solc = require('../index.js');                                                                                   // 2
                                                                                                                     //
tape('Compilation', function (t) {                                                                                   // 4
  t.test('single files can be compiled', function (st) {                                                             // 5
    var output = solc.compile('contract x { function g() {} }');                                                     // 6
    st.ok(':x' in output.contracts);                                                                                 // 7
    st.ok(output.contracts[':x'].bytecode.length > 0);                                                               // 8
    st.end();                                                                                                        // 9
  });                                                                                                                // 10
  t.test('multiple files can be compiled', function (st) {                                                           // 11
    var input = {                                                                                                    // 12
      'lib.sol': 'library L { function f() returns (uint) { return 7; } }',                                          // 13
      'cont.sol': 'import "lib.sol"; contract x { function g() { L.f(); } }'                                         // 14
    };                                                                                                               // 12
    var output = solc.compile({                                                                                      // 16
      sources: input                                                                                                 // 16
    });                                                                                                              // 16
    st.ok('cont.sol:x' in output.contracts);                                                                         // 17
    st.ok('lib.sol:L' in output.contracts);                                                                          // 18
    st.ok(output.contracts['cont.sol:x'].bytecode.length > 0);                                                       // 19
    st.ok(output.contracts['lib.sol:L'].bytecode.length > 0);                                                        // 20
    st.end();                                                                                                        // 21
  });                                                                                                                // 22
  t.test('lazy-loading callback works', function (st) {                                                              // 23
    var input = {                                                                                                    // 24
      'cont.sol': 'import "lib.sol"; contract x { function g() { L.f(); } }'                                         // 25
    };                                                                                                               // 24
                                                                                                                     //
    function findImports(path) {                                                                                     // 27
      if (path === 'lib.sol') {                                                                                      // 28
        return {                                                                                                     // 29
          contents: 'library L { function f() returns (uint) { return 7; } }'                                        // 29
        };                                                                                                           // 29
      } else {                                                                                                       // 30
        return {                                                                                                     // 31
          error: 'File not found'                                                                                    // 31
        };                                                                                                           // 31
      }                                                                                                              // 32
    }                                                                                                                // 33
                                                                                                                     //
    var output = solc.compile({                                                                                      // 34
      sources: input                                                                                                 // 34
    }, 0, findImports);                                                                                              // 34
    st.ok('cont.sol:x' in output.contracts);                                                                         // 35
    st.ok('lib.sol:L' in output.contracts);                                                                          // 36
    st.ok(output.contracts['cont.sol:x'].bytecode.length > 0);                                                       // 37
    st.ok(output.contracts['lib.sol:L'].bytecode.length > 0);                                                        // 38
    st.end();                                                                                                        // 39
  });                                                                                                                // 40
  t.test('compiling standard JSON', function (st) {                                                                  // 41
    if (!solc.supportsStandard) {                                                                                    // 42
      st.skip('Not supported by solc');                                                                              // 43
      st.end();                                                                                                      // 44
      return;                                                                                                        // 45
    }                                                                                                                // 46
                                                                                                                     //
    var input = {                                                                                                    // 48
      'language': 'Solidity',                                                                                        // 49
      'sources': {                                                                                                   // 50
        'lib.sol': {                                                                                                 // 51
          'content': 'library L { function f() returns (uint) { return 7; } }'                                       // 52
        },                                                                                                           // 51
        'cont.sol': {                                                                                                // 54
          'content': 'import "lib.sol"; contract x { function g() { L.f(); } }'                                      // 55
        }                                                                                                            // 54
      }                                                                                                              // 50
    };                                                                                                               // 48
                                                                                                                     //
    function bytecodeExists(output, fileName, contractName) {                                                        // 60
      try {                                                                                                          // 61
        return output.contracts[fileName][contractName]['evm']['bytecode']['object'].length > 0;                     // 62
      } catch (e) {                                                                                                  // 63
        return false;                                                                                                // 64
      }                                                                                                              // 65
    }                                                                                                                // 66
                                                                                                                     //
    var output = JSON.parse(solc.compileStandard(JSON.stringify(input)));                                            // 68
    st.ok(bytecodeExists(output, 'cont.sol', 'x'));                                                                  // 69
    st.ok(bytecodeExists(output, 'lib.sol', 'L'));                                                                   // 70
    st.end();                                                                                                        // 71
  });                                                                                                                // 72
  t.test('compiling standard JSON (with callback)', function (st) {                                                  // 73
    if (!solc.supportsStandard) {                                                                                    // 74
      st.skip('Not supported by solc');                                                                              // 75
      st.end();                                                                                                      // 76
      return;                                                                                                        // 77
    }                                                                                                                // 78
                                                                                                                     //
    var input = {                                                                                                    // 80
      'language': 'Solidity',                                                                                        // 81
      'sources': {                                                                                                   // 82
        'cont.sol': {                                                                                                // 83
          'content': 'import "lib.sol"; contract x { function g() { L.f(); } }'                                      // 84
        }                                                                                                            // 83
      }                                                                                                              // 82
    };                                                                                                               // 80
                                                                                                                     //
    function findImports(path) {                                                                                     // 89
      if (path === 'lib.sol') {                                                                                      // 90
        return {                                                                                                     // 91
          contents: 'library L { function f() returns (uint) { return 7; } }'                                        // 91
        };                                                                                                           // 91
      } else {                                                                                                       // 92
        return {                                                                                                     // 93
          error: 'File not found'                                                                                    // 93
        };                                                                                                           // 93
      }                                                                                                              // 94
    }                                                                                                                // 95
                                                                                                                     //
    function bytecodeExists(output, fileName, contractName) {                                                        // 97
      try {                                                                                                          // 98
        return output.contracts[fileName][contractName]['evm']['bytecode']['object'].length > 0;                     // 99
      } catch (e) {                                                                                                  // 100
        return false;                                                                                                // 101
      }                                                                                                              // 102
    }                                                                                                                // 103
                                                                                                                     //
    var output = JSON.parse(solc.compileStandard(JSON.stringify(input), findImports));                               // 105
    st.ok(bytecodeExists(output, 'cont.sol', 'x'));                                                                  // 106
    st.ok(bytecodeExists(output, 'lib.sol', 'L'));                                                                   // 107
    st.end();                                                                                                        // 108
  });                                                                                                                // 109
  t.test('compiling standard JSON (using wrapper)', function (st) {                                                  // 110
    var input = {                                                                                                    // 111
      'language': 'Solidity',                                                                                        // 112
      'sources': {                                                                                                   // 113
        'lib.sol': {                                                                                                 // 114
          'content': 'library L { function f() returns (uint) { return 7; } }'                                       // 115
        },                                                                                                           // 114
        'cont.sol': {                                                                                                // 117
          'content': 'import "lib.sol"; contract x { function g() { L.f(); } }'                                      // 118
        }                                                                                                            // 117
      }                                                                                                              // 113
    };                                                                                                               // 111
                                                                                                                     //
    function bytecodeExists(output, fileName, contractName) {                                                        // 123
      try {                                                                                                          // 124
        return output.contracts[fileName][contractName]['evm']['bytecode']['object'].length > 0;                     // 125
      } catch (e) {                                                                                                  // 126
        return false;                                                                                                // 127
      }                                                                                                              // 128
    }                                                                                                                // 129
                                                                                                                     //
    var output = JSON.parse(solc.compileStandardWrapper(JSON.stringify(input)));                                     // 131
    st.ok(bytecodeExists(output, 'cont.sol', 'x'));                                                                  // 132
    st.ok(bytecodeExists(output, 'lib.sol', 'L'));                                                                   // 133
    st.end();                                                                                                        // 134
  });                                                                                                                // 135
});                                                                                                                  // 136
tape('Loading Legacy Versions', function (t) {                                                                       // 137
  t.test('loading remote version - development snapshot', function (st) {                                            // 138
    // getting the development snapshot                                                                              // 139
    st.plan(3);                                                                                                      // 140
    solc.loadRemoteVersion('latest', function (err, solcSnapshot) {                                                  // 141
      st.notOk(err);                                                                                                 // 142
      var output = solcSnapshot.compile('contract x { function g() {} }');                                           // 143
      st.ok(':x' in output.contracts);                                                                               // 144
      st.ok(output.contracts[':x'].bytecode.length > 0);                                                             // 145
    });                                                                                                              // 146
  });                                                                                                                // 147
});                                                                                                                  // 148
tape('Linking', function (t) {                                                                                       // 150
  t.test('link properly', function (st) {                                                                            // 151
    var input = {                                                                                                    // 152
      'lib.sol': 'library L { function f() returns (uint) { return 7; } }',                                          // 153
      'cont.sol': 'import "lib.sol"; contract x { function g() { L.f(); } }'                                         // 154
    };                                                                                                               // 152
    var output = solc.compile({                                                                                      // 156
      sources: input                                                                                                 // 156
    });                                                                                                              // 156
    var bytecode = solc.linkBytecode(output.contracts['cont.sol:x'].bytecode, {                                      // 157
      'lib.sol:L': '0x123456'                                                                                        // 157
    });                                                                                                              // 157
    st.ok(bytecode.indexOf('_') < 0);                                                                                // 158
    st.end();                                                                                                        // 159
  });                                                                                                                // 160
  t.test('linker to fail with missing library', function (st) {                                                      // 162
    var input = {                                                                                                    // 163
      'lib.sol': 'library L { function f() returns (uint) { return 7; } }',                                          // 164
      'cont.sol': 'import "lib.sol"; contract x { function g() { L.f(); } }'                                         // 165
    };                                                                                                               // 163
    var output = solc.compile({                                                                                      // 167
      sources: input                                                                                                 // 167
    });                                                                                                              // 167
    var bytecode = solc.linkBytecode(output.contracts['cont.sol:x'].bytecode, {});                                   // 168
    st.ok(bytecode.indexOf('_') >= 0);                                                                               // 169
    st.end();                                                                                                        // 170
  });                                                                                                                // 171
  t.test('linker to fail with invalid address', function (st) {                                                      // 173
    var input = {                                                                                                    // 174
      'lib.sol': 'library L { function f() returns (uint) { return 7; } }',                                          // 175
      'cont.sol': 'import "lib.sol"; contract x { function g() { L.f(); } }'                                         // 176
    };                                                                                                               // 174
    var output = solc.compile({                                                                                      // 178
      sources: input                                                                                                 // 178
    });                                                                                                              // 178
    st.throws(function () {                                                                                          // 179
      solc.linkBytecode(output.contracts['cont.sol:x'].bytecode, {                                                   // 180
        'lib.sol:L': ''                                                                                              // 180
      });                                                                                                            // 180
    });                                                                                                              // 181
    st.end();                                                                                                        // 182
  });                                                                                                                // 183
  t.test('linker properly with truncated library name', function (st) {                                              // 185
    var input = {                                                                                                    // 186
      'lib.sol': 'library L1234567890123456789012345678901234567890 { function f() returns (uint) { return 7; } }',  // 187
      'cont.sol': 'import "lib.sol"; contract x { function g() { L1234567890123456789012345678901234567890.f(); } }'
    };                                                                                                               // 186
    var output = solc.compile({                                                                                      // 190
      sources: input                                                                                                 // 190
    });                                                                                                              // 190
    var bytecode = solc.linkBytecode(output.contracts['cont.sol:x'].bytecode, {                                      // 191
      'lib.sol:L1234567890123456789012345678901234567890': '0x123456'                                                // 191
    });                                                                                                              // 191
    st.ok(bytecode.indexOf('_') < 0);                                                                                // 192
    st.end();                                                                                                        // 193
  });                                                                                                                // 194
});                                                                                                                  // 195
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"abi.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/abi.js                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var semver = require('semver');                                                                                      // 1
                                                                                                                     //
function update(compilerVersion, abi) {                                                                              // 3
  var hasConstructor = false;                                                                                        // 4
  var hasFallback = false;                                                                                           // 5
                                                                                                                     //
  for (var i = 0; i < abi.length; i++) {                                                                             // 7
    var item = abi[i];                                                                                               // 8
                                                                                                                     //
    if (item.type === 'constructor') {                                                                               // 10
      hasConstructor = true; // <0.4.5 assumed every constructor to be payable                                       // 11
                                                                                                                     //
      if (semver.lt(compilerVersion, '0.4.5')) {                                                                     // 14
        item.payable = true;                                                                                         // 15
      }                                                                                                              // 16
    } else if (item.type === 'fallback') {                                                                           // 17
      hasFallback = true;                                                                                            // 18
    } // add 'payable' to everything                                                                                 // 19
                                                                                                                     //
                                                                                                                     //
    if (semver.lt(compilerVersion, '0.4.0')) {                                                                       // 22
      item.payable = true;                                                                                           // 23
    }                                                                                                                // 24
  } // 0.1.2 from Aug 2015 had it. The code has it since May 2015 (e7931ade)                                         // 25
                                                                                                                     //
                                                                                                                     //
  if (!hasConstructor && semver.lt(compilerVersion, '0.1.2')) {                                                      // 28
    abi.push({                                                                                                       // 29
      type: 'constructor',                                                                                           // 30
      payable: true,                                                                                                 // 31
      inputs: []                                                                                                     // 32
    });                                                                                                              // 29
  }                                                                                                                  // 34
                                                                                                                     //
  if (!hasFallback && semver.lt(compilerVersion, '0.4.0')) {                                                         // 36
    abi.push({                                                                                                       // 37
      type: 'fallback',                                                                                              // 38
      payable: true                                                                                                  // 39
    });                                                                                                              // 37
  }                                                                                                                  // 41
                                                                                                                     //
  return abi;                                                                                                        // 43
}                                                                                                                    // 44
                                                                                                                     //
module.exports = {                                                                                                   // 46
  update: update                                                                                                     // 47
};                                                                                                                   // 46
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"downloadCurrentVersion.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/downloadCurrentVersion.js                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
///usr/bin/env node                                                                                                  // 1
// This is used to download the correct binary version                                                               // 3
// as part of the prepublish step.                                                                                   // 4
var pkg = require('./package.json');                                                                                 // 6
                                                                                                                     //
var fs = require('fs');                                                                                              // 7
                                                                                                                     //
var https = require('https');                                                                                        // 8
                                                                                                                     //
var MemoryStream = require('memorystream');                                                                          // 9
                                                                                                                     //
function getVersionList(cb) {                                                                                        // 11
  console.log('Retrieving available version list...');                                                               // 12
  var mem = new MemoryStream(null, {                                                                                 // 14
    readable: false                                                                                                  // 14
  });                                                                                                                // 14
  https.get('https://ethereum.github.io/solc-bin/bin/list.json', function (response) {                               // 15
    if (response.statusCode !== 200) {                                                                               // 16
      console.log('Error downloading file: ' + response.statusCode);                                                 // 17
      process.exit(1);                                                                                               // 18
    }                                                                                                                // 19
                                                                                                                     //
    response.pipe(mem);                                                                                              // 20
    response.on('end', function () {                                                                                 // 21
      cb(mem.toString());                                                                                            // 22
    });                                                                                                              // 23
  });                                                                                                                // 24
}                                                                                                                    // 25
                                                                                                                     //
function downloadBinary(version) {                                                                                   // 27
  console.log('Downloading version', version);                                                                       // 28
  var file = fs.createWriteStream('soljson.js');                                                                     // 30
  https.get('https://ethereum.github.io/solc-bin/bin/' + version, function (response) {                              // 31
    if (response.statusCode !== 200) {                                                                               // 32
      console.log('Error downloading file: ' + response.statusCode);                                                 // 33
      process.exit(1);                                                                                               // 34
    }                                                                                                                // 35
                                                                                                                     //
    response.pipe(file);                                                                                             // 36
    file.on('finish', function () {                                                                                  // 37
      file.close(function () {                                                                                       // 38
        console.log('Done.');                                                                                        // 39
      });                                                                                                            // 40
    });                                                                                                              // 41
  });                                                                                                                // 42
}                                                                                                                    // 43
                                                                                                                     //
console.log('Downloading correct solidity binary...');                                                               // 45
getVersionList(function (list) {                                                                                     // 47
  list = JSON.parse(list);                                                                                           // 48
  var wanted = pkg.version.match(/^(\d+\.\d+\.\d+)$/)[1];                                                            // 49
  downloadBinary(list.releases[wanted]);                                                                             // 50
});                                                                                                                  // 51
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/index.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var wrapper = require('./wrapper.js');                                                                               // 1
                                                                                                                     //
module.exports = wrapper(require('./soljson.js'));                                                                   // 3
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"translate.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/translate.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
function translateErrors(ret, errors) {                                                                              // 1
  for (var error in meteorBabelHelpers.sanitizeForInObject(errors)) {                                                // 2
    var type = 'error';                                                                                              // 3
    var extractType = /^(.*):(\d+):(\d+):(.*):/;                                                                     // 4
    extractType = extractType.exec(errors[error]);                                                                   // 5
                                                                                                                     //
    if (extractType) {                                                                                               // 6
      type = extractType[4].trim();                                                                                  // 7
    } else if (errors[error].indexOf(': Warning:')) {                                                                // 8
      type = 'Warning';                                                                                              // 9
    } else if (errors[error].indexOf(': Error:')) {                                                                  // 10
      type = 'Error';                                                                                                // 11
    }                                                                                                                // 12
                                                                                                                     //
    ret.push({                                                                                                       // 13
      type: type,                                                                                                    // 14
      component: 'general',                                                                                          // 15
      severity: type === 'Warning' ? 'warning' : 'error',                                                            // 16
      message: errors[error],                                                                                        // 17
      formattedMessage: errors[error]                                                                                // 18
    });                                                                                                              // 13
  }                                                                                                                  // 20
}                                                                                                                    // 21
                                                                                                                     //
function translateGasEstimates(gasEstimates) {                                                                       // 23
  if (gasEstimates === null) {                                                                                       // 24
    return 'infinite';                                                                                               // 25
  }                                                                                                                  // 26
                                                                                                                     //
  if (typeof gasEstimates === 'number') {                                                                            // 28
    return gasEstimates.toString();                                                                                  // 29
  }                                                                                                                  // 30
                                                                                                                     //
  var gasEstimatesTranslated = {};                                                                                   // 32
                                                                                                                     //
  for (var func in meteorBabelHelpers.sanitizeForInObject(gasEstimates)) {                                           // 33
    gasEstimatesTranslated[func] = translateGasEstimates(gasEstimates[func]);                                        // 34
  }                                                                                                                  // 35
                                                                                                                     //
  return gasEstimatesTranslated;                                                                                     // 36
}                                                                                                                    // 37
                                                                                                                     //
function translateJsonCompilerOutput(output) {                                                                       // 39
  var ret = {};                                                                                                      // 40
  ret['errors'] = [];                                                                                                // 42
  translateErrors(ret['errors'], output['errors']);                                                                  // 43
  ret['contracts'] = {};                                                                                             // 45
                                                                                                                     //
  for (var contract in meteorBabelHelpers.sanitizeForInObject(output['contracts'])) {                                // 46
    // Split name first, can be `contract`, `:contract` or `filename:contract`                                       // 47
    var tmp = contract.match(/^(([^:]*):)?([^:]+)$/);                                                                // 48
                                                                                                                     //
    if (tmp.length !== 4) {                                                                                          // 49
      // Force abort                                                                                                 // 50
      return null;                                                                                                   // 51
    }                                                                                                                // 52
                                                                                                                     //
    var fileName = tmp[2];                                                                                           // 53
                                                                                                                     //
    if (fileName === undefined) {                                                                                    // 54
      // this is the case of `contract`                                                                              // 55
      fileName = '';                                                                                                 // 56
    }                                                                                                                // 57
                                                                                                                     //
    var contractName = tmp[3];                                                                                       // 58
    var contractInput = output['contracts'][contract];                                                               // 60
    var gasEstimates = contractInput['gasEstimates'];                                                                // 62
    var contractOutput = {                                                                                           // 64
      'abi': JSON.parse(contractInput['interface']),                                                                 // 65
      'metadata': contractInput['metadata'],                                                                         // 66
      'evm': {                                                                                                       // 67
        'legacyAssembly': contractInput['assembly'],                                                                 // 68
        'bytecode': {                                                                                                // 69
          'object': contractInput['bytecode'],                                                                       // 70
          'opcodes': contractInput['opcodes'],                                                                       // 71
          'sourceMap': contractInput['srcmap']                                                                       // 72
        },                                                                                                           // 69
        'deployedBytecode': {                                                                                        // 74
          'object': contractInput['runtimeBytecode'],                                                                // 75
          'sourceMap': contractInput['srcmapRuntime']                                                                // 76
        },                                                                                                           // 74
        'methodIdentifiers': contractInput['functionHashes'],                                                        // 78
        'gasEstimates': {                                                                                            // 79
          'creation': {                                                                                              // 80
            'codeDepositCost': translateGasEstimates(gasEstimates['creation'][1]),                                   // 81
            'executionCost': translateGasEstimates(gasEstimates['creation'][0])                                      // 82
          },                                                                                                         // 80
          'internal': translateGasEstimates(gasEstimates['internal']),                                               // 84
          'external': translateGasEstimates(gasEstimates['external'])                                                // 85
        }                                                                                                            // 79
      }                                                                                                              // 67
    };                                                                                                               // 64
                                                                                                                     //
    if (!ret['contracts'][fileName]) {                                                                               // 90
      ret['contracts'][fileName] = {};                                                                               // 91
    }                                                                                                                // 92
                                                                                                                     //
    ret['contracts'][fileName][contractName] = contractOutput;                                                       // 94
  }                                                                                                                  // 95
                                                                                                                     //
  var sourceMap = {};                                                                                                // 97
                                                                                                                     //
  for (var sourceId in meteorBabelHelpers.sanitizeForInObject(output['sourceList'])) {                               // 98
    sourceMap[output['sourceList'][sourceId]] = sourceId;                                                            // 99
  }                                                                                                                  // 100
                                                                                                                     //
  ret['sources'] = {};                                                                                               // 102
                                                                                                                     //
  for (var source in meteorBabelHelpers.sanitizeForInObject(output['sources'])) {                                    // 103
    ret['sources'][source] = {                                                                                       // 104
      id: sourceMap[source],                                                                                         // 105
      legacyAST: output['sources'][source]                                                                           // 106
    };                                                                                                               // 104
  }                                                                                                                  // 108
                                                                                                                     //
  return ret;                                                                                                        // 110
}                                                                                                                    // 111
                                                                                                                     //
module.exports = {                                                                                                   // 113
  translateJsonCompilerOutput: translateJsonCompilerOutput                                                           // 114
};                                                                                                                   // 113
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"verifyVersion.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/verifyVersion.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
///usr/bin/env node                                                                                                  // 1
var semver = require('semver');                                                                                      // 3
                                                                                                                     //
var packageVersion = require('./package.json').version;                                                              // 5
                                                                                                                     //
var solcVersion = require('./index.js').version();                                                                   // 6
                                                                                                                     //
console.log('solcVersion: ' + solcVersion);                                                                          // 8
console.log('packageVersion: ' + packageVersion);                                                                    // 9
                                                                                                                     //
if (semver.eq(packageVersion, solcVersion)) {                                                                        // 11
  console.log('Version matching');                                                                                   // 12
  process.exit(0);                                                                                                   // 13
} else {                                                                                                             // 14
  console.log('Version mismatch');                                                                                   // 15
  process.exit(1);                                                                                                   // 16
}                                                                                                                    // 17
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wrapper.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/wrapper.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var translate = require('./translate.js');                                                                           // 1
                                                                                                                     //
var requireFromString = require('require-from-string');                                                              // 2
                                                                                                                     //
var https = require('https');                                                                                        // 3
                                                                                                                     //
var MemoryStream = require('memorystream');                                                                          // 4
                                                                                                                     //
function setupMethods(soljson) {                                                                                     // 6
  var compileJSON = soljson.cwrap('compileJSON', 'string', ['string', 'number']);                                    // 7
  var compileJSONMulti = null;                                                                                       // 8
                                                                                                                     //
  if ('_compileJSONMulti' in soljson) {                                                                              // 9
    compileJSONMulti = soljson.cwrap('compileJSONMulti', 'string', ['string', 'number']);                            // 10
  }                                                                                                                  // 11
                                                                                                                     //
  var compileJSONCallback = null;                                                                                    // 12
  var compileStandard = null;                                                                                        // 13
                                                                                                                     //
  if ('_compileJSONCallback' in soljson || '_compileStandard' in soljson) {                                          // 14
    var copyString = function (str, ptr) {                                                                           // 15
      var buffer = soljson._malloc(str.length + 1);                                                                  // 16
                                                                                                                     //
      soljson.writeStringToMemory(str, buffer);                                                                      // 17
      soljson.setValue(ptr, buffer, '*');                                                                            // 18
    };                                                                                                               // 19
                                                                                                                     //
    var wrapCallback = function (callback) {                                                                         // 20
      return function (path, contents, error) {                                                                      // 21
        var result = callback(soljson.Pointer_stringify(path));                                                      // 22
                                                                                                                     //
        if (typeof result.contents === 'string') {                                                                   // 23
          copyString(result.contents, contents);                                                                     // 24
        }                                                                                                            // 25
                                                                                                                     //
        if (typeof result.error === 'string') {                                                                      // 26
          copyString(result.error, error);                                                                           // 27
        }                                                                                                            // 28
      };                                                                                                             // 29
    }; // This calls compile() with args || cb                                                                       // 30
                                                                                                                     //
                                                                                                                     //
    var runWithReadCallback = function (readCallback, compile, args) {                                               // 33
      if (readCallback === undefined) {                                                                              // 34
        readCallback = function (path) {                                                                             // 35
          return {                                                                                                   // 36
            error: 'File import callback not supported'                                                              // 37
          };                                                                                                         // 36
        };                                                                                                           // 39
      }                                                                                                              // 40
                                                                                                                     //
      var cb = soljson.Runtime.addFunction(wrapCallback(readCallback));                                              // 41
      var output;                                                                                                    // 42
                                                                                                                     //
      try {                                                                                                          // 43
        args.push(cb);                                                                                               // 44
        output = compile.apply(undefined, args);                                                                     // 45
      } catch (e) {                                                                                                  // 46
        soljson.Runtime.removeFunction(cb);                                                                          // 47
        throw e;                                                                                                     // 48
      }                                                                                                              // 49
                                                                                                                     //
      soljson.Runtime.removeFunction(cb);                                                                            // 50
      return output;                                                                                                 // 51
    };                                                                                                               // 52
                                                                                                                     //
    var compileInternal = soljson.cwrap('compileJSONCallback', 'string', ['string', 'number', 'number']);            // 54
                                                                                                                     //
    compileJSONCallback = function (input, optimize, readCallback) {                                                 // 55
      return runWithReadCallback(readCallback, compileInternal, [input, optimize]);                                  // 56
    };                                                                                                               // 57
                                                                                                                     //
    if ('_compileStandard' in soljson) {                                                                             // 58
      var compileStandardInternal = soljson.cwrap('compileStandard', 'string', ['string', 'number']);                // 59
                                                                                                                     //
      compileStandard = function (input, readCallback) {                                                             // 60
        return runWithReadCallback(readCallback, compileStandardInternal, [input]);                                  // 61
      };                                                                                                             // 62
    }                                                                                                                // 63
  }                                                                                                                  // 64
                                                                                                                     //
  var compile = function (input, optimise, readCallback) {                                                           // 66
    var result = '';                                                                                                 // 67
                                                                                                                     //
    if (readCallback !== undefined && compileJSONCallback !== null) {                                                // 68
      result = compileJSONCallback(JSON.stringify(input), optimise, readCallback);                                   // 69
    } else if (typeof input !== 'string' && compileJSONMulti !== null) {                                             // 70
      result = compileJSONMulti(JSON.stringify(input), optimise);                                                    // 71
    } else {                                                                                                         // 72
      result = compileJSON(input, optimise);                                                                         // 73
    }                                                                                                                // 74
                                                                                                                     //
    return JSON.parse(result);                                                                                       // 75
  }; // Expects a Standard JSON I/O but supports old compilers                                                       // 76
                                                                                                                     //
                                                                                                                     //
  var compileStandardWrapper = function (input, readCallback) {                                                      // 79
    if (compileStandard !== null) {                                                                                  // 80
      return compileStandard(input, readCallback);                                                                   // 81
    }                                                                                                                // 82
                                                                                                                     //
    function formatFatalError(message) {                                                                             // 84
      return JSON.stringify({                                                                                        // 85
        errors: [{                                                                                                   // 86
          'type': 'SOLCError',                                                                                       // 88
          'component': 'solcjs',                                                                                     // 89
          'severity': 'error',                                                                                       // 90
          'message': message,                                                                                        // 91
          'formattedMessage': 'Error' + message                                                                      // 92
        }]                                                                                                           // 87
      });                                                                                                            // 85
    }                                                                                                                // 96
                                                                                                                     //
    input = JSON.parse(input);                                                                                       // 98
                                                                                                                     //
    if (input['language'] !== 'Solidity') {                                                                          // 100
      return formatFatalError('Only Solidity sources are supported');                                                // 101
    }                                                                                                                // 102
                                                                                                                     //
    if (input['sources'] == null) {                                                                                  // 104
      return formatFatalError('No input specified');                                                                 // 105
    } // Bail out early                                                                                              // 106
                                                                                                                     //
                                                                                                                     //
    if (input['sources'].length > 1 && compileJSONMulti === null) {                                                  // 109
      return formatFatalError('Multiple sources provided, but compiler only supports single input');                 // 110
    }                                                                                                                // 111
                                                                                                                     //
    function isOptimizerEnabled(input) {                                                                             // 113
      return input['settings'] && input['settings']['optimizer'] && input['settings']['optimizer']['enabled'];       // 114
    }                                                                                                                // 115
                                                                                                                     //
    function translateSources(input) {                                                                               // 117
      var sources = {};                                                                                              // 118
                                                                                                                     //
      for (var source in meteorBabelHelpers.sanitizeForInObject(input['sources'])) {                                 // 119
        if (input['sources'][source]['content'] !== null) {                                                          // 120
          sources[source] = input['sources'][source]['content'];                                                     // 121
        } else {                                                                                                     // 122
          // force failure                                                                                           // 123
          return null;                                                                                               // 124
        }                                                                                                            // 125
      }                                                                                                              // 126
                                                                                                                     //
      return sources;                                                                                                // 127
    }                                                                                                                // 128
                                                                                                                     //
    function translateOutput(output) {                                                                               // 130
      output = translate.translateJsonCompilerOutput(JSON.parse(output));                                            // 131
                                                                                                                     //
      if (output == null) {                                                                                          // 132
        return formatFatalError('Failed to process output');                                                         // 133
      }                                                                                                              // 134
                                                                                                                     //
      return JSON.stringify(output);                                                                                 // 135
    }                                                                                                                // 136
                                                                                                                     //
    var sources = translateSources(input);                                                                           // 138
                                                                                                                     //
    if (sources === null) {                                                                                          // 139
      return formatFatalError('Failed to process sources');                                                          // 140
    } // Try to wrap around old versions                                                                             // 141
                                                                                                                     //
                                                                                                                     //
    if (compileJSONCallback !== null) {                                                                              // 144
      return translateOutput(compileJSONCallback(JSON.stringify({                                                    // 145
        'sources': sources                                                                                           // 145
      }), isOptimizerEnabled(input), readCallback));                                                                 // 145
    }                                                                                                                // 146
                                                                                                                     //
    if (compileJSONMulti !== null) {                                                                                 // 148
      return translateOutput(compileJSONMulti(JSON.stringify({                                                       // 149
        'sources': sources                                                                                           // 149
      }), isOptimizerEnabled(input)));                                                                               // 149
    } // Try our luck with an ancient compiler                                                                       // 150
                                                                                                                     //
                                                                                                                     //
    return translateOutput(compileJSON(sources[0], isOptimizerEnabled(input)));                                      // 153
  };                                                                                                                 // 154
                                                                                                                     //
  var linkBytecode = function (bytecode, libraries) {                                                                // 156
    for (var libraryName in meteorBabelHelpers.sanitizeForInObject(libraries)) {                                     // 157
      // truncate to 37 characters                                                                                   // 158
      var internalName = libraryName.slice(0, 36); // prefix and suffix with __                                      // 159
                                                                                                                     //
      var libLabel = '__' + internalName + Array(37 - internalName.length).join('_') + '__';                         // 161
      var hexAddress = libraries[libraryName];                                                                       // 163
                                                                                                                     //
      if (hexAddress.slice(0, 2) !== '0x' || hexAddress.length > 42) {                                               // 164
        throw new Error('Invalid address specified for ' + libraryName);                                             // 165
      } // remove 0x prefix                                                                                          // 166
                                                                                                                     //
                                                                                                                     //
      hexAddress = hexAddress.slice(2);                                                                              // 168
      hexAddress = Array(40 - hexAddress.length + 1).join('0') + hexAddress;                                         // 169
                                                                                                                     //
      while (bytecode.indexOf(libLabel) >= 0) {                                                                      // 171
        bytecode = bytecode.replace(libLabel, hexAddress);                                                           // 172
      }                                                                                                              // 173
    }                                                                                                                // 174
                                                                                                                     //
    return bytecode;                                                                                                 // 176
  };                                                                                                                 // 177
                                                                                                                     //
  var version = soljson.cwrap('version', 'string', []);                                                              // 179
  return {                                                                                                           // 181
    version: version,                                                                                                // 182
    compile: compile,                                                                                                // 183
    compileStandard: compileStandard,                                                                                // 184
    compileStandardWrapper: compileStandardWrapper,                                                                  // 185
    linkBytecode: linkBytecode,                                                                                      // 186
    supportsMulti: compileJSONMulti !== null,                                                                        // 187
    supportsImportCallback: compileJSONCallback !== null,                                                            // 188
    supportsStandard: compileStandard !== null,                                                                      // 189
    // Use the given version if available.                                                                           // 190
    useVersion: function (versionString) {                                                                           // 191
      return setupMethods(require('./bin/soljson-' + versionString + '.js'));                                        // 192
    },                                                                                                               // 193
    // Loads the compiler of the given version from the github repository                                            // 194
    // instead of from the local filesystem.                                                                         // 195
    loadRemoteVersion: function (versionString, cb) {                                                                // 196
      var mem = new MemoryStream(null, {                                                                             // 197
        readable: false                                                                                              // 197
      });                                                                                                            // 197
      var url = 'https://ethereum.github.io/solc-bin/bin/soljson-' + versionString + '.js';                          // 198
      https.get(url, function (response) {                                                                           // 199
        if (response.statusCode !== 200) {                                                                           // 200
          cb('Error retrieving binary: ' + response.statusMessage);                                                  // 201
        } else {                                                                                                     // 202
          response.pipe(mem);                                                                                        // 203
          response.on('end', function () {                                                                           // 204
            cb(null, setupMethods(requireFromString(mem.toString(), 'soljson-' + versionString + '.js')));           // 205
          });                                                                                                        // 206
        }                                                                                                            // 207
      }).on('error', function (error) {                                                                              // 208
        cb(error);                                                                                                   // 209
      });                                                                                                            // 210
    },                                                                                                               // 211
    // Use this if you want to add wrapper functions around the pure module.                                         // 212
    setupMethods: setupMethods                                                                                       // 213
  };                                                                                                                 // 181
}                                                                                                                    // 215
                                                                                                                     //
module.exports = setupMethods;                                                                                       // 217
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"package.json":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// smart_contracts/solc-js/package.json                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.exports = {
  "name": "solc",
  "version": "0.4.11",
  "description": "Solidity compiler",
  "main": "index.js",
  "bin": {
    "solcjs": "solcjs"
  },
  "scripts": {
    "lint": "semistandard",
    "prepublish": "./downloadCurrentVersion.js && ./verifyVersion.js",
    "test": "tape ./test/index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ethereum/solc-js.git"
  },
  "keywords": [
    "ethereum",
    "solidity",
    "compiler"
  ],
  "files": [
    "abi.js",
    "index.js",
    "solcjs",
    "soljson.js",
    "translate.js",
    "wrapper.js"
  ],
  "author": "chriseth",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/ethereum/solc-js/issues"
  },
  "homepage": "https://github.com/ethereum/solc-js#readme",
  "dependencies": {
    "fs-extra": "^0.30.0",
    "memorystream": "^0.3.1",
    "require-from-string": "^1.1.0",
    "semver": "^5.3.0",
    "yargs": "^4.7.1"
  },
  "devDependencies": {
    "semistandard": "^8.0.0",
    "tape": "^4.5.1",
    "tape-spawn": "^1.4.2"
  },
  "semistandard": {
    "ignore": [
      "soljson.js"
    ]
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/main.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
Meteor.startup(function () {// code to run on server at startup                                                      // 3
});                                                                                                                  // 5
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./smart_contracts/solc-js/test/abi.js");
require("./smart_contracts/solc-js/test/cli.js");
require("./smart_contracts/solc-js/test/determinism.js");
require("./smart_contracts/solc-js/test/index.js");
require("./smart_contracts/solc-js/test/package.js");
require("./smart_contracts/solc-js/abi.js");
require("./smart_contracts/solc-js/downloadCurrentVersion.js");
require("./smart_contracts/solc-js/index.js");
require("./smart_contracts/solc-js/translate.js");
require("./smart_contracts/solc-js/verifyVersion.js");
require("./smart_contracts/solc-js/wrapper.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
