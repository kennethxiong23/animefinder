import urllib.request
import json

imdbId = input('give me:')
with urllib.request.urlopen("https://api.watchmode.com/v1/sources/?apiKey=wPZNHQmXA8f4mWeIYvIZck2ViFtU0VbAMzDHaCVg&search_field=imdb_id&search_value=tt13103134") as url:
    titleData = json.loads(url.read().decode())
    print(titleData)