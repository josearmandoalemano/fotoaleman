#!/usr/bin/env python3
"""
Convert all JPG and PNG images to WebP format
"""
import os
import subprocess
import sys
from pathlib import Path
from datetime import datetime

# Configuration
QUALITY = 85  # WebP quality (0-100)
PROJECT_ROOT = Path(__file__).parent.parent
EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']
LOG_FILE = PROJECT_ROOT / 'scripts' / 'conversion_log.txt'

def find_images(root_path):
    """Find all JPG and PNG images in the project"""
    images = []
    for ext in EXTENSIONS:
        images.extend(root_path.rglob(f'*{ext}'))
    return sorted(images)

def convert_to_webp(image_path, quality=85):
    """Convert an image to WebP format using cwebp"""
    webp_path = image_path.with_suffix('.webp')
    
    # Skip if WebP already exists
    if webp_path.exists():
        return False, "WebP already exists"
    
    try:
        # Run cwebp command
        result = subprocess.run(
            ['cwebp', '-q', str(quality), str(image_path), '-o', str(webp_path)],
            capture_output=True,
            text=True,
            check=True
        )
        return True, "Success"
    except subprocess.CalledProcessError as e:
        return False, f"Error: {e.stderr}"
    except FileNotFoundError:
        return False, "cwebp command not found"

def main():
    """Main conversion function"""
    print("=" * 70)
    print("WebP Image Converter")
    print("=" * 70)
    print(f"Project root: {PROJECT_ROOT}")
    print(f"Quality level: {QUALITY}")
    print()
    
    # Find all images
    images = find_images(PROJECT_ROOT)
    print(f"Found {len(images)} images to convert\n")
    
    if not images:
        print("No images found!")
        return
    
    # Create log file
    log_entries = []
    log_entries.append(f"Conversion started at: {datetime.now()}\n")
    log_entries.append(f"Quality level: {QUALITY}\n")
    log_entries.append("=" * 70 + "\n\n")
    
    # Convert each image
    successful = 0
    skipped = 0
    failed = 0
    
    for i, image_path in enumerate(images, 1):
        rel_path = image_path.relative_to(PROJECT_ROOT)
        print(f"[{i}/{len(images)}] Converting: {rel_path}")
        
        success, message = convert_to_webp(image_path, QUALITY)
        
        if success:
            successful += 1
            status = "✓ SUCCESS"
            print(f"    {status}")
            log_entries.append(f"✓ {rel_path} -> {rel_path.with_suffix('.webp')}\n")
        elif "already exists" in message:
            skipped += 1
            status = "⊘ SKIPPED"
            print(f"    {status} (already exists)")
            log_entries.append(f"⊘ {rel_path} (skipped - already exists)\n")
        else:
            failed += 1
            status = "✗ FAILED"
            print(f"    {status}: {message}")
            log_entries.append(f"✗ {rel_path} - {message}\n")
    
    # Summary
    print("\n" + "=" * 70)
    print("Conversion Summary:")
    print(f"  Total images: {len(images)}")
    print(f"  Successful:   {successful}")
    print(f"  Skipped:      {skipped}")
    print(f"  Failed:       {failed}")
    print("=" * 70)
    
    # Write log
    log_entries.append("\n" + "=" * 70 + "\n")
    log_entries.append(f"Successful: {successful}, Skipped: {skipped}, Failed: {failed}\n")
    log_entries.append(f"Conversion completed at: {datetime.now()}\n")
    
    with open(LOG_FILE, 'w') as f:
        f.writelines(log_entries)
    
    print(f"\nLog saved to: {LOG_FILE}")
    
    if failed > 0:
        print("\n⚠️  Some conversions failed. Check the log for details.")
        sys.exit(1)
    else:
        print("\n✓ All images converted successfully!")
        sys.exit(0)

if __name__ == '__main__':
    main()
