from PIL import Image
import math

def distance(c1, c2):
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(c1, c2)))

def process_logo(input_path, output_path):
    print(f"Processing {input_path}...")
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    # Target background color (from inspection)
    # Using an average of the corners: (3, 27, 50)
    target_bg = (3, 27, 50) 
    tolerance = 40 # Increased tolerance for JPEG artifacts

    newData = []
    for item in datas:
        # Check distance from target background color
        # item[0:3] is RGB
        if distance(item[0:3], target_bg) < tolerance:
            newData.append((0, 0, 0, 0)) # Transparent
        else:
            newData.append(item)

    img.putdata(newData)
    
    # Resize for optimization (max width 400px)
    w, h = img.size
    new_w = 400
    new_h = int(h * (new_w / w))
    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    process_logo("/home/david/revistanomada/src/assets/new_logo_source.jpg", "/home/david/revistanomada/src/assets/nomada_logo_final.png")
