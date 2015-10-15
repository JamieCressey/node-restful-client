[![Build Status](https://img.shields.io/travis/JamieCressey/node-restful-client.svg)](https://travis-ci.org/JamieCressey/node-restful-client)

# Generic RESTful NodeJS client

A generic RESTful NodeJS client for interacting with JSON APIs.

## Usage

To use this client you just need to import ApiClient and initialize it with an API Key, Secret and URL endpoint

    var api = require('restful-client')(apiKey, apiSecret, apiUrl);

Now that you have a RESTful API object you can start sending requests.

## Request Authentication

All requests include the following headers by default:
- 'X-Authentication-Key' - The API Key provided when creating the ApiClient object.
- 'X-Authentication-Nonce' - An incremental number to prevent request replays. By default this is the current epoch time in milliseconds.
- 'X-Authentication-Signature' - A SHA256 HMAC signature of the nonce, signed using the API Secret provided when creating the ApiClient object.

## Making a request

The framework supports GET, PUT, POST and DELETE requests:

    api.get('/books/', {}, function (err, res) {
        console.log(res);
    });
    api.post('/books/', {'title': 'Twilight', 'author': 'Stephenie Meyer' }, function (err, res) {
        console.log(res);
    });
    api.put('/book/Twilight/', {'release_date': '06/09/2006' }, function (err, res) {
        console.log(res);
    });
    api.del('/book/Twilight/', {}, function (err, res) {
        console.log(res);
    });

## Extending the client

The client can be extended to be more application specific, e.g. `api.createBook('Twilight', 'Stephenie Meyer', callback);`:

    var RestfulClient = require('restful-client');

    module.exports = function (apiKey, apiSecret) {
        return new ApiClient(apiKey, apiSecret);
    };

    function ApiClient(apiKey, apiSecret) {
        this.api = new RestfulClient(apiKey, apiSecret, 'http://restful.jamiecressey.com:5000');
    }

    ApiClient.prototype.createBook = function (data, callback) {
        this.api.post('/books/', data, callback);
    }

## Contributing

All contributions are welcome, either for new\improved functionality or in response to any open bugs.
