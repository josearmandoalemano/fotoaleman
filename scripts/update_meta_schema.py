import os
import json

ARTICLES_DIR = '/home/david/revistanomada/src/content/articles'

def update_meta_files():
    for root, dirs, files in os.walk(ARTICLES_DIR):
        if 'meta.json' in files:
            file_path = os.path.join(root, 'meta.json')
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                modified = False
                if 'facebookUrl' not in data:
                    data['facebookUrl'] = ""
                    modified = True
                if 'instagramUrl' not in data:
                    data['instagramUrl'] = ""
                    modified = True
                if 'locationUrl' not in data:
                    data['locationUrl'] = ""
                    modified = True
                if 'phoneNumber' not in data:
                    data['phoneNumber'] = ""
                    modified = True
                
                if modified:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        json.dump(data, f, indent=4, ensure_ascii=False)
                    print(f"Updated: {file_path}")
                else:
                    print(f"No changes needed: {file_path}")
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    update_meta_files()
