import os
import shutil

# 📁 Folder to organize
source_folder = r"C:\Users\Asavari\Downloads"  # Change path as needed

# 🗂️ Define folder categories
file_types = {
    "Images": [".jpg", ".jpeg", ".png", ".gif", ".bmp"],
    "Documents": [".pdf", ".docx", ".txt", ".pptx", ".xls", ".xlsx"],
    "Music": [".mp3", ".wav", ".aac"],
    "Videos": [".mp4", ".mkv", ".avi", ".mov"],
    "Archives": [".zip", ".rar", ".7z"],
    "Programs": [".exe", ".msi", ".bat"],
    "Others": []
}

# 🚀 Organize files
for file in os.listdir(source_folder):
    file_path = os.path.join(source_folder, file)
    if os.path.isfile(file_path):
        moved = False
        for folder, extensions in file_types.items():
            if any(file.lower().endswith(ext) for ext in extensions):
                folder_path = os.path.join(source_folder, folder)
                os.makedirs(folder_path, exist_ok=True)
                shutil.move(file_path, folder_path)
                print(f"Moved: {file} → {folder}")
                moved = True
                break
        if not moved:
            folder_path = os.path.join(source_folder, "Others")
            os.makedirs(folder_path, exist_ok=True)
            shutil.move(file_path, folder_path)
            print(f"Moved: {file} → Others")

print("\n✅ File organization complete!")
