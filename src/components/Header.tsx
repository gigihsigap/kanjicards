import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC<{}> = (props) => {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: "center"}}>
        <Link to="/">
          <button className="header-btn">
            Home
          </button>
        </Link>
        <Link to="/about">
          <button className="header-btn">
            About
          </button>
        </Link>
        <Link to="/training">
          <button className="header-btn">
            Practice
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Footer;