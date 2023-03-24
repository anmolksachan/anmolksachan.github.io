#define LED D0            // Led in NodeMCU at pin GPIO16 (D0).
void setup() {
pinMode(LED, OUTPUT);    // LED pin as output.
}
void loop() {
digitalWrite(LED, HIGH);// turn the LED off.(Note that LOW is the voltage level but
                        // actually, the LED is on; this is because it is acive low on the ESP8266.
delay(1000);            // wait for 1 second.
digitalWrite(LED, LOW); // turn the LED on.
delay(1000); // wait for 1 second.
}

//One pin to GND and other to D0 FYI - Small Pin is GND