import { useEffect, useState } from "react";
import {
  useConnectUI,
  useIsConnected,
  useWallet,
  useDisconnect,
} from '@fuel-wallet/react';
// Import the contract factory -- you can find the name in src/contracts/contracts/index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { CounterContractAbi__factory } from "./sway-api";
import type { CounterContractAbi } from "./sway-api";

// Replace it with the address of the deployed contract
const CONTRACT_ID = "0x...";

export default function Home() {
  const [contract, setContract] = useState<CounterContractAbi>();
  const [counter, setCounter] = useState<number>();
  const [accountBalance, setAccountBalance] = useState<string>();
  const { connect, setTheme, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
  const { disconnect } = useDisconnect();

  setTheme("dark");

  useEffect(() => {
    // Fetch initial count and account balance on component mount or wallet change
    async function getInitialCount(){
      if(isConnected && wallet && wallet.address){
        const counterContract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);
        await getCount(counterContract);
        setContract(counterContract);
        getAccountBalance();
      }
    }

    getInitialCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, wallet]);

  // Fetch count from the contract
  const getCount = async (counterContract: CounterContractAbi) => {
    try{
      const { value } = await counterContract.functions
        .count()
        .txParams({
          gasPrice: 1,
          gasLimit: 100_000,
        })
        .simulate();
      setCounter(value.toNumber());
    } catch(error) {
      console.error(error);
    }
  }

  // Fetch account balance
  const getAccountBalance = async () => {
    try {
      const balance = await wallet?.getBalance();
      setAccountBalance(balance?.toString());
    } catch (error) {
      console.error("Error fetching account balance:", error);
    }
  };

  // Increment the counter value
  const onIncrementPressed = async () => {
    if (!contract) {
      return alert("Contract not loaded");
    }
    try {
      await contract.functions
        .increment()
        .txParams({
          gasPrice: 1,
          gasLimit: 100_000,
        })
        .call();
      await getCount(contract);
    } catch(error) {
      console.error(error);
    }
  };

  // Decrement the counter value
  const onDecrementPressed = async () => {
    if (!contract) {
      return alert("Contract not loaded");
    }
    try {
      await getCount(contract);
      if (counter === 0) {
        return alert("Count cannot be negative");
      }
      await contract.functions
        .decrement()
        .txParams({
          gasPrice: 1,
          gasLimit: 100_000,
        })
        .call();
      await getCount(contract);
    } catch (error) {
      console.error(error);
    }
  };

  // Reset the counter value to 0
  const onResetPressed = async () => {
    if (!contract) {
      return alert("Contract not loaded");
    }
    try {
      await contract.functions
        .reset()
        .txParams({
          gasPrice: 1,
          gasLimit: 100_000,
        })
        .call();
      await getCount(contract);
    } catch (error) {
      console.error(error);
    }
  };

  // Render UI elements based on wallet connection status
  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <div style={styles.disconnectButtonContainer}>
          {isConnected && (
            <button onClick={() => disconnect()} style={styles.button}>
              Disconnect from wallet
            </button>
          )}
        </div>
        {isConnected ? (
          <>
            <h3 style={styles.label}>Account Balance</h3>
            <div style={styles.balance}>{accountBalance ?? "Loading..."}</div>
            <h3 style={styles.label}>Counter</h3>
            <div style={styles.counter}>{counter ?? 0}</div>
            <div>
              <button onClick={onIncrementPressed} style={{...styles.button, marginRight: '8px'}}>
                Increment Counter
              </button>
              <button onClick={onDecrementPressed} style={{...styles.button, marginRight: '8px'}}>
                Decrement Counter
              </button>
              <button onClick={onResetPressed} style={styles.button}>
                Reset Counter
              </button>
            </div>
          </>
        ) : (
          <button onClick={() => connect()} style={styles.button}>
            {isConnecting ? 'Connecting' : 'Connect'}
          </button>
        )}
      </div>
    </div>
  );
}

// CSS styles for UI elements
const styles = {
  root: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: "black",
  } as React.CSSProperties,
  container: {
    color: "#ffffffec",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as React.CSSProperties,
  label: {
    fontSize: "28px",
  },
  counter: {
    color: "#a0a0a0",
    fontSize: "48px",
  },
  balance: {
    color: "#a0a0a0",
    fontSize: "24px",
  },
  button: {
    borderRadius: "8px",
    marginTop: "24px",
    backgroundColor: "#00F58C",
    fontSize: "16px",
    color: "#000000",
    border: "none",
    outline: "none",
    height: "60px",
    padding: "0 1rem",
    cursor: "pointer"
  },
  disconnectButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: '20px',
  } as React.CSSProperties,
};
