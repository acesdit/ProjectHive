import time
from datetime import datetime

# Load tasks from file
def load_tasks():
    try:
        with open("tasks.txt", "r") as f:
            tasks = [line.strip().split(" | ") for line in f.readlines()]
        return tasks
    except FileNotFoundError:
        return []

# Save tasks to file
def save_tasks(tasks):
    with open("tasks.txt", "w") as f:
        for task, t in tasks:
            f.write(f"{task} | {t}\n")

# Add a new task
def add_task():
    task = input("Enter task: ")
    time_str = input("Enter time (HH:MM 24hr format): ")
    tasks = load_tasks()
    tasks.append((task, time_str))
    save_tasks(tasks)
    print("✅ Task added successfully!\n")

# View all tasks
def view_tasks():
    tasks = load_tasks()
    if not tasks:
        print("No tasks scheduled.")
    else:
        print("\n🗓️ Your Tasks:")
        for t in tasks:
            print(f" - {t[0]} at {t[1]}")
    print()

# Reminder loop
def start_reminder():
    print("⏰ Reminder started! Press Ctrl+C to stop.\n")
    tasks = load_tasks()
    while True:
        now = datetime.now().strftime("%H:%M")
        for task, t in tasks:
            if t == now:
                print(f"🔔 Reminder: {task} (Time: {t})")
        time.sleep(60)  # check every minute

# Menu
while True:
    print("==== Daily Task Reminder ====")
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Start Reminder")
    print("4. Exit")
    choice = input("Choose an option: ")

    if choice == "1":
        add_task()
    elif choice == "2":
        view_tasks()
    elif choice == "3":
        start_reminder()
    elif choice == "4":
        print("Goodbye! 👋")
        break
    else:
        print("Invalid choice! Try again.\n")
