import urllib.request
import json

imdbId = input('give me:')
with urllib.request.urlopen("https://api.watchmode.com/v1/search/?apiKey=wPZNHQmXA8f4mWeIYvIZck2ViFtU0VbAMzDHaCVg&search_field=imdb_id&search_value=tt13851958") as url:
    titleData = json.loads(url.read().decode())
    print(titleData)
results = titleData ['title_results'][0]
id = results["id"]
print(titleData)
with urllib.request.urlopen("https://api.watchmode.com/v1/title/" + str(id) + "/sources/?apiKey=wPZNHQmXA8f4mWeIYvIZck2ViFtU0VbAMzDHaCVg") as url:
    subData = json.loads(url.read().decode())
print(subData)
