import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

import logo from "../IT.png";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Applications', href: '/applications', current: location.pathname === '/applications' },
    { name: 'Add Job', href: '/add-job', current: location.pathname === '/add-job' },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      style={{ backgroundColor: '#242424' }} // Set the background color here
    >      
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex items-center justify-center sm:items-left sm:justify-start sm:ml-4">
          <Link to="/" className="flex items-center justify-center sm:justify-start">
            <img src={logo} alt="Logo" className="h-14 w-auto sm:h-14 mr-9" />
            <p className="sm:font-bold sm:text-inherit sm:ml-2 hidden md:block">Intern Application Tracker</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navigation.map((item) => (
          <NavbarItem key={item.name} isActive={item.current} className="hover:bg-gray-600/50 p-2 rounded-md">
            <Link to={item.href} onClick={closeMenu} className={item.current ? 'text-violet-500' : ''} >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      
      <NavbarMenu style={{ background: 'inherit' }} open={isMenuOpen}>
        <div className="flex items-center justify-center h-full flex-col">
          {navigation.map((item) => (
            <NavbarMenuItem className={`text-3xl py-4 ${item.current ? 'text-violet-500' : ''}`} key={item.name} isActive={item.current} onClick={closeMenu}>
              <Link to={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>

    </Navbar>
  );
}
