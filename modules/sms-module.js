module.exports = {};

module.exports.addSms = function (messages, res, db) {
    var hadError = false;

    var latestTime = -1;
    var ctr = 0;
    var total = messages.total;
    var messageList = messages.items;
    for (var i = 0; i < total; i = i + 1) {
        if (messageList[i].datetime > latestTime) {
            latestTime = messageList[i].datetime;
        }

        db.collection('messages').save(messageList[i], function(err, result) {
            ctr = ctr + 1;
            if (err) {
                hadError = true;
                if (ctr == total) {
                    sendResponse(hadError, latestTime, res);
                }
                return console.log(err);
            }
            if (ctr == total) {
                sendResponse(hadError, latestTime, res);
            }
        });
    }
}

function sendResponse(hadError, latestTime, res) {
    if (hadError) {
        var errObj = {
            "status" : 1,
            "err_message" : "Failed to add some messages to database"
        };
        res.send(errObj);
    } else {
        var succObj = {
            "status" : 0,
            "success_data" : {
                "latest_time" : latestTime
            }
        }
        res.send(succObj);
    }
}
