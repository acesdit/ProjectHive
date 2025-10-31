import random
import string

def generate_password(length=12, include_uppercase=True, include_digits=True, include_symbols=True):
    """Generate a random secure password."""
    characters = string.ascii_lowercase
    if include_uppercase:
        characters += string.ascii_uppercase
    if include_digits:
        characters += string.digits
    if include_symbols:
        characters += string.punctuation

    if not characters:
        raise ValueError("At least one character type must be selected.")

    password = ''.join(random.choice(characters) for _ in range(length))
    return password

if __name__ == "__main__":
    print("Random Password Generator")
    print("-" * 25)
    pwd = generate_password()
    print(f"Generated Password: {pwd}")