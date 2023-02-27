import React, { useState, useEffect } from 'react'
import './app.css'

const url = 'https://api.github.com/users';

const App = () => {
    const [user, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const removeHandler = (id) => {
        const newData = user.filter(person => (
            person.id !=id
        ))
        setUsers(newData);
    }
    const getUsers = async() => {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setUsers(data);
    }       
    useEffect(() => {
        getUsers();
    },[])
    return (
    <>
        <form action="#">
                <input type="text" placeholder='search here' value={search} onChange={(e)=>setSearch(e.target.value)} /> 
            <button>search</button>    
        </form>        
        <div className='users'>
                {user
                    .filter(item =>( item.login.toLowerCase().includes(search.toLowerCase())))
                    .map(person => (
              <div key={person.id} className="user">
                <div className='profile'>
                    <img src={person.avatar_url} alt={person.login} />
                    <div className="profile_info">
                      <h4>{person.login}</h4>
                      <span>Profile</span>
                     </div>
                </div>
                            <div className='remove_btn'>
                                <a onClick={()=>removeHandler(person.id)}  href="#">Remove</a>
                            </div>            
          </div>
        ))}
    </div>
 </>
)

}

export default App
