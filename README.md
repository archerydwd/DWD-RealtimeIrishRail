# DWD-RealtimeIrishRail
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It is specifically for Irish rail customers, It accesses the Realtime Irish Rail API via the node_helper.js module, which makes the request, then parses the response and returns json formatted data to the module for use in the MagicMirror. Some ad-hoc test have been written but the module neeeds refactoring to thoroughly test the functionality.

This is version 2.0 and may still be prone to some bugs/failure.

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/archerydwd/DWD-RealtimeIrishRail.git`. A new folder will appear.
2. Change directory into the new folder: cd DWD-RealtimeIrishRail/
3. Run npm install
4. Add DWD-RealtimeIrishRail to the modules array in the `config/config.js` (see next step below)

## Running tests
1. Navigate into your MagicMirror's `modules/DWD-RealtimeIrishRail` folder
2. Run npm test

## Use in MagicMirror
To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'DWD-RealtimeIrishRail',
		position: 'bottom_bar',	// This can be any of the regions. Best results in bottom_bar or top_bar (if clear of other modules) regions.
		header: 'DWD-RealtimeIrishRail', // This is optional
		config: {
			// See 'Configuration options' for more information.
		}
	}
]
````

## Configuration options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>updateInterval</code></td>
			<td>The rate (in ms) in which the module will refresh the train data.<br>
				<br><b>Possible values:</b> <code>int</code>
				<br><b>Default value:</b> <code>60000</code>
			</td>
		</tr>
				<tr>
					<td>
						<code>httpRequestURL</code>
					</td>
					<td>
						http://127.0.0.1:5554/ (this is the url for the python trains server we just started above)
					</td>
				</tr>
        <tr>
			<td><code>TrainUrl</code></td>
			<td>The api request url for the specific train station that you want to target. API URLs can be found here: http://api.irishrail.ie/realtime/realtime.asmx<br>
				<br><b>Possible values:</b> <code><ul>
                                                    <li>Dublin Heuston: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=HSTON&NumMins=60</li>
                                                    <li>Dublin Connolly: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CNLLY&NumMins=60</li>
                                                    <li>Park West and Cherry Orchard: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CHORC&NumMins=60</li>
                                                    <li>Clondalkin Fonthill: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CLDKN&NumMins=60</li>
                                                    <li>Adamstown: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ADMTN&NumMins=60</li>
                                                    <li>Hazelhatch and Celbridge: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=HZLCH&NumMins=60</li>
                                                    <li>Sallins and Naas: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=SALNS&NumMins=60</li>
                                                    <li>Newbridge: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=NBRGE&NumMins=60</li>
                                                    <li>Kildare: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=KDARE&NumMins=60</li>
                                                    <li>Athy: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ATHY&NumMins=90</li>
                                                    <li>Carlow: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=crlow&NumMins=90</li>				
                                                    <li>Muine Bheag: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MNEBG&NumMins=90</li>
                                                    <li>Kilkenny: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=KKNNY&NumMins=90</li>
                                                    <li>Thomastown: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=THTWN&NumMins=90</li>
                                                    <li>Waterford: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=WFORD&NumMins=90</li>
                                                    <li>Monasterevin: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MONVN&NumMins=90</li>
                                                    <li>Portarlington: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=PTRTN&NumMins=90</li>
                                                    <li>Portlaoise: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=PTLSE&NumMins=90</li>
                                                    <li>Ballybrophy: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=BBRHY&NumMins=90</li>
                                                    <li>Templemore: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=TPMOR&NumMins=90</li>
                                                    <li>Thurles: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=THRLS&NumMins=90</li>
                                                    <li>Limerick Junction: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=LMRKJ&NumMins=90</li>
                                                    <li>Tipperary: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=TIPRY&NumMins=90</li>
                                                    <li>Cahir: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CAHIR&NumMins=90</li>
                                                    <li>Clonmel: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CLMEL&NumMins=90</li>
                                                    <li>Carrick-on-Suir: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CKOSR&NumMins=90</li>
                                                    <li>Charleville: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CVILL&NumMins=90</li>
                                                    <li>Mallow: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MLLOW&NumMins=90</li>
                                                    <li>Cork: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CORK&NumMins=90</li>
                                                    <li>Little Island: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=LSLND&NumMins=90</li>
                                                    <li>Glounthaune: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=GHANE&NumMins=90</li>
                                                    <li>Midleton: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MDLTN&NumMins=90</li>
                                                    <li>Fota: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=FOTA&NumMins=90</li>
                                                    <li>Carrigaloe: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CGLOE&NumMins=90</li>
                                                    <li>Rushbrooke: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=RBROK&NumMins=90</li>
                                                    <li>Cobh: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=COBH&NumMins=90</li>
                                                    <li>Banteer: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=BTEER&NumMins=90</li>
                                                    <li>Millstreet: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MLSRT&NumMins=90</li>
                                                    <li>Rathmore: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=RMORE&NumMins=90</li>
                                                    <li>Killarney: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=KLRNY&NumMins=90</li>
                                                    <li>Farranfore: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=FFORE&NumMins=90</li>
                                                    <li>Tralee: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=TRLEE&NumMins=90</li>
                                                    <li>Limerick (Colbert): http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=LMRCK&NumMins=90</li>
                                                    <li>Ennis: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ENNIS&NumMins=90</li>
                                                    <li>Gort: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=GORT&NumMins=90</li>
                                                    <li>Athenry: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ATHRY&NumMins=90</li>
                                                    <li>Oranmore: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ORNMR&NumMins=90</li>
                                                    <li>Galway: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=GALWY&NumMins=90</li>
                                                    <li>Roscrea: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=RCREA&NumMins=90</li>
                                                    <li>Cloughjordan: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CJRDN&NumMins=90</li>
                                                    <li>Nenagh: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=NNAGH&NumMins=90</li>
                                                    <li>Birdhill: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=BHILL&NumMins=90</li>
                                                    <li>Tullamore: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=TMORE&NumMins=90</li>
                                                    <li>Clara: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CLARA&NumMins=90</li>
                                                    <li>Athlone: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ATLNE&NumMins=90</li>
                                                    <li>Ballinasloe: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=BSLOE&NumMins=90</li>
                                                    <li>Woodlawn: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=WLAWN&NumMins=90</li>
                                                    <li>Attymon: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ATMON&NumMins=90</li>
                                                    <li>Roscommon: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=RSCMN&NumMins=90</li>
                                                    <li>Castlerea: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CSREA&NumMins=90</li>
                                                    <li>Ballyhaunis: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=BYHNS&NumMins=90</li>
                                                    <li>Claremorris: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CLMRS&NumMins=90</li>
                                                    <li>Manulla Junction: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MNLAJ&NumMins=90</li>
                                                    <li>Castlebar: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CLBAR&NumMins=90</li>
                                                    <li>Westport: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=WPORT&NumMins=90</li>
                                                    <li>Foxford: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=FXFRD&NumMins=90</li>
                                                    <li>Ballina: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=BALNA&NumMins=90</li>
                                                    <li>Rosslare Europort: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=RLEPT&NumMins=90</li>
                                                    <li>Rosslare Strand: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=RLSTD&NumMins=90</li>
                                                    <li>Wexford: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=WXFRD&NumMins=90</li>
                                                    <li>Enniscorthy: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ECRTY&NumMins=90</li>
                                                    <li>Gorey: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=GOREY&NumMins=90</li>
                                                    <li>Arklow: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ARKLW&NumMins=90</li>
                                                    <li>Rathdrum: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=RDRUM&NumMins=90</li>
                                                    <li>Wicklow: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=WLOW&NumMins=90</li>
                                                    <li>Kilcoole: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=KCOOL&NumMins=90</li>
                                                    <li>Greystones: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=GSTNS&NumMins=90</li>
                                                    <li>Bray: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=BRAY&NumMins=90</li>
                                                    <li>Shankill: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=SKILL&NumMins=90</li>
                                                    <li>Killiney: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=KILNY&NumMins=90</li>
                                                    <li>Dalkey: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=DLKEY&NumMins=90</li>
                                                    <li>Glenageary: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=GLGRY&NumMins=90</li>
                                                    <li>Sandycove: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=SCOVE&NumMins=90</li>
                                                    <li>Dun Laoghaire: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=DLERY&NumMins=90</li>
                                                    <li>Salthill: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=SHILL&NumMins=90</li>
                                                    <li>Dublin Pearse: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=PERSE&NumMins=90</li>
                                                    <li>Tara Street: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=TARA&NumMins=90</li>
                                                    <li>Docklands: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=DCKLS&NumMins=90</li>
                                                    <li>Drumcondra: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=DCDRA&NumMins=90</li>
                                                    <li>Broombridge: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=BBRDG&NumMins=90</li>
                                                    <li>Ashtown: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ASHTN&NumMins=90</li>
                                                    <li>Navan Road Parkway: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=PHNPK&NumMins=90</li>
                                                    <li>Castleknock: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CNOCK&NumMins=90</li>
                                                    <li>Coolmine: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CMINE&NumMins=90</li>
                                                    <li>Clonsilla: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CLSLA&NumMins=90</li>
                                                    <li>Leixlip (Confey): http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=LXCON&NumMins=90</li>
                                                    <li>Leixlip (Louisa Bridge): http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=LXLSA&NumMins=90</li>
                                                    <li>Maynooth: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MYNTH&NumMins=90</li>
                                                    <li>Kilcock: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=KCOCK&NumMins=90</li>
                                                    <li>Enfield: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ENFLD&NumMins=90</li>
                                                    <li>Mullingar: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MLGAR&NumMins=90</li>
                                                    <li>Edgeworthstown: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ETOWN&NumMins=90</li>
                                                    <li>Longford: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=LFORD&NumMins=90</li>
                                                    <li>Dromod: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=DRMOD&NumMins=90</li>
                                                    <li>Carrick on Shannon: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CKOSH&NumMins=90</li>
                                                    <li>Boyle: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=BOYLE&NumMins=90</li>
                                                    <li>Ballymote: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=BMOTE&NumMins=90</li>
                                                    <li>Collooney: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=COLNY&NumMins=90</li>
                                                    <li>Sligo: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=SLIGO&NumMins=90</li>
                                                    <li>Hansfield: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=HAFLD&NumMins=90</li>
                                                    <li>Dunboyne: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=DBYNE&NumMins=90</li>
                                                    <li>M3 Parkway: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=M3WAY&NumMins=90</li>
                                                    <li>Clontarf Road: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=CTARF&NumMins=90</li>
                                                    <li>Drogheda: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=DGHDA&NumMins=90</li>
                                                    <li>Dundalk: http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=DDALK&NumMins=90</li>                                                        				
				                                  </ul>
				                            </code>
				<br><b>Default value:</b> <code>"http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=crlow&NumMins=90"</code>
			</td>
		</tr>
	</tbody>
</table>


The MIT License (MIT)
=====================

Copyright © 2016 Darren Daly

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
