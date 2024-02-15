import React from 'react';
import { logo } from '../../Assets';
import { MapPin } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="h-[60%] bg-darkblue-1000 text-white">
      <nav className="flex h-full gap-1 p-1 px-2">
        <div className="flex items-start p-3 hover:outline hover:outline-1">
          <img className="w-24" src={logo} alt="logoDark" />
        </div>
        <div className="flex pt-2 p-1 gap-1 hover:outline hover:outline-1">
          <MapPin size={20} className="self-center" />
          <div className="flex flex-col leading-3">
            <span className="text-lightText text-xs">{'Deliver to Jishan'}</span>
            <span className="font-semibold">{'Ghaziabad 201007'}</span>
          </div>
        </div>
        <div className="h-full hover:outline hover:outline-1"></div>
      </nav>
    </div>
  );
};

export default Navbar;
