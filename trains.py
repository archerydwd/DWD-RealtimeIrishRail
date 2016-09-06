__author__ = 'darrendaly'
import SimpleHTTPServer, SocketServer, json, requests
from bs4 import BeautifulSoup

PORT = 5554

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def is_json(myjson):
        try:
            json_object = json.loads(myjson)
        except ValueError, e:
            return False
        return True

    def do_GET(self):
        all_params = self.path.split("?url=")
        url_param = all_params[1]
        resp = requests.get(url_param)
        soup = BeautifulSoup(resp.content, 'lxml-xml')
        trains = soup.find_all("objStationData")
        train_list = []
        for train in trains:
            t = {}
            t['destination'] = train.Destination.text
            t['origin'] = train.Origin.text
            t['eta'] = train.Exparrival.text
            t['due_in'] = train.Duein.text
            t['location'] = train.Lastlocation.text
            train_list.append(t)

        data = json.dumps(train_list)

        self.send_response(200)
        self.send_header('Content-type','application/json')
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
