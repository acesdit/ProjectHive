**Contributer** "AsavariPawar"
# 🗂️ Automatic File Organizer using Python

A simple and efficient Python project that automatically organizes files in a given folder (like `Downloads`) into categorized subfolders such as **Images**, **Documents**, **Videos**, and more.

---

## 📖 Features
- Automatically sorts files by type (e.g., `.jpg`, `.pdf`, `.mp3`, `.mp4`)
- Creates category folders if not present
- Customizable file type mappings
- Works on Windows, macOS, and Linux
- Lightweight — no external dependencies required

---

## ⚙️ How It Works
1. Set your folder path (e.g., `Downloads`).
2. The script scans all files in that folder.
3. It checks the file extension and moves the file into a matching category folder.
4. Files without a match are placed in the **Others** folder.

---

## 🧠 Algorithm
1. Import `os` and `shutil`
2. Define source folder path  
3. Create dictionary of file extensions and target folders  
4. Loop through each file in folder  
5. Match file type → Move to correct subfolder  
6. Print summary when done

---

## 💻 Code Example
```python
import os, shutil

source_folder = r"C:\Users\Asavari\Downloads"

file_types = {
    "Images": [".jpg", ".jpeg", ".png"],
    "Documents": [".pdf", ".docx", ".txt"],
    "Music": [".mp3", ".wav"],
    "Videos": [".mp4", ".mkv"],
    "Others": []
}

for file in os.listdir(source_folder):
    path = os.path.join(source_folder, file)
    if os.path.isfile(path):
        moved = False
        for folder, ext_list in file_types.items():
            if any(file.lower().endswith(ext) for ext in ext_list):
                folder_path = os.path.join(source_folder, folder)
                os.makedirs(folder_path, exist_ok=True)
                shutil.move(path, folder_path)
                print(f"Moved: {file} → {folder}")
                moved = True
                break
        if not moved:
            folder_path = os.path.join(source_folder, "Others")
            os.makedirs(folder_path, exist_ok=True)
            shutil.move(path, folder_path)
            print(f"Moved: {file} → Others")

print("✅ File organization complete!")
