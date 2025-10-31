import java.util.ArrayList;
import java.util.Scanner;

// Class to represent each Flight
class Flight {
    String flightNo;
    String airline;
    String source;
    String destination;
    int seatsAvailable;
    double price;

    Flight(String flightNo, String airline, String source, String destination, int seatsAvailable, double price) {
        this.flightNo = flightNo;
        this.airline = airline;
        this.source = source;
        this.destination = destination;
        this.seatsAvailable = seatsAvailable;
        this.price = price;
    }

    public void displayInfo() {
        System.out.printf("%-10s %-15s %-15s %-15s %-10d ₹%.2f%n",
                flightNo, airline, source, destination, seatsAvailable, price);
    }
}

// Class for Flight Management System
public class FlightManagementSystem {
    private static ArrayList<Flight> flights = new ArrayList<>();
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        int choice;
        do {
            System.out.println("\n========= ✈️ Flight Management System =========");
            System.out.println("1. Add Flight");
            System.out.println("2. View All Flights");
            System.out.println("3. Search Flight");
            System.out.println("4. Book Ticket");
            System.out.println("5. Cancel Ticket");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1 -> addFlight();
                case 2 -> viewFlights();
                case 3 -> searchFlight();
                case 4 -> bookTicket();
                case 5 -> cancelTicket();
                case 6 -> System.out.println("👋 Exiting Flight Management System. Goodbye!");
                default -> System.out.println("❌ Invalid choice! Please try again.");
            }
        } while (choice != 6);
    }

    // Add flight
    public static void addFlight() {
        System.out.print("Enter Flight Number: ");
        String flightNo = sc.nextLine();

        System.out.print("Enter Airline Name: ");
        String airline = sc.nextLine();

        System.out.print("Enter Source: ");
        String source = sc.nextLine();

        System.out.print("Enter Destination: ");
        String destination = sc.nextLine();

        System.out.print("Enter Available Seats: ");
        int seats = sc.nextInt();

        System.out.print("Enter Ticket Price: ₹");
        double price = sc.nextDouble();
        sc.nextLine();

        flights.add(new Flight(flightNo, airline, source, destination, seats, price));
        System.out.println("✅ Flight added successfully!");
    }

    // View all flights
    public static void viewFlights() {
        if (flights.isEmpty()) {
            System.out.println("⚠️ No flights available.");
            return;
        }

        System.out.println("\n---------------- Flight List ----------------");
        System.out.printf("%-10s %-15s %-15s %-15s %-10s %s%n",
                "FlightNo", "Airline", "Source", "Destination", "Seats", "Price");
        System.out.println("---------------------------------------------------------------");
        for (Flight f : flights) {
            f.displayInfo();
        }
    }

    // Search flight by number or destination
    public static void searchFlight() {
        System.out.print("Search by (1) Flight Number or (2) Destination: ");
        int option = sc.nextInt();
        sc.nextLine();

        boolean found = false;
        if (option == 1) {
            System.out.print("Enter Flight Number: ");
            String num = sc.nextLine();
            for (Flight f : flights) {
                if (f.flightNo.equalsIgnoreCase(num)) {
                    System.out.println("✅ Flight Found:");
                    f.displayInfo();
                    found = true;
                }
            }
        } else if (option == 2) {
            System.out.print("Enter Destination: ");
            String dest = sc.nextLine();
            System.out.println("Flights to " + dest + ":");
            for (Flight f : flights) {
                if (f.destination.equalsIgnoreCase(dest)) {
                    f.displayInfo();
                    found = true;
                }
            }
        }

        if (!found) System.out.println("❌ No matching flights found.");
    }

    // Book ticket
    public static void bookTicket() {
        System.out.print("Enter Flight Number to book: ");
        String num = sc.nextLine();

        for (Flight f : flights) {
            if (f.flightNo.equalsIgnoreCase(num)) {
                if (f.seatsAvailable > 0) {
                    f.seatsAvailable--;
                    System.out.println("🎟️ Ticket booked successfully for flight " + f.flightNo);
                } else {
                    System.out.println("❌ No seats available on this flight.");
                }
                return;
            }
        }
        System.out.println("❌ Flight not found.");
    }

    // Cancel ticket
    public static void cancelTicket() {
        System.out.print("Enter Flight Number to cancel ticket: ");
        String num = sc.nextLine();

        for (Flight f : flights) {
            if (f.flightNo.equalsIgnoreCase(num)) {
                f.seatsAvailable++;
                System.out.println("🧾 Ticket cancelled successfully for flight " + f.flightNo);
                return;
            }
        }
        System.out.println("❌ Flight not found.");
    }
}
