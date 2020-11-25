import React from "react";

function Footer() {
  return <div style={{
    display: 'block',
    padding: '2px',
    height: '10%',
    width: '100%',
  }}>
    <div style={{
      backgroundColor: "#F8F8F8",
      borderTop: "1px solid #E7E7E7",
      textAlign: "center",
      padding: "2px",
      position: "fixed",
      left: "0",
      bottom: "0",
      height: "10%",
      width: "100%",
    }}>
      <img style={{ height: "100%", marginRight: "10%" }} src={process.env.PUBLIC_URL + "/pictures/covenant.png"} />
      <img style={{ height: "100%" }} src={process.env.PUBLIC_URL + "/pictures/irsm.png"} />
    </div>
  </div>
}

export default Footer;