import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

const Signin = () => {
    
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async (e) => {

            e.preventDefault()
            const res = await fetch("/signin",{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify({email,password})
            })
            const data = await res.json()
            if(data.status === 400 || !data){
               window.alert("Invalid Credentials")
               console.log("Invalid Credentials")
           }
            else{
            window.alert("User Login Successfully")
            console.log("User Login Successfully")
            history.push('/')
          }
    }
    
    return (
        <div>
            <div className="container">
            <br/>
            <br/>
             <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm">
                    <form method='POST'>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="text" className="form-control"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             name="email"  
                             placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             name="password"  
                             placeholder="Enter Password"/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" className="form-submit"
                             name="signin"  onClick={loginHandler}
                             />
                        </div>
                    </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
        </div>
    )
}

export default Signin
