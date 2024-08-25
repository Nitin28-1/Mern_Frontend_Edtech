import React, { useEffect, useState } from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { FiShoppingCart } from "react-icons/fi";
import ProfileDropDown from '../Core/Auth/ProfileDropdown'
import { categories } from '../../services/apis'
import {apiconnector} from "../../services/apiconnecter"
import { FaChevronDown } from "react-icons/fa";
import { ACCOUNT_TYPE } from '../../utils/constants'




const Navbar = () => {

   const {token} = useSelector((state) => state.auth);
   const {user} = useSelector((state) => state.profile);
   const {totalItems} = useSelector((state) => state.cart);
   const [subLinks,setSubLinks]=useState([]);
   const [loading, setLoading] = useState(false)


    useEffect(()=>
    {
      ;(async () => {
        setLoading(true)
        try {
          const res = await apiconnector("GET", categories.CATEGORIES_API)
          setSubLinks(res.data.data)
         console.log(res.data.data)
        } catch (error) {
          console.log("Could not fetch Categories.", error)
        }
        setLoading(false)
      })()
    },[])


    const location=useLocation();
    const matchroute=(route)=>
    {
    return matchPath({path:route},location.pathname)
    }



  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >

     <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

    <Link to={"/"}>
    <img src={Logo} alt="" className='w-[60px] h-[45px]' />
    </Link>

    {/* Nav Links */}
    <nav className='hidden lg:block '>

       <ul className='flex gap-x-6 text-richblack-25'>
       {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchroute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length 
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                
                                
                                  <p className="text-center">{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchroute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
       </ul>


    </nav>

    {/* Lgin SignUp Dashboard */}

    <div className='flex gap-x-4 items-center'>

      {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

{
  token === null && (
    <Link to={"Login"}>
      <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
        Login
      </button>
    </Link>
  )
}

{
  token === null && (
    <Link to={"SignUp"}>
      <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
        SignUp
      </button>
    </Link>
  )
}

{token !== null && <ProfileDropDown/> }

    </div>

        
     </div>

     <button className="mr-8 mx-4  md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>

    </div>
  )
}

export default Navbar