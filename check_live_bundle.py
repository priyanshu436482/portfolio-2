import urllib.request, re

try:
    req = urllib.request.Request('https://umesh-patel-tech-portfolio.vercel.app/', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
    js_files = re.findall(r'src="(.*?\.js)"', html)
    if not js_files:
        print("No JS files found in HTML!")
        
    for js_file in js_files:
        js_url = 'https://umesh-patel-tech-portfolio.vercel.app' + js_file
        print(f"Checking {js_url}")
        req = urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as js_res:
            js_content = js_res.read().decode('utf-8')
            if 'jsdelivr' in js_content:
                print('Found jsdelivr in ' + js_file)
            if '/icons/react-original.svg' in js_content:
                print('Found /icons/ in ' + js_file)
except Exception as e:
    print(e)
