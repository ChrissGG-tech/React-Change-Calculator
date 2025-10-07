import './App.css'
import { useState } from 'react';


function App() {

  // We'll store what the user types in and the computed change breakdown.
  // In plain language: each `useState` here is like a little labeled box where
  // we keep a value that can change over time.
  const [amountDue, setAmountDue] = useState('') 
  const [amountReceived, setAmountReceived] = useState('') 
  const [changeDue, setChangeDue] = useState(0) 

  // These track how many of each bill/coin the customer should get back.
  const [twenties, setTwenties] = useState(0)
  const [tens, setTens] = useState(0)
  const [fives, setFives] = useState(0)
  const [ones, setOnes] = useState(0)
  const [quarters, setQuarters] = useState(0)
  const [dimes, setDimes] = useState(0)
  const [nickels, setNickels] = useState(0)
  const [pennies, setPennies] = useState(0)



  const calculateChange = () => {
    // Convert text inputs into numbers. parseFloat turns "13.01" into 13.01.
    const due = parseFloat(amountDue);
    const received = parseFloat(amountReceived);


    // How much should be returned to the customer
    const change = received - due;
    setChangeDue(change);

    //Makes it into a whole cent instead of getting .0001
    let remainingCents = Math.round(change * 100);

    
    const twentyCount = Math.floor(remainingCents / 2000);
    remainingCents %= 2000;
    setTwenties(twentyCount);

    const tenCount = Math.floor(remainingCents / 1000);
    remainingCents %= 1000;
    setTens(tenCount);

    const fiveCount = Math.floor(remainingCents / 500);
    remainingCents %= 500;
    setFives(fiveCount);

    const oneCount = Math.floor(remainingCents / 100);
    remainingCents %= 100;
    setOnes(oneCount);

    const quarterCount = Math.floor(remainingCents / 25);
    remainingCents %= 25;
    setQuarters(quarterCount);

    const dimeCount = Math.floor(remainingCents / 10);
    remainingCents %= 10;
    setDimes(dimeCount);

    const nickelCount = Math.floor(remainingCents / 5);
    remainingCents %= 5;
    setNickels(nickelCount);

    // Whatever is left are pennies (0-4 cents)
    const pennyCount = remainingCents;
    setPennies(pennyCount);
  };


  return (
    <div className="app-container">
      <h1 className="text-dark">Change Calculator</h1>

      <div className="grid">
        {/* Left panel: user inputs and the Calculate button */}
        <div className="panel left-panel">
          <div>
            <label htmlFor='amountDue'>How much is due?</label>
            <input
              id="amountDue"
              type="number"
              data-testid="amountDue"
              value={amountDue}
              onChange={(e) => setAmountDue(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='amountReceived'>How much was received?</label>
            <input
              id="amountReceived"
              type="number"
              data-testid="amountReceived"
              value={amountReceived}
              onChange={(e) => setAmountReceived(e.target.value)}
            />
          </div>

          {/* The button runs the calculate function */}
          <div>
            <button data-testid="calculate" onClick={calculateChange}>
              Calculate
            </button>
          </div>
        </div>

        {/* Right panel: results */}
        <div className="panel right-panel">
          <div className="results-summary">
            {changeDue >= 0 ? (
              // If changeDue is positive or zero, show how much to give back
              <p data-testid="changeDue">The total change due is ${changeDue.toFixed(2)}</p>
            ) : (
              // If changeDue is negative, show how much more is owed
              <p data-testid="changeDue">Additional money owed is ${Math.abs(changeDue).toFixed(2)}</p>
            )}
          </div>

          {/* A simple grid showing each denomination and its count */}
          <div className="denominations">
            <div className="denomination"><div>Twenties</div><div data-testid="twenties">{twenties}</div></div>
            <div className="denomination"><div>Tens</div><div data-testid="tens">{tens}</div></div>
            <div className="denomination"><div>Fives</div><div data-testid="fives">{fives}</div></div>
            <div className="denomination"><div>Ones</div><div data-testid="ones">{ones}</div></div>
            <div className="denomination"><div>Quarters</div><div data-testid="quarters">{quarters}</div></div>
            <div className="denomination"><div>Dimes</div><div data-testid="dimes">{dimes}</div></div>
            <div className="denomination"><div>Nickels</div><div data-testid="nickels">{nickels}</div></div>
            <div className="denomination"><div>Pennies</div><div data-testid="pennies">{pennies}</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
