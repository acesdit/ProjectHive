import urllib.parse
import urllib.request
import json

def get_age_from_name(name):
    """Fetch estimated age for a given name using Agify.io API."""
    safe_name = urllib.parse.quote(name)
    url = f"https://api.agify.io/?name={safe_name}"
    
    try:
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode())
            if data.get("age") is not None:
                return data["name"], data["age"], data.get("count", 0)
            else:
                return name, None, 0
    except Exception:
        return name, None, 0

def main():
    print("\033[1;95m🔮 AgeGuessr: How old is your name?\033[0m")
    print("\033[90m(Uses global data to guess the average age for a given first name!)\033[0m\n")
    
    name = input("Enter a first name: ").strip()
    
    if not name:
        print("❌ Name cannot be empty!")
        return
    
    guessed_name, age, count = get_age_from_name(name)
    
    print("\n" + "="*50)
    if age is not None:
        print(f"📊 Name: \033[1m{guessed_name.title()}\033[0m")
        print(f"👴 Estimated Average Age: \033[1;92m{age} years\033[0m")
        print(f"🌍 Based on \033[1;96m{count:,}\033[0m records")
    else:
        print(f"❓ Sorry! No age data found for '\033[1m{name.title()}\033[0m'.")
    print("="*50 + "\n")

if __name__ == "__main__":
    main()