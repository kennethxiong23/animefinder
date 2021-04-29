from jikanpy import Jikan
jikan = Jikan()

mushishi = jikan.anime(457)
#print(mushishi)
mushishi_with_eps = jikan.anime(457, extension='episodes')

search_result = jikan.search('anime', 'Mushishi', page=2)
dict = jikan.anime(14719)
hash = dict['title']
#print(hash)

test = jikan.search('anime', 'vivy', )
x = test['results']
titles = []
for i in  x:
    title = i['title']
    titles.append(title)
print(titles)


winter_2018_anime = jikan.season(year=2018, season='winter')

archive = jikan.season_archive()
