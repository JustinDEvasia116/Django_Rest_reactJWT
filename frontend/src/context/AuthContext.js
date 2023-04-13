import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import {  useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

  
  let [authTokens, setAuthTokens] = useState( ()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null  );
  let [user, setUser] = useState( ()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null);
  let [loading,setLoading] = useState(true)
  
    const Navigate = useNavigate()


  let loginUser = async (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: e.target.username.value , password: e.target.password.value })
      });

      let data = await response.json()
      console.log('data: ',data)
      console.log('response: ',response)
      if (response.ok) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            Navigate('/')
      } else {
        // Handle failed login
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  }

  let logoutUser=()=>{
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    Navigate('/login')

  }

  let updateToken = async ()=>{
    console.log('update token called')
    
    try {
        
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'refresh': authTokens?.refresh})
        });
        let data = await response.json()
        if (response.ok) {
          console.log(authTokens);
            setAuthTokens(() => data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            console.log(authTokens)
            } 
        else {
          logoutUser()
        }
      
      if (loading){
        setLoading(false)
      }
  
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
 




  }

  let contextData = {
    user: user,
    authTokens:authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser
  }

  useLayoutEffect(()=>{
       if(loading){
        updateToken()
       }
       let fourMinutes = 1000* 60 *4
       let interval = setInterval(()=>{
            if (authTokens){
                updateToken()
            }
        },fourMinutes)
        return () =>{

           clearInterval(interval)
        }

  },[authTokens,loading])


  return (
    <AuthContext.Provider value={contextData}>
      {loading?null: children}
    </AuthContext.Provider>
  );
}
