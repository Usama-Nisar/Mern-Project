import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const About = () => {

    const [userData, setUserData] = useState('')
    const history = useHistory()
    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json()
            console.log(data)
            setUserData(data)
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (err) {
            console.log(err)
            history.push('/signin')
        }

    }

    useEffect(() => {
        callAboutPage()
    }, []);

    return (
            <div className="container">
                <br/>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card bg-info text-white text-center">
                            <div className="card-body">{userData.name}</div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card bg-info text-white text-center">
                            <div className="card-body">{userData.email}</div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card bg-info text-white text-center">
                            <div className="card-body">{userData.phone}</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default About
