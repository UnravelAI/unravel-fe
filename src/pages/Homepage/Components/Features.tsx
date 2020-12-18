import React from "react";

export default function Features() {
  return(
    <div className="features">
    <div className="container">
      <div className="row title">
        <div className="col-12">
          <h2>Features</h2>
        </div>
      </div>
      <div className="row items">
        <div className="feature col-6">
          <div className="icon">
            <i className="fas fa-play"></i>
          </div>
          <div className="text">
            <p>Convert Speech from lectures/podcasts to readable text</p> 
          </div>
        </div>
        <div className="feature col-6">
          <div className="icon">
            <i className="fas fa-magic"></i>
          </div>
          <div className="text">
            <p>Recorded something you wish to remove? just remove the text and we’ll handle the rest</p> 
          </div>
        </div>
        <div className="feature col-6">
          <div className="icon">
            <i className="fas fa-chart-pie"></i>
          </div>
          <div className="text">
            <p>Share material with your students and track their progress using our analytics dashboard</p> 
          </div>
        </div>
        <div className="feature col-6">
          <div className="icon">
            <i className="fas fa-book"></i>
          </div>
          <div className="text">
            <p>Transform raw videos to fully fledged educational material</p> 
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}