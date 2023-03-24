import { Textfit } from "react-textfit";
import "./Screen.css";

export default function Screen() {
  return <Textfit className="screen" mode="single" max={70}></Textfit>;
}
