import urllib.request
import json
import http.client
#test site: https://www.funimation.com/shows/horimiya/

#test = urllib.request.urlopen("https://www.funimation.com/shows/bo/") use this for checking funimation + cruchy roll, if give 404 not aviable sort by first episode
test = urllib.request.urlopen("https://www.google.com/search?q=where+to+watch+golde+time")
subData = json.loads(test.read().decode())
print(subData)
