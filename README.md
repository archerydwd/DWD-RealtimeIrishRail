# DWD-RealtimeIrishRail
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It is specifically for Irish rail customers, It accesses the Realtime Irish Rail API via a Python SimpleHTTPServer, which makes the request, then parses the response and returns json formatted data to the module for use in the MagicMirror.

This is version 1.0 and therefore not at a stage for widespread use.

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/archerydwd/DWD-RealtimeIrishRail.git`. A new folder will appear.
2. Change directory into the new folder: cd DWD-RealtimeIrishRail/
3. Install python
    brew install python
    or
    yum install python
4. Install pip
    easy_install install pip
5. Install requests:
    pip install requests
6. Install beautiful soup 4
    pip install beautifulsoup4
7. Run the SimpleHTTPServer
    python trains.py
2. Add DWD-RealtimeIrishRail to the modules array in the `config/config.js` (see next step below)

## Using the module

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
			<td><code>TrainUrl</code></td>
			<td>The api request url for the specific train station that you want to target. API URLs can be found here: http://api.irishrail.ie/realtime/realtime.asmx<br>
				<br><b>Possible values:</b> <code>url</code>
				<br><b>Default value:</b> <code>"http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=crlow&NumMins=90"</code>
			</td>
		</tr>
	</tbody>
</table>

## Dependencies
- Python 2.7
- SimpleHTTPServer named trains.py

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
