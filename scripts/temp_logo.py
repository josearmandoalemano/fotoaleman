from PIL import Image
import math

def distance(c1, c2):
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(c1, c2)))

def process_logo(input_path, output_path):
    print(f"Processing {input_path}...")
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    # White background
    target_bg = (255, 255, 255) 
    tolerance = 20 

    newData = []
    for item in datas:
        # Check distance from white
        if distance(item[0:3], target_bg) < tolerance:
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            newData.append(item)

    img.putdata(newData)
    
    # Resize for optimization (max height 200px since it's square)
    w, h = img.size
    new_h = 200
    new_w = int(w * (new_h / h))
    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    process_logo("src/assets/logo_experiencia_source.jpg", "src/assets/logo_experiencia.png")
