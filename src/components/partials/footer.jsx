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
      <img style={{ height: 50, width: 500, marginTop: 30, marginLeft: 5 }} src={process.env.PUBLIC_URL + "/pictures/rehab.png"} />
      <img style={{ height: 100, width: 233, marginTop: 10, marginLeft: 20 }} src={process.env.PUBLIC_URL + "/pictures/covenant.png"} />
      <img style={{ height: 100, width: 300, marginTop: 10, marginLeft: 20 }} src={process.env.PUBLIC_URL + "/pictures/irsm.png"} />
    </div>
  </div>
}

export default Footer;