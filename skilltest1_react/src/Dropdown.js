import { useState } from "react";
import "./dropdown.css";

function Dropdown({ items, width, fontSize }) {
  const dim = { width, fontSize };
  const [visible, setVisible] = useState(false); // State which toggles dropdown list on hover
  const [select, setSelect] = useState("SELECT"); // State which displays selected dropdown option on the main display block
  // function to handle option select
  function handleClick(item) {
    setSelect(item);
    setVisible(false);
  }
  return (
    <div className="container" style={dim}>
      <div
        onMouseEnter={() => {
          setVisible(true);
        }}
        className="select-window"
      >
        {select}
        <img
          alt="down icon"
          src="https://toppng.com/uploads/preview/arrow-down-icon-11549436707mosicxsqad.png"
          className="icon"
        />
        {/* input value which can be further passed on to the form based on the drowdown selection */}
        <input value={select} type="hidden" />
      </div>
      {visible ? (
        <div className="items-display">
          <ul className="item-list">
            {items.map((item, idx) => (
              <li
                className="item"
                onClick={() => {
                  handleClick(item);
                }}
                key={idx}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Dropdown;
