var request = require('request');
var querystring = require("querystring");
var crypto = require('crypto');
var VERSION = "0.9.0"

module.exports = function (apiKey, apiSecret, apiUrl) {
    return new RestfulClient(apiKey, apiSecret, apiUrl);
};

function RestfulClient(apiKey, apiSecret, apiUrl) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.apiURL = apiUrl;
}

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}

RestfulClient.prototype.get = function (path, data, callback) {
    this._request("get", path, data, callback);
};

RestfulClient.prototype.post = function (path, data, callback) {
    this._request("post", path, data, callback);
};

RestfulClient.prototype.put = function (path, data, callback) {
    this._request("put", path, data, callback);
};

RestfulClient.prototype.del = function (path, data, callback) {
    this._request("del", path, data, callback);
};

RestfulClient.prototype._request = function(type, path, params, callback, qs) {
    qs = qs || {}

    ms = String(new Date().getTime());

    user_agent = "NodeClient/"+VERSION+" (node "+process.version+")"
    headers = {
        "User-Agent": user_agent,
        "X-Authentication-Key": this.apiKey, 
        "X-Authentication-Nonce": ms, 
        "X-Authentication-Signature": crypto.createHmac('SHA256', this.apiSecret).update(ms).digest('base64')
    }

    options = {
        url: this.apiURL + path,
        form: params,
        headers: headers,
        qs: qs,
        json: true,
        jar: false,
        strictSSL: true
    }

    var callback_check = function (err, res, body) {
        if (!err) {
            if(String(res.statusCode).startsWith('20')) {
            //if(res.statusCode === 200) {
                callback(null, body);
            } else {
                callback(body);
            }
        } else {
            callback(err);
        }
    };

    switch(type) {

        case "post":
            request.post(options, callback_check);
            break;

        case "get":
            request.get(options, callback_check);
            break;

        case "put":
            request.put(options, callback_check);
            break;

        case "del":
            request.del(options, callback_check);
            break;
    }
};
