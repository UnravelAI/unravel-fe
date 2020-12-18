import React from "react";
import StepsArrow from "../../../assets/imgs/StepsArrow.png";

export default function HowItWorks() {
  return(
    <div className="how-it-works">
    <div className="container">
      <div className="row title">
        <h2>How it works</h2>
      </div>
      <div className="arrow">
        <img src={StepsArrow} alt="Arrow" />
      </div>
      <div className="row">
        <div className="col-12  steps">
          <div className="step">
            <div className="icon">
              <i className="fas fa-cloud"></i>
            </div>
            <h6>Upload your video/podcast to our platform</h6>
          </div>
          <div className="step">
            <div className="icon">
              <i className="fas fa-layer-group"></i>
            </div>
            <h6>We process what you uploaded and turn it to a learnable material</h6>
          </div>
          <div className="step">
            <div className="icon">
              <i className="fas fa-share-alt"></i>
            </div>
            <h6>Now you’re ready to share your material with your students!</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}