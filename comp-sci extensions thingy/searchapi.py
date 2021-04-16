import http.client

conn = http.client.HTTPSConnection("google-search3.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
    'x-rapidapi-host': "google-search3.p.rapidapi.com"
    }

conn.request("GET", "/api/v1/search/q=oreshura+vrv&num=100", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
