import React from 'react';
import { logo } from '../../Assets';
import { MapPin, ShoppingCart } from 'lucide-react';
import Searchbar from './Searchbar.jsx';
import AccountOrders from './AccountOrders.jsx';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="h-[60%] bg-darkblue-1000 text-white">
      <nav className="flex h-full gap-2 p-1 px-3">
        <div className="flex rounded-sm items-center px-2 pt-3 hover:outline hover:outline-1">
          <img className="w-24" src={logo} alt="logoDark" />
        </div>
        <div className="flex min-w-fit rounded-sm flex pt-2 p-1 gap-1 hover:outline hover:outline-1">
          <MapPin size={20} className="self-center" />
          <div className="flex flex-col leading-3">
            <span className="text-lightText text-xs">{'Deliver to Jishan'}</span>
            <span className="font-semibold">{'Ghaziabad 201007'}</span>
          </div>
        </div>
        <Searchbar />
        <AccountOrders />

        <Link
          to={'/orders'}
          className="flex flex-col min-w-fit leading-3 justify-center rounded-sm hover:outline hover:outline-1 p-2"
        >
          <span className="text-lightText text-sm">Returns</span>
          <span className="font-semibold">& Orders</span>
        </Link>

        <Link
          to={'/cart'}
          className="flex min-w-fit leading-3 justify-center items-end rounded-sm hover:outline hover:outline-1 p-2"
        >
          <ShoppingCart size={30} />
          <span className="self-end font-semibold pb-1">Cart</span>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
