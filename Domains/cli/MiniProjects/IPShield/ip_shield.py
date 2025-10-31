import urllib.request
import json

def get_public_ip():
    """Get public IP using ipify.org"""
    try:
        with urllib.request.urlopen("https://api.ipify.org/?format=json") as response:
            data = json.loads(response.read().decode())
            return data["ip"]
    except Exception:
        return None

def get_ip_info(ip):
    """Get detailed info using ip-api.com"""
    try:
        url = f"http://ip-api.com/json/{ip}"
        with urllib.request.urlopen(url) as response:
            return json.loads(response.read().decode())
    except Exception:
        return None

def display_info(info):
    """Display IP intelligence in a shield-style box."""
    if not info or info.get("status") != "success":
        print("\033[91m❌ Failed to retrieve IP information.\033[0m")
        return

    print("\n" + "\033[1;94m🛡️  IP SHIELD: Digital Identity Report 🛡️\033[0m")
    print("=" * 50)
    print(f"🌐 Public IP     : {info.get('query', 'N/A')}")
    print(f"📍 Location      : {info.get('city', 'N/A')}, {info.get('regionName', 'N/A')}, {info.get('country', 'N/A')}")
    print(f"📮 Postal Code   : {info.get('zip', 'N/A')}")
    print(f"🧭 Coordinates   : {info.get('lat', 'N/A')}, {info.get('lon', 'N/A')}")
    print(f"🕒 Timezone      : {info.get('timezone', 'N/A')}")
    print(f"🏢 ISP           : {info.get('isp', 'N/A')}")
    print(f"🧾 Org           : {info.get('org', 'N/A')}")
    print(f"📶 ASN           : {info.get('as', 'N/A')}")
    print("=" * 50 + "\n")

def main():
    print("\033[1;92m🔍 Fetching your public IP and geolocation...\033[0m")
    
    ip = get_public_ip()
    if not ip:
        print("\033[91m❌ Could not detect your public IP.\033[0m")
        return

    info = get_ip_info(ip)
    display_info(info)

if __name__ == "__main__":
    main()