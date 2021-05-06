'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var pass = require('../config');

var url = 'mongodb+srv://tobiasafischer:' + pass + '@cluster0.w6ewd.mongodb.net/reviewDB?retryWrites=true&w=majority';

var listDatabases = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client) {
    var databasesList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.db().admin().listDatabases();

          case 2:
            databasesList = _context.sent;

            console.log('Databases:');
            databasesList.databases.forEach(function (db) {
              return console.log(' - ' + db.name);
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function listDatabases(_x) {
    return _ref.apply(this, arguments);
  };
}();

var main = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var client;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            client = new MongoClient(url);
            _context2.prev = 1;
            _context2.next = 4;
            return client.connect();

          case 4:
            _context2.next = 6;
            return listDatabases(client);

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](1);

            console.error(_context2.t0);

          case 11:
            _context2.prev = 11;
            _context2.next = 14;
            return client.close();

          case 14:
            return _context2.finish(11);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 8, 11, 15]]);
  }));

  return function main() {
    return _ref2.apply(this, arguments);
  };
}();

main();