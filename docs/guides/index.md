# Overview

For this assignment, I've chosen to work on the Frontend React project. The initial version of the project only allowed users to increase the counter. However, in the updated version, I've added features like decreasing the counter, resetting it to zero, checking the account balance, and providing an option to disconnect from the wallet.

## Implementation Approach

Before adding new features, it was important to fully understand how the Counter DApp's existing architecture works. This involved understanding both the Counter Contract and frontend components to understand how the original counter functionality was implemented.

In this assignment, I have added the following features to the frontend of Counter React App:

* **Wallet Connectivity**: Users can disconnect their Fuel Wallet with the counter React app.
* **Account Balance Display**: The users can view their account balance within the app interface.
* **Counter Controls**: Users will not only have button to increment but also to decrement, reset the counter to 0 that allows dynamic interaction with the smart contract.


## Significant changes

* **Smart Contract Modification**: To add the functionality of decrementing and resetting the counter to 0, new functions are added to the Counter Contract in the [docs/guides/examples/quickstart/counter-contract/src/main.sw](docs/guides/examples/quickstart/counter-contract/src/main.sw) file.

* **Test Cases**: Test cases for decrementing and resetting the counter were implemented and added to the [docs/guides/examples/quickstart/counter-contract/tests/harness.rs](docs/guides/examples/quickstart/counter-contract/tests/harness.rs) file. 

* **Frontend Integration**: After updating the smart contract, the next step was to integrate the new features into the frontend interface. This involved adding user interface elements for wallet disconnect, decrementing the counter, and reseting the counter to 0, allowing users to interact with the improved counter functionality. For changes, refer to the [docs/guides/examples/quickstart/frontend/src/App.tsx](docs/guides/examples/quickstart/frontend/src/App.tsx) file.

## Updated Documentation: Building a Frontend to Interact With Your Contract

You can check the updated documentation on Building Frontend to Interact with your contract [here](https://github.com/soniasingla/docs-hub/blob/master/docs/guides/docs/quickstart/building-a-frontend.mdx). For better experience, I would highly suggest running the project locally.

## Future Improvements

* **Transaction History**: Display a list of recent transactions made by the user, including details such as transaction hash, timestamp, and type (increment/decrement/reset).
* **Gas Fee Estimation**: Provide users with an estimate of the gas fees required for each transaction and allowing them to customize the gas parameters.
* **Customizable Increment/Decrement**: Providing users with the ability to specify the amount by which the counter value is incremented or decremented.
