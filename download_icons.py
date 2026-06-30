import re, os, urllib.request

icons_dir = r'c:\Users\patel\OneDrive\Desktop\Nexuron\portfolio - Copy\public\icons'
os.makedirs(icons_dir, exist_ok=True)

files_to_process = [
    r'c:\Users\patel\OneDrive\Desktop\Nexuron\portfolio - Copy\src\data\projectsData.js',
    r'c:\Users\patel\OneDrive\Desktop\Nexuron\portfolio - Copy\src\components\About.jsx'
]

for filepath in files_to_process:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all urls matching https://cdn.jsdelivr.net/...
    urls = set(re.findall(r'https://cdn\.jsdelivr\.net/[^\'"]+\.svg', content))
    
    for url in urls:
        filename = url.split('/')[-1]
        local_path = os.path.join(icons_dir, filename)
        
        if not os.path.exists(local_path):
            try:
                print(f"Downloading {url} to {local_path}")
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req) as response, open(local_path, 'wb') as out_file:
                    out_file.write(response.read())
            except Exception as e:
                print(f"Failed {url}: {e}")
                
        # Replace in content
        content = content.replace(url, f'/icons/{filename}')
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print('Done!')
