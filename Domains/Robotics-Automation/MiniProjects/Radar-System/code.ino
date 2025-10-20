#include <Servo.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// LCD setup (address 0x27 is common, 16 columns x 2 rows)
LiquidCrystal_I2C lcd(0x27, 16, 2);

Servo myServo;

const int trigPin = 9;
const int echoPin = 10;

long duration;
int distance;

void setup() {
  myServo.attach(3);  
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  lcd.init();            // Initialize LCD
  lcd.backlight();       // Turn on backlight
}

void loop() {
  // Sweep from 0° to 180°
  for (int pos = 0; pos <= 180; pos += 5) {
    myServo.write(pos);
    delay(200);

    distance = getDistance();

    displayLCD(pos, distance);
  }

  // Sweep from 180° to 0°
  for (int pos = 180; pos >= 0; pos -= 5) {
    myServo.write(pos);
    delay(200);

    distance = getDistance();

    displayLCD(pos, distance);
  }
}

// Function to measure distance
int getDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  int dist = duration * 0.034 / 2; // in cm
  return dist;
}

// Function to display angle and distance on LCD
void displayLCD(int angle, int distance) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Angle: ");
  lcd.print(angle);
  lcd.print((char)223); // Degree symbol

  lcd.setCursor(0, 1);
  lcd.print("Dist: ");
  lcd.print(distance);
  lcd.print(" cm");

  delay(200); // Small delay so LCD is readable
}
