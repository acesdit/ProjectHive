import java.util.Scanner;
import java.text.DecimalFormat;

public class ElectricityBillSimple {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        DecimalFormat df = new DecimalFormat("#0.00");

        // Configurable tariff (example values — change to match your local tariff)
        // Slabs: {maxUnitsInThisSlab, ratePerUnit}
        double[][] slabs = {
            {100, 1.50},   // 0 - 100 units => 1.50 per unit
            {100, 3.00},   // next 100 units (101 - 200) => 3.00 per unit
            {100, 4.50},   // next 100 units (201 - 300) => 4.50 per unit
            {Double.MAX_VALUE, 6.00} // above 300 units => 6.00 per unit
        };

        double fixedCharge = 50.00;   // fixed monthly charge (example)
        double taxPercent = 18.0;     // tax% (GST or electricity duty) (example)

        System.out.print("Enter units consumed: ");
        double units = sc.nextDouble();

        double remaining = units;
        double energyCharge = 0.0;
        for (int i = 0; i < slabs.length && remaining > 0; i++) {
            double slabLimit = slabs[i][0];
            double rate = slabs[i][1];

            double applyUnits = Math.min(remaining, slabLimit);
            energyCharge += applyUnits * rate;
            remaining -= applyUnits;
        }

        double subTotal = energyCharge + fixedCharge;
        double taxAmount = subTotal * (taxPercent / 100.0);
        double totalBill = subTotal + taxAmount;

        System.out.println("\n------- Electricity Bill -------");
        System.out.println("Units consumed: " + df.format(units));
        System.out.println("Energy charge: ₹ " + df.format(energyCharge));
        System.out.println("Fixed charge:  ₹ " + df.format(fixedCharge));
        System.out.println("Subtotal:      ₹ " + df.format(subTotal));
        System.out.println("Tax (" + df.format(taxPercent) + "%):  ₹ " + df.format(taxAmount));
        System.out.println("-------------------------------");
        System.out.println("Total payable: ₹ " + df.format(totalBill));
        System.out.println("-------------------------------");

        sc.close();
    }
}
