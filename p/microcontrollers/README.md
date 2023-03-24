# Security Meetup Presentation Code

This repository/ page contains the code used in a presentation for a security meetup. The code is written for an ESP8266 microcontroller and includes examples of various functionalities.

## List of .ino files

-   `0-LED_On_D1.ino`: A basic program to turn on the built-in LED on pin D1 of the ESP8266.
-   `1-Hello_Jarvis.ino`: A simple program to print "Hello Jarvis" to the serial monitor.
-   `2-Hello_Jarvis - v_1.0.ino`: An updated version of the previous program to include comments and use of constants.
-   `3-Blink_Internal_Led.ino`: A program to blink the built-in LED on the ESP8266.
-   `4-Blink_External_Led.ino`: A program to blink an external LED connected to the ESP8266.
-   `5-Connect_To_WiFi.ino`: A program to connect the ESP8266 to a Wi-Fi network.
-   `5-Connect_To_WiFi_POC.png`: A proof of concept diagram for the Wi-Fi connection program.
-   `6-Connect_To_WiFi_LED.ino`: A program to connect the ESP8266 to a Wi-Fi network and blink an external LED.
-   `7-Host_A_WiFi.ino`: A program to create a Wi-Fi hotspot using the ESP8266.
-   `8-LED-Server.ino`: A program to turn on/off an external LED using a web server hosted on the ESP8266.
-   `10-ScanWiFi.ino`: A program to scan for available Wi-Fi networks.

## Alexa Directory

The `Alexa` directory contains additional code related to integrating the ESP8266 with Amazon Alexa.

Feel free to use and modify the code as needed for your own projects.

# Code Used

### `0-LED_On_D1.ino`: A basic program to turn on the built-in LED on pin D1 of the ESP8266.
```arduino
void setup() {
  pinMode(D1, OUTPUT); // set pin D1 as output
}

void loop() {
  digitalWrite(D1, HIGH); // turn on LED
}
```

### `1-Hello_Jarvis.ino`: A simple program to print "Hello Jarvis" to the serial monitor.
```arduino
void setup() {
   Serial.begin(9600);
   delay(5000);
   Serial.print("Hello JARVIS!");
}
void loop() {
}
```
## Link to All Code
[Repository](https://github.com/anmolksachan/anmolksachan.github.io/tree/main/p/microcontrollers)
