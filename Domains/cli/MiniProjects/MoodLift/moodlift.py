import urllib.request
import json
import random

def print_fancy_box(joke_setup, punchline):
    """Print joke in a decorative box."""
    width = max(len(joke_setup), len(punchline)) + 4
    border = "+" + "-" * (width) + "+"
    
    print("\n\033[96m" + border + "\033[0m")
    print("\033[93m| " + joke_setup.ljust(width - 2) + " |\033[0m")
    print("\033[93m| " + punchline.ljust(width - 2) + " |\033[0m")
    print("\033[96m" + border + "\033[0m\n")

def get_random_joke():
    """Fetch a random joke from the public API."""
    try:
        with urllib.request.urlopen("https://official-joke-api.appspot.com/random_joke") as response:
            data = json.loads(response.read().decode())
            return data["setup"], data["punchline"]
    except Exception as e:
        return "Feeling stressed? Take a deep breath!", "Even APIs need coffee sometimes. 😅"

def main():
    print("\033[1;92m✨ MoodLift: Your Daily Dose of Desk-side Joy ✨\033[0m")
    print("\033[90m(For when the code won't compile and the coffee's cold...)\033[0m\n")
    
    setup, punchline = get_random_joke()
    print_fancy_box(setup, punchline)

if __name__ == "__main__":
    main()