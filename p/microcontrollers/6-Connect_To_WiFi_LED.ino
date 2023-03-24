#include "ESP8266WiFi.h"

const char* ssid = "ANMOL"; //Enter SSID
const char* password = "Password_for_wifi"; //Enter Password

void setup(void)
{ 
  Serial.begin(9600);
  pinMode(D1, OUTPUT); // set pin D1 as output
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) 
  {
     delay(500);
     Serial.print("*");
  }
  
  Serial.println("");
  Serial.println("WiFi connection Successful");
  Serial.print("The IP Address of ESP8266 Module is: ");
  Serial.print(WiFi.localIP());// Print the IP address
  Serial.println("\nConnected to WiFi");
  digitalWrite(D1, HIGH); // turn on LED
}

void loop() 
{
  // EMPTY
}