
const NodeHelper = require('node_helper');
const xml2js = require("xml2js");
const request = require("request");

//returns the Irish rail xml data converted to json, copied from python
const build_trains = function(train){
	t = {}
	t['destination'] = train['Destination']
        t['origin'] = train['Origin']
        t['eta'] = train['Exparrival']
        t['due_in'] = train['Duein']
        t['scheduled_arrival'] = train['Scharrival']
        t['location'] = train['Lastlocation']
	t["late"] = train["Late"]
        return t
}

//given the js data, will process to an array of objects
const processTrainObjs = function(data){
	//
	returnArray = [];
	if(data.hasOwnProperty("objStationData")){
		//read the objStationData
		data = data["objStationData"];
		//convert single to array for uniformity
		if(!Array.isArray(data)){
			data = [data];
		}
		//process array
		let train_data = data.map(build_trains);
		return train_data;
	}
	else{
		return [];
//		console.log("no data");
	}
}


const convertxml = function(data){
	let parser = new xml2js.Parser({explicitArray : false});
	let res = "";
	parser.parseString(data, function(err, result) {
		res = result["ArrayOfObjStationData"];
	});
	return res;
}

//returns the Irish rail xml data converted to json
const IrishRailFetcher =  function(url){
        let parser = new xml2js.Parser({explicitArray : false});
        let headers = {
                "User-Agent": "Mozilla/5.0 MagicMirror/" + global.version
        };

        let result;
	//use fetch in future to speed up
//	let fetcher = fetch(url, {headers: headers}
        //let result = processTrainObjs(convertxml(fetcher.text()));
/*      let result  = fetcher.then((response) => response.text())
                        .then((data) => convertxml(data))
                        .then((data) => processTrainObjs(data));
*/
        request({url: url, method: "GET"},function(error, response, body){
                if(!error && response.statusCode == 200){
                        result=processTrainObjs(convertxml(body));
                }
        });
	//doesn't work, need to do asyn version
        return result;

}


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getTrains: function(url) {
	let result;
	let parser = new xml2js.Parser({explicitArray : false});
	let self = this;
        request({url: url, method: "GET"},function(error, response, body){
                if(!error && response.statusCode == 200){
                        result=processTrainObjs(convertxml(body));
                        console.log("in getTrains");
                        self.sendSocketNotification("TRAIN_DATA", result);
                }
        });
    },

    socketNotificationReceived: function(notification, payload) {
	console.log("socket notification received in node_helper");
        if (notification === 'GET_TRAINS') {
            console.log("calling getTrains in node helper");
	   console.log(payload);
	    this.getTrains(payload);
        }
    }
});
