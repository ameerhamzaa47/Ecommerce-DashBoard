import React,{useEffect, version} from 'react'
import {useNavigate} from 'react-router-dom'

function Protected(props) {
    let navigate=useNavigate()
    let Cmp=props.cmp
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
          navigate('/register')
        }
      }, [])

  return (
    <div>
        <Cmp/>
    </div>
  )
}

export default Protected 
