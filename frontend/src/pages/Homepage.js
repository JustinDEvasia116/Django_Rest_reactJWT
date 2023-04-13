import React, { useEffect, useState,useContext } from 'react'
import { json } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


function Homepage() {

  let [notes,setNotes]= useState([])
  let {authTokens,logoutUser} = useContext(AuthContext)

  useEffect(() => {
    // Use getNotes here as a callback function
    getNotes();
  }, []);


  let getNotes=async()=>{
      let response = await fetch('http://127.0.0.1:8000/api/notes/',{
      method :'GET',
      headers :{
                'Content-type':'application/json',
                'Authorization': 'Bearer '+ String(authTokens.access)
      }
      })
      let data = await response.json()

      if (response.ok){
        setNotes(data)
      }
      else if(response.statusText==='Unauthorized'){
        logoutUser()
      }
      


  }

  return (
    <div >
      <p>This is  Homepage</p>

      <ul>
        {notes.map(note =>(
            <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </div>
  )
}
export default Homepage