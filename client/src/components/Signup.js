import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

const Signup = () => {
    
    let  history = useHistory();
    const [user, setUser] = useState({
        name:"", email:"", phone:"", work:"", password:"", cpassword:""
    })
    
    let name,value
    const changeHandler = (e) =>{
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const {name, email, phone, work, password, cpassword} = user;
        const res = await fetch("/register",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();
        if(data.status === 422 || !data){
            window.alert('Invalid Registration')
            console.log('Invalid Registration')
        }
        else{
            window.alert('Registered Successfully')
            history.push('/signin')
        }
    }
    return (
        <div className="container">
            <br/>
            <br/>
             <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm">
                    <form method="POST" > 
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" 
                             name="name"  
                             onChange={changeHandler}
                             value={user.name} 
                             placeholder="Enter Name"/>
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="text" className="form-control" 
                             name="email"  
                             onChange={changeHandler}
                             value={user.email} 
                             placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label>Phone No</label>
                            <input type="Number" className="form-control" 
                             name="phone"  
                             onChange={changeHandler}
                             value={user.phone} 
                             placeholder="Enter Ph Number"/>
                        </div>
                        <div className="form-group">
                            <label>Work</label>
                            <input type="text" className="form-control" 
                             name="work"  
                             onChange={changeHandler}
                             value={user.work} 
                             placeholder="Enter Work"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" 
                             name="password"  
                             onChange={changeHandler}
                             value={user.password} 
                             placeholder="Enter Password"/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" 
                             name="cpassword" 
                             onChange={changeHandler}
                             value={user.cpassword} 
                             placeholder="Enter Confirm Password"/>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary" onClick={submitHandler}>Submit</button>
                    </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
    )
}

export default Signup
