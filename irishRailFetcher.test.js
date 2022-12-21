const IrishRailFetcher = require('./irishRailFetcher')


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

let json_data = {
  '$': {
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
    xmlns: 'http://api.irishrail.ie/realtime/'
  },
  objStationData: [
    {
      Servertime: '2022-05-19T13:14:14.757',
      Traincode: 'A511 ',
      Stationfullname: 'Carlow',
      Stationcode: 'CRLOW',
      Querytime: '13:14:14',
      Traindate: '19 May 2022',
      Origin: 'Waterford',
      Destination: 'Dublin Heuston',
      Origintime: '13:05',
      Destinationtime: '15:21',
      Status: 'No Information',
      Lastlocation: '',
      Duein: '60',
      Late: '0',
      Exparrival: '14:12',
      Expdepart: '14:14',
      Scharrival: '14:12',
      Schdepart: '14:14',
      Direction: 'To Dublin Heuston',
      Traintype: 'Train',
      Locationtype: 'S'
    },
    {
      Servertime: '2022-05-19T13:14:14.757',
      Traincode: 'A506 ',
      Stationfullname: 'Carlow',
      Stationcode: 'CRLOW',
      Querytime: '13:14:14',
      Traindate: '19 May 2022',
      Origin: 'Dublin Heuston',
      Destination: 'Waterford',
      Origintime: '13:15',
      Destinationtime: '15:30',
      Status: 'En Route',
      Lastlocation: 'Arrived Inchicore Advance Starter',
      Duein: '51',
      Late: '-9',
      Exparrival: '14:00',
      Expdepart: '14:05',
      Scharrival: '14:09',
      Schdepart: '14:14',
      Direction: 'To Waterford',
      Traintype: 'Train',
      Locationtype: 'S'
    }
  ]
}

let train_data = [
  {
    destination: 'Dublin Heuston',
    origin: 'Waterford',
    eta: '14:12',
    due_in: '60',
    scheduled_arrival: '14:12',
    location: ''
  },
  {
    destination: 'Waterford',
    origin: 'Dublin Heuston',
    eta: '14:00',
    due_in: '51',
    scheduled_arrival: '14:09',
    location: 'Arrived Inchicore Advance Starter'
  }
]

test("checks that xml can be parsed to json", ()=>{
	expect(IrishRailFetcher.convertxml(xml_string)).toStrictEqual(json_data);
});


test("checks that json can be parsed to MM compatible format", ()=>{
        expect(IrishRailFetcher.processTrainObjs(IrishRailFetcher.convertxml(xml_string))).toStrictEqual(train_data);
});

