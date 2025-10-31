import urllib.request
import json

def get_location_from_pincode(pincode):
    """Get city and state from Indian pincode."""
    try:
        url = f"https://api.postalpincode.in/pincode/{pincode}"
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode())
        if data[0]["Status"] == "Success":
            # Use the first delivery-enabled office if possible
            offices = data[0]["PostOffice"]
            for office in offices:
                if office.get("DeliveryStatus") == "Delivery":
                    return office["Name"], office["District"], office["State"]
            # Fallback to first office
            return offices[0]["Name"], offices[0]["District"], offices[0]["State"]
    except Exception:
        pass
    return None, None, None

def get_weather(lat, lon):
    """Get current weather using Open-Meteo (no API key)."""
    try:
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
        with urllib.request.urlopen(url) as response:
            return json.loads(response.read().decode()).get("current_weather")
    except Exception:
        return None

def get_coordinates(city, state):
    """Approximate coordinates for major Indian cities (fallback)."""
    # Simplified mapping for demo – in real apps, use geocoding API
    city = city.lower()
    if "mumbai" in city: return 19.0760, 72.8777
    if "delhi" in city or "new delhi" in city: return 28.6139, 77.2090
    if "bangalore" in city or "bengaluru" in city: return 12.9716, 77.5946
    if "chennai" in city: return 13.0827, 80.2707
    if "kolkata" in city: return 22.5726, 88.3639
    if "hyderabad" in city: return 17.3850, 78.4867
    if "pune" in city: return 18.5204, 73.8567
    if "ahmedabad" in city: return 23.0225, 72.5714
    if "jaipur" in city: return 26.9124, 75.7873
    if "lucknow" in city: return 26.8467, 80.9462
    # Default fallback to Delhi
    return 28.6139, 77.2090

def display_weather(pincode, city, district, state, weather):
    print("\n" + "\033[1;96m🌤️  WeatherPin: Pincode-Based Weather Report 🌤️\033[0m")
    print("=" * 60)
    print(f"📍 Pincode       : {pincode}")
    print(f"🏙️  Location      : {city}, {district}, {state}")
    if weather:
        temp = weather.get("temperature", "N/A")
        windspeed = weather.get("windspeed", "N/A")
        weathercode = weather.get("weathercode", "?")
        codes = {
            0: "☀️ Clear",
            1: "🌤️ Mainly Clear",
            2: "⛅ Partly Cloudy",
            3: "☁️ Overcast",
            45: "🌫️ Fog",
            51: "🌦️ Light Drizzle",
            61: "🌧️ Light Rain",
            63: "🌧️ Moderate Rain",
            71: "❄️ Light Snow",
            95: "⛈️ Thunderstorm"
        }
        condition = codes.get(weathercode, f"Code {weathercode}")
        print(f"🌡️  Temperature   : {temp}°C")
        print(f"💨 Wind Speed     : {windspeed} km/h")
        print(f"🌈 Condition      : {condition}")
    else:
        print("\033[93m⚠️  Weather data unavailable (limited geocoding)\033[0m")
        print("💡 Tip: Works best for major Indian cities.")
    print("=" * 60 + "\n")

def main():
    print("\033[1;92m🇮🇳 WeatherPin: Get weather using Indian pincode!\033[0m")
    print("\033[90mEnter a 6-digit pincode to see current weather.\033[0m\n")

    pincode = input("Enter Pincode: ").strip()

    if not pincode.isdigit() or len(pincode) != 6:
        print("\033[91m❌ Please enter a valid 6-digit Indian pincode.\033[0m")
        return

    city, district, state = get_location_from_pincode(pincode)
    if not city:
        print("\033[91m❌ Could not find location for this pincode.\033[0m")
        return

    lat, lon = get_coordinates(city, state)
    weather = get_weather(lat, lon)

    display_weather(pincode, city, district, state, weather)

if __name__ == "__main__":
    main()