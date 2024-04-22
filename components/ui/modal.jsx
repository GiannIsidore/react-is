import React from "react";
import ReactDOM from "react-dom";

export function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeButtonStyle} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  width: "50%", // Adjusted width from 80% to 50%
  height: "auto",
  padding: "20px",
  position: "relative",
  boxSizing: "border-box",
  boxShadow: "0 5px 15px rgba(0, 0, 0, .5)",
  textAlign: "center",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  background: "transparent",
  fontSize: "1.5em",
  cursor: "pointer",
};
