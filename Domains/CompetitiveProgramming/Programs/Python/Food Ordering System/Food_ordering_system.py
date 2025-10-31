# Food Ordering System in Python
# Developed by ChatGPT (Console Based)

class FoodItem:
    def __init__(self, id, name, price):
        self.id = id
        self.name = name
        self.price = price

class FoodOrderingSystem:
    def __init__(self):
        self.menu = [
            FoodItem(1, "Pizza", 250),
            FoodItem(2, "Burger", 120),
            FoodItem(3, "Pasta", 180),
            FoodItem(4, "French Fries", 90),
            FoodItem(5, "Cold Coffee", 80),
            FoodItem(6, "Sandwich", 100)
        ]
        self.cart = []

    def display_menu(self):
        print("\n======= 🍴 MENU =======")
        print("{:<5} {:<15} {:<10}".format("ID", "Item", "Price (₹)"))
        print("-----------------------------")
        for item in self.menu:
            print("{:<5} {:<15} {:<10}".format(item.id, item.name, item.price))
        print("-----------------------------")

    def add_to_cart(self):
        self.display_menu()
        try:
            item_id = int(input("Enter item ID to order: "))
            quantity = int(input("Enter quantity: "))

            for item in self.menu:
                if item.id == item_id:
                    self.cart.append({"item": item, "quantity": quantity})
                    print(f"✅ {item.name} x{quantity} added to cart.")
                    return
            print("❌ Invalid item ID.")
        except ValueError:
            print("⚠️ Please enter a valid number.")

    def view_cart(self):
        if not self.cart:
            print("🛒 Your cart is empty.")
            return

        print("\n======= 🧾 YOUR CART =======")
        total = 0
        print("{:<15} {:<10} {:<10}".format("Item", "Qty", "Price"))
        print("--------------------------------")
        for order in self.cart:
            item = order["item"]
            quantity = order["quantity"]
            price = item.price * quantity
            print("{:<15} {:<10} {:<10}".format(item.name, quantity, price))
            total += price

        gst = total * 0.05
        grand_total = total + gst
        print("--------------------------------")
        print(f"Subtotal: ₹{total:.2f}")
        print(f"GST (5%): ₹{gst:.2f}")
        print(f"Total Bill: ₹{grand_total:.2f}")
        print("--------------------------------")

    def remove_item(self):
        if not self.cart:
            print("❌ Cart is empty.")
            return

        self.view_cart()
        try:
            item_name = input("Enter item name to remove: ").strip().lower()
            for order in self.cart:
                if order["item"].name.lower() == item_name:
                    self.cart.remove(order)
                    print(f"❎ {order['item'].name} removed from cart.")
                    return
            print("❌ Item not found in cart.")
        except Exception as e:
            print("⚠️ Error:", e)

    def checkout(self):
        if not self.cart:
            print("🛒 Your cart is empty.")
            return

        self.view_cart()
        print("💳 Thank you for your order! Enjoy your meal 😋")
        self.cart.clear()

    def main_menu(self):
        while True:
            print("\n========== 🍔 FOOD ORDERING SYSTEM ==========")
            print("1. View Menu")
            print("2. Add to Cart")
            print("3. View Cart")
            print("4. Remove Item")
            print("5. Checkout")
            print("6. Exit")

            choice = input("Enter your choice: ")

            if choice == '1':
                self.display_menu()
            elif choice == '2':
                self.add_to_cart()
            elif choice == '3':
                self.view_cart()
            elif choice == '4':
                self.remove_item()
            elif choice == '5':
                self.checkout()
            elif choice == '6':
                print("👋 Thank you! Visit again!")
                break
            else:
                print("❌ Invalid choice. Please try again.")


# Run the system
if __name__ == "__main__":
    system = FoodOrderingSystem()
    system.main_menu()
