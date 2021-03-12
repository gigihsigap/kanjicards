import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC<{}> = (props) => {
  return (
    <div>
      <div className="footer">
        <Link to="/about">
          <button>?</button>
        </Link>
      </div>
    </div>
  );
}

export default Footer;