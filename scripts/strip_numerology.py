import os
import re

articles_dir = '/home/david/revistanomada/src/content/articles'

# Regex to find <span class="highlight">01</span> (and variants)
# Matches <span class="highlight"> followed by digits, optional whitespace, and </span>
# Captures the trailing space if present to avoid double spaces.
regex_pattern = re.compile(r'<span class="highlight">\s*\d+\s*</span>\s*')

count = 0

for root, dirs, files in os.walk(articles_dir):
    for file in files:
        if file == 'body.html':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content, n = regex_pattern.subn('', content)
            
            if n > 0:
                print(f"Modified {filepath}: removed {n} instances")
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1

print(f"Total files modified: {count}")
