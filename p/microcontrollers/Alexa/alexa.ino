#include <ESP8266WiFi.h>
#include "fauxmoESP.h"

#define ssid "Anmol"
#define password "Password_for_wifi"
#define LED_PIN D1

fauxmoESP fauxmo;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH);

  Serial.begin(9600);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi connected");
  fauxmo.createServer(true);
  fauxmo.setPort(80);
  fauxmo.enable(true);
  fauxmo.addDevice("JARVIS");
  fauxmo.onSetState([](unsigned char device_id, const char* device_name, bool state, unsigned char value) {
    Serial.printf("[MAIN] Device #%d (%s) state: %s\n", device_id, device_name, state ? "ON" : "OFF");
    digitalWrite(LED_PIN, state ? HIGH : LOW);
  });
}

void loop() {
  fauxmo.handle();
}
