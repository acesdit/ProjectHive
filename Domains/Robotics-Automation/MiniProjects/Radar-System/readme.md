🛰️ Arduino Radar System

The Arduino Radar System uses an ultrasonic sensor, servo motor, and LCD display to detect and display the distance of nearby objects at different angles. The servo motor continuously sweeps from 0° to 180°, while the ultrasonic sensor measures the distance and shows both the angle and distance on the LCD screen.

⚙️ Components Used

Arduino UNO (or compatible board)

Ultrasonic Sensor (HC-SR04)

Servo Motor (SG90 or similar)

I2C LCD Display (16x2, address 0x27)

Jumper Wires

Breadboard

🧠 Working Principle

The servo motor rotates from 0° to 180°, scanning the area.

At each step, the ultrasonic sensor measures the distance of any obstacle.

The LCD display shows:

Angle (°) of the servo

Distance (cm) of the detected object

The process repeats continuously to simulate a radar sweep.

🔌 Pin Connections


| Component       | Arduino Pin | Description       |
| --------------- | ----------- | ----------------- |
| Servo Motor     | D3          | PWM Signal        |
| Ultrasonic Trig | D9          | Trigger Pin       |
| Ultrasonic Echo | D10         | Echo Pin          |
| LCD SDA         | A4          | I2C Data          |
| LCD SCL         | A5          | I2C Clock         |
| VCC & GND       | 5V, GND     | Power Connections |


💻 Code Overview

The servo moves in a sweep motion (0° → 180° → 0°).

Distance is calculated using ultrasonic sensor readings.

Angle and distance are displayed on the LCD.

🧩 Libraries Required

Make sure you have these libraries installed in Arduino IDE:

Servo.h

Wire.h

LiquidCrystal_I2C.h

🚀 How to Run

Connect the components as per the pin configuration.

Upload the provided Arduino code.

Power up your Arduino board.

Watch the servo sweep while the LCD displays angle and distance readings.

📊 Output Example

Angle:  90°
Dist:   22 cm

🌟 Features

✅ Real-time distance measurement

✅ Smooth servo sweep motion

✅ Clear LCD display output

✅ Simple and beginner-friendly project

Author 

Shirsha Nag | IOT+Robotics developer
