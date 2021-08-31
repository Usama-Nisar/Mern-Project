import React, { useEffect, useState } from 'react'

const Contact = () => {

    const [userData, setUserData] = useState({ name: '', email: '', phone: '', message: '' })


    // Get contact us Data
    const contactUsPage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json()
            console.log(data)
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone })
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        contactUsPage()
    }, []);

    const changeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserData({ ...userData, [name]: value })
    }


    // Send message Data
    const submitHandler = async (e) => {
        e.preventDefault()
        const { name, email, phone, message } = userData
        const res = await fetch('/contact', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        })

        const data = res.json()
        if (!data) {
            console.log("Message Error")
        } else {
            window.alert('Message send successfully')
            console.log('Message send successfully')
            setUserData({ ...userData, message: '' })
        }
    }

    return (
        <div className="container-fluid">
            <br/>
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
                                value={userData.name}
                                placeholder="Enter Name" />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="text" className="form-control"
                                name="email"
                                onChange={changeHandler}
                                value={userData.email}
                                placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Phone No</label>
                            <input type="Number" className="form-control"
                                name="phone"
                                onChange={changeHandler}
                                value={userData.phone}
                                placeholder="Enter Ph Number" />
                        </div>
                        <div className="form-group">
                            <label >Textarea</label>
                            <textarea className="form-control"
                                name="message"
                                onChange={changeHandler}
                                value={userData.message}
                            >
                            </textarea>
                        </div>
                        <br />
                        <button type="submit" onClick={submitHandler} className="btn btn-primary" >Submit</button>
                    </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
    )

}

export default Contact
