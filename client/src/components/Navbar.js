import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {NavLink} from 'react-router-dom'



const Navbar = () => {

    const [userData, setUserData] = useState('')
    const [userExit, setUserExit] = useState(false)

    const loginloader = async () => {

        try{

            const res = await fetch('/getdata',{
                method: 'GET',
                headers: {
                   Accept: 'application/json',
                   "Content-Type":"application/json"
               },
               credentials : "include"
           })
           const data = await res.json()
           setUserData(data)
           console.log(data)
           setUserExit(true)
           if(!data){
               setUserExit(false)
           }
        }catch(error){
           console.log(error)
        }
    }

    useEffect(() => {
        loginloader()
    },[])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">Registration</NavLink>
                        </li>
                        {  userExit || userData ?
                        
                        <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout">Logout</NavLink>
                        </li>
                        </>
                        :
                        <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signin">Login</NavLink>
                        </li>
                        </>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
