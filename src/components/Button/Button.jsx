import "./Button.css";

export default function Button ({ className, value, onClick}) {
    return (
      <button className={className} onClick={onClick} value={value} >
       {value}
      </button>
    );
  };