import http.client

conn = http.client.HTTPSConnection("utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
    'x-rapidapi-host': "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
    }

conn.request("GET", "/idlookup?source_id=tt13851958&source=imdb&country=us", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
