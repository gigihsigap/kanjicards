import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC<{}> = (props) => {
  return (
    <div>
      <div className="header">
        <Link to="/">
          <div className="logo">
            Kanji Cards
          </div>
        </Link>
        
        <Link to="/practice-settings">
          <button className="btn" id="practice">
            Practice!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;