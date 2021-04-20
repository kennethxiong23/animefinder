import http.client

conn = http.client.HTTPSConnection("imdb8.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
    'x-rapidapi-host': "imdb8.p.rapidapi.com"
    }

conn.request("GET", "/auto-complete?q=vivy%20flourites", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
