import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ scrollTop }) => {
  const cols = [
    {
      id: 1,
      heading: 'Get to Know Us',
      links: [
        { linkName: 'Careers', href: '#' },
        { linkName: 'Blog', href: '#' },
        { linkName: 'About Amazon', href: '#' },
        { linkName: 'Investor Relations', href: '#' },
        { linkName: 'Amazon Devices', href: '#' },
        { linkName: 'Amazon Science', href: '#' },
      ],
    },
    {
      id: 2,
      heading: 'Make Money with Us',
      links: [
        { linkName: 'Sell products on Amazon', href: '#' },
        { linkName: 'Sell on Amazon Business', href: '#' },
        { linkName: 'Sell apps on Amazon', href: '#' },
        { linkName: 'Become an Affiliate', href: '#' },
        { linkName: 'Advertise Your Products', href: '#' },
        { linkName: 'Self-Publish with Us', href: '#' },
        { linkName: 'Host an Amazon Hub', href: '#' },
        { linkName: 'See More Make Money with Us', href: '#' },
      ],
    },
    {
      id: 3,
      heading: 'Amazon Payment Products',
      links: [
        { linkName: 'Amazon Business Card', href: '#' },
        { linkName: 'Shop with Points', href: '#' },
        { linkName: 'Reload Your Balance', href: '#' },
        { linkName: 'Amazon Currency Converter', href: '#' },
      ],
    },
    {
      id: 4,
      heading: 'Let Us Help You',
      links: [
        { linkName: 'Amazon and COVID-19', href: '#' },
        { linkName: 'Your Account', href: '#' },
        { linkName: 'Your Orders', href: '#' },
        { linkName: 'Shipping Rates & Policies', href: '#' },
        { linkName: 'Returns & Replacements', href: '#' },
        { linkName: 'Manage Your Content and Devices', href: '#' },
        { linkName: 'Amazon Assistant', href: '#' },
        { linkName: 'Help', href: '#' },
      ],
    },
  ];

  return (
    <div className="text-white">
      <div className="flex flex-col">
        <button className="bg-amazon_lighter hover:opacity-90 text-sm p-3" onClick={scrollTop}>
          Back to top
        </button>
      </div>
      <div className="md:w-2/3 w-full p-3 mx-auto flex gap-8 flex-wrap bg-amazon_light">
        {cols.map(({ links, heading, id }) => {
          return (
            <div className="p-3" key={id}>
              <ul className="flex flex-col gap-2">
                <h3 className="font-semibold text-lg">{heading}</h3>
                {links.map(({ linkName, href }) => (
                  <li key={`${id}${href}`}>
                    <Link className="text-sm hover:underline" to={href}>
                      {linkName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* <div></div> */}
      </div>
    </div>
  );
};

export default Footer;
