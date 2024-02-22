import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ scrollTop }) => {
  return (
    <div className="text-white">
      <div className="flex flex-col">
        <button className="bg-amazon_lighter hover:opacity-90 text-sm p-3" onClick={scrollTop}>
          Back to top
        </button>
      </div>
      <div className="grid grid-cols-4 bg-amazon_light">
        <div>
          <div>
            <ul className="flex flex-col gap-2">
              <h3>Get to Know Us</h3>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <ul className="flex flex-col gap-2">
              <h3>Make Money with Us</h3>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <ul className="flex flex-col gap-2">
              <h3>Amazon Payment Products</h3>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <ul className="flex flex-col gap-2">
              <h3>Let Us Help You</h3>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
