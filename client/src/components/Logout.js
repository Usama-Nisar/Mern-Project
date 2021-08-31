import React,{useEffect} from 'react'
import { useHistory } from 'react-router-dom';

function Logout() {
    
    const history = useHistory()
    useEffect(() => { 
        fetch('/logout',{
            method: 'GET',
            headers:{
                Accept: 'application/json',
                "Content-Type":"application/json"
            },
            credentials : "include"
        }).then((res)=>{
             history.push('/signin', {replace: true})
             if(res !== 200){
                 const error = new Error('Logout Error')
                 throw error
             }
        }).catch((err)=>{
              console.log(err)
        })
    },[])
    return (
        <>
         <h1>Logout Page</h1>   
        </>
    )
}

export default Logout
