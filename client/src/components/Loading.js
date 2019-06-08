import React from "react";
import "../css/Loading.css";

function Loading() {
  return (
    <div className="radar-spinner">
      <div className="circle">
        <div className="circle-inner-container">
          <div className="circle-inner" />
        </div>
      </div>

      <div className="circle">
        <div className="circle-inner-container">
          <div className="circle-inner" />
        </div>
      </div>

      <div className="circle">
        <div className="circle-inner-container">
          <div className="circle-inner" />
        </div>
      </div>

      <div className="circle">
        <div className="circle-inner-container">
          <div className="circle-inner" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
