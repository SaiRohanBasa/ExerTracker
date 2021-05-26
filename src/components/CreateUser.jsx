import React, { useState } from 'react';
import axios from "axios";

function CreateUser(){
    const [user,setUser] = useState({
        username: ""
    });

    function handleChange(event){
        const value=event.target.value;
        setUser({
            username:value
        });
    }

    function onSubmit(event){
        event.preventDefault();
        const newUser={
            username:user.username
        };
        axios.post("http://localhost:8080/users/add",newUser)
            .then(res => window.confirm("User created"))
            .catch(err => window.confirm("Username already exists"));
    }

    return (
        <div className="container">
            <h3>Create new User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" className="form-control" value={user.username} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Create User</button>
            </form>
        </div>
    );
}

export default CreateUser;