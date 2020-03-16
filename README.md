# Calculator App Requirements and Pseudocodo
## 1. You must not use eval()
This is done by checking the second element of an array which always contains the operand.

## 2. The calculator must be Object Oriented, utilizing `Class`, not Object.prototype
Using Model, View, Controller as the three objects.
  Model checks the state and passes it to controller.
  Controller does all of the math and checks the operand passed in.
  View creates the html page and is rebuilt everytime model updates the state.

## 3. The app should be completely rendered via JS, no HTML besides a `<div id="app">`
This is all done using the view object.

## 4. The calculator should have a display area at the top.
Again this is done using the view object.

## 5. The display should show `0` by default.
This is set as a string as all numbers are passed in as strings then converted later.

## 6. The calculator should have 6 function buttons:
    Division `/`
    Multiplication `*`
    Subtraction `-`
    Addition `+`
    Calculate `=`
    Clear `c`

Clear is its own function. All of the operands are passed to the math function and the rest is done from there.

## 7. The calculator should have 10 number buttons, `0-9`.
`updateState()` handles this in the model object as well as being created in the view object.

## 8. The calculator should have a decimal button `.`
Same as requirement 7.

## 9.  The display area should update as a user presses buttons.
This is done by calling `buildCalculator()` everytime `updateState()` is called.

## 10.  When the user clicks a function button after the first and second values are entered (instead of `=`), the result of the calculation should be saved and the calculator should allow for a new number inp(for example: `1` then + then `3` then `-`, etc.)
This took 2 days of staring at it but it works now.

## 11.  When the calculate button `=` is pressed, the calculator should apply the operation to the two stored numbers in the appropriate order (important for subtraction and division) and update the display.
This is complete.

## 12.  When the clear button `c` is pressed, all stored data should be erased and the display should show `0` again.
This is complete.