#!/usr/bin/env python3
"""
Remove original JPG and PNG files after successful WebP conversion
"""
import os
from pathlib import Path

# Configuration
PROJECT_ROOT = Path(__file__).parent.parent
EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']
LOG_FILE = PROJECT_ROOT / 'scripts' / 'cleanup_log.txt'

def find_original_images(root_path):
    """Find all JPG and PNG images that have WebP equivalents"""
    images_to_remove = []
    for ext in EXTENSIONS:
        for img_path in root_path.rglob(f'*{ext}'):
            webp_path = img_path.with_suffix('.webp')
            if webp_path.exists():
                images_to_remove.append(img_path)
    return sorted(images_to_remove)

def main():
    """Main cleanup function"""
    print("=" * 70)
    print("Original Image Cleanup")
    print("=" * 70)
    print(f"Project root: {PROJECT_ROOT}")
    print()
    
    # Find all images with WebP equivalents
    images = find_original_images(PROJECT_ROOT)
    print(f"Found {len(images)} original images to remove\n")
    
    if not images:
        print("No images to remove!")
        return
    
    # Create log
    log_entries = []
    log_entries.append(f"Cleanup log\n")
    log_entries.append("=" * 70 + "\n\n")
    
    # Remove each image
    removed = 0
    for i, image_path in enumerate(images, 1):
        rel_path = image_path.relative_to(PROJECT_ROOT)
        try:
            image_path.unlink()
            removed += 1
            print(f"[{i}/{len(images)}] ✓ Removed: {rel_path}")
            log_entries.append(f"✓ Removed: {rel_path}\n")
        except Exception as e:
            print(f"[{i}/{len(images)}] ✗ Failed to remove: {rel_path} - {e}")
            log_entries.append(f"✗ Failed: {rel_path} - {e}\n")
    
    # Summary
    print("\n" + "=" * 70)
    print("Cleanup Summary:")
    print(f"  Total removed: {removed}/{len(images)}")
    print("=" * 70)
    
    # Write log
    log_entries.append(f"\nTotal removed: {removed}/{len(images)}\n")
    
    with open(LOG_FILE, 'w') as f:
        f.writelines(log_entries)
    
    print(f"\nLog saved to: {LOG_FILE}")
    print("\n✓ Cleanup complete!")

if __name__ == '__main__':
    main()
