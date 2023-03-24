
# Basic Arduino Code

This is a basic Arduino code that demonstrates how to use the `Serial` library to read input from the serial monitor and write output to an LED.

## Prerequisites

-   Arduino board
-   LED
-   220 ohm resistor
-   Jumper wires
-   USB cable

## Installation

1.  Connect the LED to the Arduino board. Connect the anode (positive leg) of the LED to digital pin 13 and the cathode (negative leg) of the LED to a 220 ohm resistor. Connect the other end of the resistor to the GND pin on the Arduino board.
    
2.  Connect the Arduino board to your computer using a USB cable.
    
3.  Open the Arduino IDE and create a new sketch.
    
4.  Copy and paste the code from `basic-arduino-code.ino` into the sketch.
    
5.  Upload the code to the Arduino board by clicking the upload button in the Arduino IDE.
    

## Usage

1.  Open the serial monitor by clicking the serial monitor button in the Arduino IDE or by pressing `Ctrl+Shift+M`.
    
2.  Type a character in the input field of the serial monitor and press enter.
    
3.  The LED connected to digital pin 13 should turn on if you typed `1` and turn off if you typed `0`.
    

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

"""
Test
"""
