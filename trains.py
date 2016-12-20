__author__ = 'darrendaly'
import SimpleHTTPServer, SocketServer, json, requests, xmltodict

PORT = 5554

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def build_trains(self, train):
        t = {}
        t['destination'] = train['Destination']
        t['origin'] = train['Origin']
        t['eta'] = train['Exparrival']
        t['due_in'] = train['Duein']
        t['scheduled_arrival'] = train['Scharrival']
        t['location'] = train['Lastlocation']
        return t

    def do_GET(self):
        all_params = self.path.split("?url=")
        url_param = all_params[1]
        resp = requests.get(url_param)
        result = xmltodict.parse(resp.content)
        train_list = []
        if "objStationData" in result['ArrayOfObjStationData'].keys():
            if type(result['ArrayOfObjStationData']['objStationData']) is list:
                for train in result['ArrayOfObjStationData']['objStationData']:
                    train_list.append(self.build_trains(train))
            else:
                train_list.append(self.build_trains(result['ArrayOfObjStationData']['objStationData']))
            train_list = sorted(train_list, key=lambda k: k['scheduled_arrival'])
        data = json.dumps(train_list)
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(data)


Handler = ServerHandler

httpd = SocketServer.TCPServer(("", PORT), Handler, bind_and_activate=False)
httpd.allow_reuse_address = True
httpd.server_bind()
httpd.server_activate()
print "Darren Daly Python http server"
httpd.serve_forever()
