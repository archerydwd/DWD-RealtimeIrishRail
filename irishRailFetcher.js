
//const fetch = require("node-fetch");
const fetch = require('cross-fetch');
const xml_converter = require("xml-js");
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
//              console.log("no data");
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
//      let fetcher = fetch(url, {headers: headers}
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


/*
let res = IrishRailFetcher("http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=HSTON&NumMins=90", console.log);

let xml_string = `<?xml version="1.0" encoding="utf-8"?>
<ArrayOfObjStationData xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://api.irishrail.ie/realtime/">
  <objStationData>
    <Servertime>2022-05-19T13:14:14.757</Servertime>
    <Traincode>A511 </Traincode>
    <Stationfullname>Carlow</Stationfullname>
    <Stationcode>CRLOW</Stationcode>
    <Querytime>13:14:14</Querytime>
    <Traindate>19 May 2022</Traindate>
    <Origin>Waterford</Origin>
    <Destination>Dublin Heuston</Destination>
    <Origintime>13:05</Origintime>
    <Destinationtime>15:21</Destinationtime>
    <Status>No Information</Status>
    <Lastlocation />
    <Duein>60</Duein>
    <Late>0</Late>
    <Exparrival>14:12</Exparrival>
    <Expdepart>14:14</Expdepart>
    <Scharrival>14:12</Scharrival>
    <Schdepart>14:14</Schdepart>
    <Direction>To Dublin Heuston</Direction>
    <Traintype>Train</Traintype>
    <Locationtype>S</Locationtype>
  </objStationData>
  <objStationData>
    <Servertime>2022-05-19T13:14:14.757</Servertime>
    <Traincode>A506 </Traincode>
    <Stationfullname>Carlow</Stationfullname>
    <Stationcode>CRLOW</Stationcode>
    <Querytime>13:14:14</Querytime>
    <Traindate>19 May 2022</Traindate>
    <Origin>Dublin Heuston</Origin>
    <Destination>Waterford</Destination>
    <Origintime>13:15</Origintime>
    <Destinationtime>15:30</Destinationtime>
    <Status>En Route</Status>
    <Lastlocation>Arrived Inchicore Advance Starter</Lastlocation>
    <Duein>51</Duein>
    <Late>-9</Late>
    <Exparrival>14:00</Exparrival>
    <Expdepart>14:05</Expdepart>
    <Scharrival>14:09</Scharrival>
    <Schdepart>14:14</Schdepart>
    <Direction>To Waterford</Direction>
    <Traintype>Train</Traintype>
    <Locationtype>S</Locationtype>
  </objStationData>
</ArrayOfObjStationData>
`
//console.log(convertxml(xml_string));
*/
module.exports = IrishRailFetcher; 
