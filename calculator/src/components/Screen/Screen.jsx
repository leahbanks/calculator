import { Textfit } from "react-textfit";
import "./Screen.css";

export default function Screen ({ value }) {
  return (
    <Textfit className="screen" mode="single" max={70}>
      {value}
    </Textfit>
  );
};