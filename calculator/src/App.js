import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import Button from "./components/Button/Button";
import './App.css'

const buttonValues = [
    ["AC", "+-", "%", "÷"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];
export default function App() {

    return (
        <Wrapper>
          <Screen/>
          <ButtonContainer>
            {buttonValues.flat().map((button, index) => {
              return (
                <Button
                  key={index}
                  className={button === "=" ? "equals" : ""}
                  value={button}
                />
              );
            })}
          </ButtonContainer>
        </Wrapper>
      );
    };
    
