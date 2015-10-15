var apiKey = "#your_api_key";
var apiSecret = "#your_api_secret";
var apiUrl = "http://restful.jamiecressey.com:5000";

var api = require('../index')(apiKey, apiSecret, apiUrl);

var test_obj = {}

/*
 * Nodeunit swallows uncaught exceptions--get them back!
 */
process.on('uncaughtException', function(err) {
    console.error(err.stack);
});

/*
 *  Register New User Tests
 */

//Create book
exports['Create new book'] = function (test) {
    title = Math.floor(new Date() / 1000);
    author = 'Testing';
    api.post('/books/', {'title': title, 'author': author }, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test_obj.title = res.title; // Save title for future tests
        test.done();
    });
};

//Get book
exports['Get newly created book'] = function (test) {
    api.get('/book/' + test_obj.title + '/', {}, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.done();
    });
};

//Update book
exports['Update newly created book'] = function (test) {
    date = '01/01/2001';
    api.put('/book/' + test_obj.title + '/', {'release_date': date }, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.done();
    });
};

//Get books
exports['Get all books'] = function (test) {
    api.get('/books/', { }, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.done();
    });
};

//Delete book
exports['Delete newly created book'] = function (test) {
    date = '01/01/2001';
    api.del('/book/' + test_obj.title + '/', {}, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.done();
    });
};
