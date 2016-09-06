/* Module */

/* Magic Mirror
 * Module: DWD-RealtimeIrishRail
 *
 * By Darren Daly archerydwd@gmail.com
 * v1.0 06/09/2016
 * MIT Licensed.
 */

Module.register("DWD-RealtimeIrishRail",{

	// Default module config.
	defaults: {
		updateInterval: 60000, // every 10 seconds
		initialLoadDelay: 2500, // 2.5 seconds delay
		retryDelay: 2500, // retry delay
		animationSpeed: 2500, // animation speed
		httpRequestURL: "http://wwww.localhost:5554/",
        TrainUrl: "http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=crlow&NumMins=90"
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);
		this.updateTimer = null;
		this.nodes = [];
		this.failureFlag = "";
		this.status = "";
		this.requestComplete;

		// Schedule update timer.
		var self = this;
		setInterval(function() {
			self.updateDom(self.config.animationSpeed);
		}, this.config.updateInterval);
		self.updateRequest();
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		var childNodes = document.createElement("div");

		var span = document.createElement("span");
		span.innerHTML = "&nbsp;";

        if(this.config.TrainUrl === null || this.config.TrainUrl === ""){
            wrapper.innerHTML = "Please set your request URL target in your config file</br>See ReadMe for more information";
        }

		// Signals an issue with the HTTP Requeset
		else if(this.failureFlag){
			wrapper.innerHTML = "HTTP Request Failed. Status : " + this.status + "</br>Please check the request URL in the module config";
		}

		// Checks for results
		else if(this.nodes == undefined || this.nodes.length === 0){
			if(this.requestComplete){
			wrapper.innerHTML = "No Trains Currently Running";
			}
			else {
				wrapper.innerHTML = "Awaiting Realtime Irish Rail Results..."
			}
		}
		else {
			//Add and display attributes
            var head = document.createElement("header");
            head.innerHTML = "Trains";
            wrapper.appendChild(head);
            var train_table = document.createElement("table");
            wrapper.appendChild(train_table);
            var tt_row = document.createElement("tr");
            train_table.appendChild(tt_row);
            for(var i = 0; i < this.nodes.length; i++){
                var col = document.createElement("td");
                col.className = "bright small";
                var list1 = document.createElement("ul");
                var item1 = document.createElement("li");
                var item2 = document.createElement("li");
                var item3 = document.createElement("li");
                var item4 = document.createElement("li");
                var item5 = document.createElement("li");
                item1.innerHTML = "<a>Origin : " + this.nodes[i]['origin']+"</a>";
                item2.innerHTML = "<a>Destination : " + this.nodes[i]['destination']+"</a>";
                item3.innerHTML = "<a>Location : " + this.nodes[i]['location']+"</a>";
                item4.innerHTML = "<a>ETA : " + this.nodes[i]['eta']+"</a>";
                item5.innerHTML = "<a>Due In : " + this.nodes[i]['due_in']+"</a>";
                list1.appendChild(item1);
                list1.appendChild(item2);
                list1.appendChild(item3);
                list1.appendChild(item4);
                list1.appendChild(item5);
                col.appendChild(list1);
                tt_row.appendChild(col);
            }
		}
		return wrapper;
	},

updateRequest: function() {
	var self = this;
	var retry = true;

	var xhttp = new XMLHttpRequest();
    var completeUrl = this.config.httpRequestURL + "?url=" + this.config.TrainUrl;
	xhttp.open("GET", completeUrl, true);
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				self.requestComplete = true;
				self.processData(JSON.parse(this.responseText));
				self.updateDom(self.config.animationSpeed);
			}
			else {
				self.failureFlag = true;
				self.status = this.status;
				self.updateDom(self.config.animationSpeed);
			}

			if (retry) {
				self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
			}
		}
	};
	xhttp.send();
},

processData: function(data) {
	this.nodes = [];
	var x = data;
		for (i = 0; i < x.length ;i++) {
			var attributes = {};
            for(var key in x[i]){
				attributes[key] = x[i][key];
			}
			this.nodes.push(attributes);
        }
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
},

scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		clearTimeout(this.updateTimer);
		this.updateTimer = setTimeout(function() {
			self.updateRequest();
		}, nextLoad);
	}

});
