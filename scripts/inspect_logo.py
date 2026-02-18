from PIL import Image
import sys

def inspect_corners(path):
    try:
        img = Image.open(path)
        print(f"Format: {img.format}, Mode: {img.mode}, Size: {img.size}")
        rgb_img = img.convert("RGB")
        corners = [
            rgb_img.getpixel((0, 0)),
            rgb_img.getpixel((img.width-1, 0)),
            rgb_img.getpixel((0, img.height-1)),
            rgb_img.getpixel((img.width-1, img.height-1))
        ]
        print(f"Corner pixels (TL, TR, BL, BR): {corners}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect_corners("/home/david/revistanomada/src/assets/new_logo_source.jpg")
