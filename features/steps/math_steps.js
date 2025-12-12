const { Given, When, Then, Before, defineStep } = require('@cucumber/cucumber');
const assert = require('assert').strict;

Before(function () {
    this.inventory = {
        cucumbers: 0,
        carrots: 0,
        salads: 0
    };
    this.isVerificationPhase = false; // **Before each** execution we set false this value
});

// General explanation of logic:
// **Scenario Start:** The Before block sets the flag to false.
// **Given Steps:** Since the flag is false, the code fills your inventory with the initial quantities (e.g., 5 cucumbers, 10 carrots).
// **When Step:** When a When block is executed (eat or make salad), the code manually changes the flag to true.
// **Then Steps:** Since the flag is now true, the if block (!this.isVerificationPhase) is no longer met, and the code jumps to the else block to perform the validations (assert).

// **I am using defineStep to DRY concept, avoid duplicate code
// 1. Records a function that can be used for any type of step
// 2. Normalize the item name to handle singular/plural
// isVerificationPhase = TRUE, The function acts as a Given step
// isVerificationPhase = FALSE, The function acts as a Then step

defineStep('I have {int} {word}', function (count, item) {
    const key = item.endsWith('s') ? item : item + 's';

    // SETUP, assigned false before each execution
    if (!this.isVerificationPhase) {
        // console.log(`SETUP: Assigning ${count} a ${key}`);
        if (this.inventory.hasOwnProperty(key)) {
            this.inventory[key] = count;
        } else {
            throw new Error(`Unrecognized ingredient for initialization: ${item}`);
        }
    } else {
        // console.log(`ASSERT: Verifying that ${key} is ${count}`);
        const actualValue = this.inventory[key];
        // Assert validation
        assert.strictEqual(
            actualValue,
            count,
            `Error in ${item}: ${count} was expected but ${actualValue} is present`
        );
    }
});

When('I eat {int} {word}', function (count, item) {
    this.isVerificationPhase = true; // Mode of verification = SETUP
    const key = item.endsWith('s') ? item : item + 's';
    // console.log(`ACTION: Eating ${count} ${key}`);
    this.inventory[key] -= count;
});

When('I make a salad with {int} cucumbers and {int} carrots', function (cukeCount, carrotCount) {
    this.isVerificationPhase = true; // Mode of verification = SETUP
    // console.log(`ACTION: Making salad with ${cukeCount} cucumbers and ${carrotCount} carrots`);
    
    this.inventory.cucumbers -= cukeCount;
    this.inventory.carrots -= carrotCount;
    this.inventory.salads += 1;
});