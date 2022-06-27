from urllib.request import urlopen
import re
import sys

search_keyword=sys.argv[1]
search_keyword =search_keyword.replace(" ", "")
html = urlopen("https://www.youtube.com/results?search_query=" + search_keyword)
video_ids = re.findall(r"watch\?v=(\S{11})", html.read().decode())
for vid in video_ids:
    video_url="https://www.youtube.com/embed/" + vid
    print(video_url)
