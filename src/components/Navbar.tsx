import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { GrUserAdmin } from 'react-icons/gr';
import LOGO from '../assets/logo.png';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  function toggleMenu() {
    setNav(!nav);
  }

  return (
    <div className="w-full h-25 rounded shadow-xl bg-blue-600 p-4 z-[100]">
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <img src={LOGO} width={80}></img>
        <div>
          <ul className="hidden md:flex">
            <Link to="/products" className="hover:bg-blue-700 p-2 rounded">
              <MdOutlineAddShoppingCart size={60} color={'white'} />
            </Link>
            <Link to="/admin" className="hover:bg-blue-700 p-2 rounded">
              <GrUserAdmin size={35} color={'white'} />
            </Link>
            <Link
              to="/admin"
              className="flex items-center text-xl shadow-xl rounded-xl m-1 hover:scale-[90%] md:hover:scale-[110%]"
            ></Link>
          </ul>
          <div className="md:hidden text-white cursor-pointer focus:outline-none">
            <AiOutlineMenu size={25} onClick={toggleMenu} />
          </div>

          {
            //HIDDEN NAVBAR
          }
          <div
            className={
              nav
                ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70'
                : ''
            }
          >
            <div
              className={
                nav
                  ? 'fixed left-0 top-0 w-[45%] sm:w-[45%] md:w-[15%] h-screen bg-blue-600 p-10 ease-in duration-500'
                  : 'fixed left-[-100] hidden'
              }
            >
              <div>
                <div className="flex w-full items-center justify-between">
                  <img src={LOGO} width={80}></img>
                  <div className="rounded-full shadow-3xl shadow-black p-3 cursor-pointer">
                    <AiOutlineClose size={25} onClick={toggleMenu} />
                  </div>
                </div>
              </div>
              <div className="py-4 flex items-center">
                <ul className="lg:flex lg:space-x-8 lg:mt-0 lg:ml-auto text-white">
                  <li className="hover:bg-blue-700 p-2 rounded">
                    <Link onClick={toggleMenu} to="/products">
                      PRODUCTS
                    </Link>
                  </li>

                  <li className="hover:bg-blue-700 p-2 rounded">
                    <Link onClick={toggleMenu} to="/admin">
                      ADMIN PAGE
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
