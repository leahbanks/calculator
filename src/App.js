import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import Button from "./components/Button/Button";
import './App.css'
import { useState } from "react";

const buttonValues = [
    ["AC", "+-", "%", "÷"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

const toLocaleString = (number) =>
  String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (number) => number.toString().replace(/\s/g, "");

const math = (a, b, symbol) =>
  symbol === "+" ? a + b : symbol === "-" ? a - b : symbol === "X" ? a * b : a / b;

const zeroDivisionError = "Can't divide with 0";

export default function App () {
  let [calc, setCalc] = useState({
    symbol: "",
    number: 0,
    result: 0,
  });

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.number).length < 16) {
      setCalc({
        ...calc,
        number:
        !calc.number.toString().includes(".") && removeSpaces(calc.number) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.number + value)))
            : toLocaleString(calc.number + value),
        result: !calc.symbol ? 0 : calc.result,
      });
    }
  };

  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.number.toString().includes(".") ? calc.number + value : calc.number,
    });
  };

  const symbolClickHandler = (e) => {
    setCalc({
      ...calc,
      symbol: e.target.innerHTML,
      result: !calc.number
        ? calc.result
        : !calc.result
        ? calc.number
        : toLocaleString(
            math(
              Number(removeSpaces(calc.result)),
              Number(removeSpaces(calc.number)),
              calc.sign
            )
          ),
      number: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.symbol && calc.number) {
      setCalc({
        ...calc,
        result:
          calc.number === "0" && calc.symbol === "÷"
            ? zeroDivisionError
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.result)),
                  Number(removeSpaces(calc.number)),
                  calc.symbol
                )
              ),
        symbol: "",
        number: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.number ? toLocaleString(removeSpaces(calc.number) * -1) : 0,
      res: calc.result ? toLocaleString(removeSpaces(calc.result) * -1) : 0,
      symbol: "",
    });
  };

  const percentClickHandler = () => {
    let number = calc.number ? parseFloat(removeSpaces(calc.number)) : 0;
    let result = calc.result ? parseFloat(removeSpaces(calc.result)) : 0;
    setCalc({
      ...calc,
      number: (number /= Math.pow(100, 1)),
      result: (result /= Math.pow(100, 1)),
      symbol: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      symbol: "",
      number: 0,
      result: 0,
    });
  };

  const handleButtonClick = (event, button) => {
    button === "AC" || calc.result === zeroDivisionError
    ? resetClickHandler()
    : button === "+-"
    ? invertClickHandler()
    : button === "%"
    ? percentClickHandler()
    : button === "="
    ? equalsClickHandler()
    : button === "÷" || button === "X" || button === "-" || button === "+"
    ? symbolClickHandler(event)
    : button === "."
    ? decimalClickHandler(event)
    : numberClickHandler(event)
  }

  return (
    <Wrapper>
      <Screen value={calc.number ? calc.number : calc.result} />
      <ButtonContainer>
        {buttonValues.flat().map((button, index) => {
          return (
            <Button
              key={index}
              className={button === "=" ? "equals" : ""}
              value={button}
              onClick={(event) => handleButtonClick(event, button)}
            />
          );
        })}
      </ButtonContainer>
    </Wrapper>
  );
};
    
