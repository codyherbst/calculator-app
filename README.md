# Calculator App Requirements and Pseudocodo
## 1. You must not use eval()
This may or may not be trivial. Likely the data from an input form will come as a string. Converting operands and doing math with them will
likely be the hard part of this.

## 2. The calculator must be Object Oriented, utilizing `Class`, not Object.prototype
Not really sure at the moment what should and shouldn't be object oriented.

## 3. The app should be completely rendered via JS, no HTML besides a `<div id="app">`
I have already done this mostly with the tic-tac-toe app. What needs to be an object will determine what code I can copy and paste over.

## 4. The calculator should have a display area at the top.
This will likely be an input group but could be a simple container instead.

## 5. The display should show `0` by default.
This should be trivial. Default container should be set to `0` to do this.

## 6. The calculator should have 6 function buttons:
    Division `/`
    Multiplication `*`
    Subtraction `-`
    Addition `+`
    Calculate `=`
    Clear `c`
    
This will be complicated 

## 7. The calculator should have 10 number buttons, `0-9`.
## 8. The calculator should have a decimal button `.`
## 9.  The display area should update as a user presses buttons.
## 10.  When the user clicks a function button after the first and second values are entered (instead of `=`), the result of the calculation should be saved and the calculator should allow for a new number inp(for example: `1` then + then `3` then `-`, etc.)
## 11.  When the calculate button `=` is pressed, the calculator should apply the operation to the two stored numbers in the appropriate order (important for subtraction and division) and update the display.
## 12.  When the clear button `c` is pressed, all stored data should be erased and the display should show `0` again.