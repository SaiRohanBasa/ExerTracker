import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ExercisesList(){
    const [exList,setexList]=useState({
        users:[],
        fetch:false
    });

    useEffect(()=>{
        if(exList.fetch===true){
            return;
        }
        axios.get("http://localhost:8080/exercises")
            .then(res => {
                if(res.data.length>0){
                    setexList({
                        users: res.data,
                        fetch:true
                    })
                }
            });
    })

    function deleteExercise(id){
        axios.delete("http://localhost:8080/exercises/"+id)
            .then(res => {console.log(res.data)});
        setexList(prevValue => ({
            users: prevValue.users.filter(user => user._id!==id),
            fetch:true
        }))
    }

    function exerciseList(){
        return (
            <tbody>
                {exList.users.map(user => {
                    return (
                        <tr>
                            <td>{user.username}</td>
                            <td>{user.description}</td>
                            <td>{user.duration}</td>
                            <td>{user.date.substring(0,10)}</td>
                            <td>
                                <Link to={"/edit/"+user._id}>edit</Link> | <a href="#" onClick={()=>{deleteExercise(user._id)}}>delete</a>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    return (
        <div className="container">
            <h3>Logged Exercises</h3>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {exerciseList()}
            </table>
        </div>
    );
}

export default ExercisesList;