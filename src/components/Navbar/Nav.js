import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "./Nav.css"
export const Nav = () => {
  const Users = localStorage.getItem('Users');
  const navigate = useNavigate()
  const handlePageClick = (data) => {

    navigate(`/${data}`)
  }
  const handleLogout = () => {
    localStorage.setItem('Users', "")
    navigate("/Login", { replace: true })
  }
  return (
    <>
      <div className=' main class'>
        <div className='navbar'>
          <div className='navbar__title ' onClick={(() => handlePageClick(""))}>Hello</div>
          {!Users ? <div className='navbar__item ' onClick={(() => handlePageClick("SignUp"))}>SignUp</div> : ""}
          {!Users ? <div className='navbar__item' onClick={(() => handlePageClick("Login"))}>Login</div> :
            <div className='navbar__item' onClick={(() => handleLogout())}>Logout</div>}
          {/* <div className='navbar__item' onClick={(() => handlePageClick("Main"))}>Main</div> */}
          {/* <div className='navbar__item' onClick={(() => handlePageClick("Record"))}>Record</div> */}
          {/* <div className='navbar__item' onClick={(() => handlePageClick(""))}>Table</div> */}
        </div>
      </div>
    </>
  )
}
