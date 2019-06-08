import React from "react";
import "../css/Loading.css";

function Loading() {
  return (
    <div class="radar-spinner">
      <div class="circle">
        <div class="circle-inner-container">
          <div class="circle-inner" />
        </div>
      </div>

      <div class="circle">
        <div class="circle-inner-container">
          <div class="circle-inner" />
        </div>
      </div>

      <div class="circle">
        <div class="circle-inner-container">
          <div class="circle-inner" />
        </div>
      </div>

      <div class="circle">
        <div class="circle-inner-container">
          <div class="circle-inner" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
