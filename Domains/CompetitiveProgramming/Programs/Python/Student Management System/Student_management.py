import csv
import os

FILENAME = "students.csv"

# Ensure file exists with headers
if not os.path.exists(FILENAME):
    with open(FILENAME, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Roll No", "Name", "Age", "Course", "Marks"])


def add_student():
    roll = input("Enter Roll No: ")
    name = input("Enter Name: ")
    age = input("Enter Age: ")
    course = input("Enter Course: ")
    marks = input("Enter Marks: ")

    with open(FILENAME, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([roll, name, age, course, marks])
    print("✅ Student added successfully!\n")


def view_students():
    print("\n--- All Students ---")
    with open(FILENAME, "r") as f:
        reader = csv.reader(f)
        for row in reader:
            print("\t".join(row))
    print()


def search_student():
    roll = input("Enter Roll No to search: ")
    found = False
    with open(FILENAME, "r") as f:
        reader = csv.reader(f)
        for row in reader:
            if row and row[0] == roll:
                print("🎓 Student Found: ", row)
                found = True
                break
    if not found:
        print("❌ Student not found.\n")


def update_student():
    roll = input("Enter Roll No to update: ")
    students = []
    found = False

    with open(FILENAME, "r") as f:
        reader = csv.reader(f)
        for row in reader:
            if row and row[0] == roll:
                print("Existing data:", row)
                name = input("Enter new name: ")
                age = input("Enter new age: ")
                course = input("Enter new course: ")
                marks = input("Enter new marks: ")
                students.append([roll, name, age, course, marks])
                found = True
            else:
                students.append(row)

    if found:
        with open(FILENAME, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerows(students)
        print("✅ Student updated successfully!\n")
    else:
        print("❌ Roll No not found.\n")


def delete_student():
    roll = input("Enter Roll No to delete: ")
    students = []
    found = False

    with open(FILENAME, "r") as f:
        reader = csv.reader(f)
        for row in reader:
            if row and row[0] != roll:
                students.append(row)
            else:
                found = True

    with open(FILENAME, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerows(students)

    if found:
        print("✅ Student deleted successfully!\n")
    else:
        print("❌ Roll No not found.\n")


def main_menu():
    while True:
        print("========== Student Management System ==========")
        print("1. Add Student")
        print("2. View All Students")
        print("3. Search Student")
        print("4. Update Student")
        print("5. Delete Student")
        print("6. Exit")
        print("===============================================")

        choice = input("Enter your choice (1-6): ")

        if choice == "1":
            add_student()
        elif choice == "2":
            view_students()
        elif choice == "3":
            search_student()
        elif choice == "4":
            update_student()
        elif choice == "5":
            delete_student()
        elif choice == "6":
            print("👋 Exiting Student Management System. Goodbye!")
            break
        else:
            print("❌ Invalid choice! Please try again.\n")


if __name__ == "__main__":
    main_menu()
