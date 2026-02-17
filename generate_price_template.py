import os
import re

directory = "FotoGraduacionesNew"
files = sorted([f for f in os.listdir(directory) if not f.startswith('.')])

print("| Archivo | Nombre Sugerido | Tipo Sugerido | Precio (MXN) |")
print("|---|---|---|---|")

for f in files:
    name = ""
    type_ = "Individual" # Default
    
    # Try to extract info
    upper_f = f.upper()
    
    if "TRIP" in upper_f:
        type_ = "Tríptico"
    elif "DIP" in upper_f:
        type_ = "Díptico"
    elif "INDIVIDUAL" in upper_f:
        type_ = "Individual"
    elif "GRUPAL" in upper_f:
        type_ = "Grupal"
        
    # Extract name from between underscores or after type
    # e.g. 021-1-DIP.GRUPAL ATENEA_9841.png -> Atenea
    parts = f.replace('.png','').replace('.jpg','').split('_')
    
    # Heuristic for name
    # usually part 0 has the description: 021-1-DIP.GRUPAL ATENEA
    # split by space or hyphens?
    desc_part = parts[0]
    
    # clean up prefix numbers "021-1-"
    # regex to remove leading digits and dashes
    clean_desc = re.sub(r'^\d+[-_]?\d*[-_]?', '', desc_part)
    
    if clean_desc:
        name = clean_desc.replace('.', ' ').strip()
    else:
        name = f # Fallback
        
    print(f"| {f} | {name} | {type_} | |")

