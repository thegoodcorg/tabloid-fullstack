import React from "react";

export default function Hello() {
  return (
    <div className="d-flex justify-content-center">
      <span
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: "50%",
          marginTop: "-0.5rem",
          textAlign: "center",
        }}
      >
        <strong>hello</strong>
      </span>
      <img
        style={{ width: "75%" }}
        src="https://fox2now.com/wp-content/uploads/sites/14/2020/01/gettyimages-157204335.jpg"
      ></img>
    </div>
  );
} 
