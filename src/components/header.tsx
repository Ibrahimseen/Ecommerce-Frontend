import { useState } from "react"
import { FaSearch, FaShoppingBag,  FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"


const user = {_id : "maHn" , role : ""}

const Header = () => {
    const [Isopen, setIsopen] = useState<boolean>(false)


    const LogoutHandler = () => {
       setIsopen(false) 
    }
  return (
    <nav className="header">
        <Link onClick={()=>setIsopen(false)} to={"/"} style={{fontWeight:"500"}}>HOME</Link>
        <Link onClick={()=>setIsopen(false)} to={"/Search"}> <FaSearch/>  </Link>
        <Link onClick={()=>setIsopen(false)} to={"/cart"}> <FaShoppingBag/>  </Link>

     {
     user?._id?(
        <>
        <button onClick={()=> setIsopen((prev) => !prev)}>
            <FaUser/>
        </button>
        <dialog open={Isopen}>
            <div>
                {
                   user.role === "admin"  && (
                    <Link onClick={()=>setIsopen(false)} to={"/admin/dashboard"}> Admin</Link>
                   )}
                   <Link onClick={()=>setIsopen(false)} to={"/orders"}>Orders </Link>
                   <button onClick={LogoutHandler}>
                    <FaSignOutAlt />
                   </button>
            </div>

        </dialog>
        </> 
            ):
            <Link to={"/login"}> 
            <FaSignInAlt/>
            </Link>
     }
    </nav>

    )
}

export default Header