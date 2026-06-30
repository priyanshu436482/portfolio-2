import re
import os

def process_file(filepath, imports_prefix):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all '/tech-logos/filename.svg'
    matches = re.findall(r"'/tech-logos/([a-zA-Z0-9_-]+)\.svg'", content)
    unique_matches = sorted(list(set(matches)))
    
    if not unique_matches:
        return
        
    imports_str = ""
    for m in unique_matches:
        var_name = m.replace('-', '_') + '_logo'
        imports_str += f"import {var_name} from '{imports_prefix}{m}.svg';\n"
        
    # Add imports to top
    if 'import' in content:
        # insert after first block of imports
        parts = content.split('\n\n', 1)
        if len(parts) == 2 and 'import' in parts[0]:
            content = parts[0] + '\n' + imports_str + '\n' + parts[1]
        else:
            content = imports_str + '\n' + content
    else:
        content = imports_str + '\n' + content
        
    # Replace strings with variables
    for m in unique_matches:
        var_name = m.replace('-', '_') + '_logo'
        content = content.replace(f"'/tech-logos/{m}.svg'", var_name)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file(r'c:\Users\patel\OneDrive\Desktop\Nexuron\portfolio - Copy\src\data\projectsData.js', '../assets/logo/')
process_file(r'c:\Users\patel\OneDrive\Desktop\Nexuron\portfolio - Copy\src\components\About.jsx', '../assets/logo/')
print("Done")
