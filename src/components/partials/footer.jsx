import React from "react";

function Footer() {
  return <div style={{
    display: 'block',
    padding: '2px',
    height: '10%',
    width: '100%',
  }}>
    <div className="row" style={{
      padding: 20,
      position: "fixed",
      left: 0,
      bottom: 0,
      right: 0
    }}>
      <div className="col-5">
        <img style={{  width: "100%", marginLeft: "5px", marginTop: "10%" }} src={process.env.PUBLIC_URL + "/pictures/rehab.png"} />
      </div>
      <div className="col-3">
      <img style={{ width: "100%", marginLeft: "20%" }} src={process.env.PUBLIC_URL + "/pictures/covenant.png"} />
      </div>
      <div className="col-1"></div>
      <div className="col-3">
        <img style={{ width: "80%", marginRight: "10px", marginTop: "10%"  }} src={process.env.PUBLIC_URL + "/pictures/irsm.png"} />
      </div>
    </div>
  </div>
}

export default Footer;