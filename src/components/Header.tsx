import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC<{}> = (props) => {
  return (
    <div>
      <div className="header">
        <Link to="/">
          <button >
            Home
          </button>
        </Link>
        <Link to="/practice-settings">
          <button>
            Practice
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;