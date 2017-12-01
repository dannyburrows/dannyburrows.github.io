var request = require('request');

var limits = {
    "TP": {
        "min": 0,
        "max": 10000,
    },
    "SR": {
        "min": 100,
        "max": 20,
    },
    "Sand": {
        "min": 0,
        "max": 5,
    },
    "FR": {
        "min": 0,
        "max": 3,
    },
}

var json = {
    "Well": {
        "Id": 20,
        "Name": "Well 2"
    },
    "TotalScore": 30,
    "Instant": {
        "0": {
            "TP": 1000,
            "SR": 67,
            "Sand": 4.5,
            "FR": 1.2,
            "Gel": null,
            "Cross": null,
            "Cost": 8
        },
        "1": {
            "TP": 7500,
            "SR": 42,
            "Sand": 1.5,
            "FR": 2.01,
            "Gel": null,
            "Cross": null,
            "Cost": 13
        },
        "2": {
            "TP": 2500,
            "SR": 45,
            "Sand": 4.5,
            "FR": 1.2,
            "Gel": null,
            "Cross": null,
            "Cost": 10
        },
        "3": {
            "TP": 500,
            "SR": 20,
            "Sand": 0.05,
            "FR": 0.333,
            "Gel": null,
            "Cross": null,
            "Cost": 7
        },
        "4": {
            "TP": 10000,
            "SR": 80,
            "Sand": 5,
            "FR": 3,
            "Gel": null,
            "Cross": null,
            "Cost": 20
        },
        "5": {
            "TP": 2300,
            "SR": 20,
            "Sand": 5,
            "FR": 3,
            "Gel": null,
            "Cross": null,
            "Cost": 4
        }
    },
    "Design": {
        "TP": 6500,
        "SR": 45,
        "Sand": 2.3,
        "FR": 0.8,
        "Gel": null,
        "Cross": null,
        "Cost": 10
    },
    "Bracket": {
        "Pressure": {
            "Previous": {
                "Value": 60,
                "Cost": 8
            },
            "Next": {
                "Value": 80,
                "Cost": 10
            },
            "Current": 64
        },
        "Rate": {
            "Previous": {
                "Value": 30,
                "Cost": 10
            },
            "Next": {
                "Value": 50,
                "Cost": 10
            },
            "Current": 45
        }
    }
}

var processing = 0;
upperBound = 60;

makeRequest(processing);

function makeRequest(i) {
    adjust(json["Instant"]["0"]);
    adjust(json["Instant"]["1"]);
    adjust(json["Instant"]["2"]);
    adjust(json["Instant"]["3"]);
    adjust(json["Instant"]["4"]);
    adjust(json["Instant"]["5"]);
    var tweak = Math.floor(Math.random()*(3));
    if ((json.TotalScore + tweak) > 100) {
        json.TotalSCore - 20;
    } else {
       json.TotalScore += Math.floor(Math.random()*(3));
    }
    json["Bracket"]["Pressure"]["Current"] = 64 + Math.floor(Math.random()*(9));
    json["Bracket"]["Rate"]["Current"] = 45 + Math.floor(Math.random()*(9));

    request({
            url: 'http://stranger-things-eventhubapi-test.azurewebsites.net/api/stream',
            method: 'POST',
            headers: {
            },
            json: true,
            body: json
        }, function(error, resp, body) {
            console.log('--Error--\r\n',error);
            console.log('--Response--\r\n', resp ? resp.statusCode : null);
            console.log(resp && resp.request ? resp.request.body : 'Error');
            console.log('--Body--\r\n', body);
        });
}

function adjust(instance) {
    var factor = 0.4;

    var SRAdjust = (instance.SR * factor);
    if (instance.SR + SRAdjust > limits.SR.max) {
        instance.SR -= SRAdjust;
    } else {
        instance.SR += SRAdjust;
    }

    var sandAdjust = (instance.Sand * factor);
    if (instance.Sand + sandAdjust > limits.Sand.max) {
        instance.Sand -= sandAdjust;
    } else {
        instance.Sand += sandAdjust;
    }

    var TPAdjust = (instance.TP * factor);
    if (instance.TP + TPAdjust > limits.TP.max) {
        instance.TP -= TPAdjust;
    } else {
        instance.TP += TPAdjust;
    }

    var FRAdjust = (instance.FR * factor);
    if (instance.FR + FRAdjust > limits.FR.max) {
        instance.FR -= FRAdjust;
    } else {
        instance.FR += FRAdjust;
    }

    instance.Cost = Math.floor(Math.random()*(20));
}


timeout();

function timeout() {
    setTimeout(function() {
        if (processing < upperBound) {
            makeRequest(processing);
            timeout();
        }
    }, 1000);
}
