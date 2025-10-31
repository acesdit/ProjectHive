import urllib.request
import json
import sys

def fetch_pincode_data(pincode):
    """Fetch post office data for a given Indian pincode."""
    try:
        url = f"https://api.postalpincode.in/pincode/{pincode}"
        with urllib.request.urlopen(url) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        return None

def display_results(data):
    """Display formatted post office information."""
    if not data or data[0].get("Status") != "Success":
        print("\033[91m❌ Invalid or unknown pincode. Please try again.\033[0m")
        return

    result = data[0]
    offices = result["PostOffice"]
    print(f"\n\033[1;94m📬 Found {result['Message']}\033[0m")
    print("=" * 60)

    for i, office in enumerate(offices, 1):
        name = office.get("Name", "N/A")
        district = office.get("District", "N/A")
        state = office.get("State", "N/A")
        delivery = office.get("DeliveryStatus", "N/A")
        branch = office.get("BranchType", "N/A")

        print(f"\n📍 Office {i}: \033[1m{name}\033[0m")
        print(f"   🏙️  District: {district}")
        print(f"   🏛️  State: {state}")
        print(f"   🚚 Delivery: {'✅ Yes' if delivery == 'Delivery' else '❌ No'}")
        print(f"   🏢 Type: {branch}")

    print("\n" + "=" * 60 + "\n")

def main():
    print("\033[1;92m🇮🇳 PincodeLookup: Indian Address Resolver\033[0m")
    print("\033[90mEnter a 6-digit Indian pincode to see associated post offices.\033[0m\n")

    pincode = input("Enter Pincode: ").strip()

    if not pincode.isdigit() or len(pincode) != 6:
        print("\033[91m❌ Please enter a valid 6-digit pincode.\033[0m")
        return

    print("\n🔍 Looking up...\n")
    data = fetch_pincode_data(pincode)
    display_results(data)

if __name__ == "__main__":
    main()