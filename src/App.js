import './App.css';
import React, { useEffect, useState } from 'react';
import Button from './components/Button'
import Calculator from './classes/Calculator';
import Output from './components/Output';



function App() {
  const [expression, setExpression] = useState([]);
  const [currNum, setCurrNum] = useState("");
  const [display, setDisplay] = useState("");
  const [negative, setNegative] = useState(false);
  const [doCalculation, setDoCalculation] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    if(doCalculation){
      let calc = new Calculator(expression)
      let result = calc.evaluate();
      setResult(result);
      setDoCalculation(false);
    }
  }, [expression, display, doCalculation])

  const handleCalculate = () => {
    if(currNum !== ""){
      setExpression(prevExpression => [...prevExpression, parseFloat(currNum)]);
    }
    setDoCalculation(true);
  }

  const handleNegPos = () => {
    if(currNum !== ""){
      if (negative) {
        setNegative(false);
        setCurrNum(prevNum => prevNum.slice(1));
      } else {
        setNegative(true);
        setCurrNum(prevNum => "-" + prevNum)
      }
    }
  }

  const handleClick = (e) => {
    let input = e.target.value;
    
    if(input === 'clear'){
      setDisplay("");
      setCurrNum("");
      setExpression([]);
    }else if(!isNaN(input) || input === '.'){
      if(input === '.' && !currNum.includes(input)){
        setCurrNum(prevNum => prevNum.concat(input))
        setDisplay(prevDisplay => prevDisplay.concat(input))
      }
      if(input !== '.'){
        setCurrNum(prevNum => prevNum.concat(input))
        setDisplay(prevDisplay => prevDisplay.concat(input))
      }
    }else if(isNaN(input) && input !== 'backspace' && currNum !== "" && input !== "."){
      setExpression(prevExpression => [...prevExpression, parseFloat(currNum)]);
      setCurrNum("");
      setNegative(false);
      setExpression(prevExpression => [...prevExpression, input]);
      setDisplay(prevDisplay => prevDisplay.concat(input))
    }else if(input === 'backspace' && (currNum !== "" || expression.length > 0)){
      if(currNum !== ""){
        setCurrNum(prevNum => prevNum.slice(0, prevNum.length - 1));
        setDisplay(prevDisplay => prevDisplay.slice(0, prevDisplay.length - 1));
      }
      if(currNum === "" && expression.length > 0){
        setExpression((prevExpression) => prevExpression.filter((_, i) => i !== prevExpression.length - 1))
        let s = expression.join("");
        setDisplay(s);
      }
    }else{
      setExpression(prevExpression => [...prevExpression, input]);
      setDisplay(prevDisplay => prevDisplay.concat(input))
    }
    
  }

  return (
    <div className="calculator__container">
      <Output result={result} />
      <input type="text" id="input-area" autoComplete="off" className="calculator-input" disabled value={display}/>
      <div className="buttons__container">
        <Button onClick={handleClick} cname="calculator__button-operator" label="+" value="+" />
        <Button onClick={handleClick} cname="calculator__button-operator" label="-" value="-" />
        <Button onClick={handleClick} cname="calculator__button-operator" label="*" value="*" />
        <Button onClick={handleClick} cname="calculator__button-operator" label="/" value="/" />
        <Button onClick={handleClick} cname="calculator__button-operator" label="(" value="(" />
        <Button onClick={handleClick} cname="calculator__button-operator" label=")" value=")" />
        <Button onClick={handleClick} cname="calculator__button-operator" label="^" value="^" />
        <Button onClick={handleClick} cname="calculator__button-operator" label="&#8730;" value="&#8730;" />
        <Button onClick={handleClick} cname="calculator__button-number" label="1" value="1" />
        <Button onClick={handleClick} cname="calculator__button-number" label="2" value="2" />
        <Button onClick={handleClick} cname="calculator__button-number" label="3" value="3" />
        <Button onClick={handleClick} cname="calculator__button-number" label="4" value="4" />
        <Button onClick={handleClick} cname="calculator__button-number" label="5" value="5" />
        <Button onClick={handleClick} cname="calculator__button-number" label="6" value="6" />
        <Button onClick={handleClick} cname="calculator__button-number" label="7" value="7" />
        <Button onClick={handleClick} cname="calculator__button-number" label="8" value="8" />
        <Button onClick={handleClick} cname="calculator__button-number" label="9" value="9" />
        <Button onClick={handleClick} cname="calculator__button-number" label="0" value="0" />
        <Button onClick={handleClick} label="." value="." />
        <Button onClick={handleNegPos} label="+/-" value="+/-" />
        <Button onClick={handleClick} label="&#x25c0;" value="backspace" />
        <Button onClick={handleClick} label="C" value="clear" />
        <Button onClick={handleCalculate} label="=" value="=" />
      </div>
    </div>
  );
}

export default App;
