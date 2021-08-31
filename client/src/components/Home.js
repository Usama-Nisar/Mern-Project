import React,{useState,useEffect} from 'react'

const Home = () => {
       
    const [data, setData] = useState('')
    const [show, setShow] = useState(false)

    const loadData = async () => {
        try{
            const res = await fetch('/getdata',{
                method: 'GET',
                headers:{
                    'Content-Type' : 'application/json'
                }
            })
            const data = await res.json();
            setData(data)
            setShow(true)
        }catch(err){
            console.log(err)
        }
        
    }

    useEffect(() => {
        loadData()
    },[])

    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="jumbotron jumbotron-fluid">
            <div className="container text-center">
               <h1 className="display-3 ">Wellcome  to Mern  Project</h1> 
               <h1 className="display-3 ">{data.name}</h1>
               <h1 className="display-3">{show ? 'Happy, to see you back' : 'We are Mern Developer'}</h1>
            </div>
        </div>
      </>
    )
}

export default Home
