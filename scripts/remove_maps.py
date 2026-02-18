import os
import re

def remove_maps():
    articles_dir = '/home/david/revistanomada/src/content/articles'
    for root, dirs, files in os.walk(articles_dir):
        for file in files:
            if file == 'body.html':
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Remove <div class="location-map">...</div> blocks
                # Using DOTALL to match across multiple lines
                cleaned_content = re.sub(r'<div class="location-map">.*?</div>', '', content, flags=re.DOTALL)
                
                # Also remove any lone iframes containing google maps just in case
                cleaned_content = re.sub(r'<iframe[^>]*google\.com/maps.*?</iframe>', '', cleaned_content, flags=re.DOTALL)
                
                # Remove the headings that usually precede maps if they are left alone
                cleaned_content = re.sub(r'<h4>📍 Encuentra.*?</h4>', '', cleaned_content, flags=re.DOTALL)

                if cleaned_content != content:
                    print(f"Cleaning {path}")
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(cleaned_content)

if __name__ == "__main__":
    remove_maps()
