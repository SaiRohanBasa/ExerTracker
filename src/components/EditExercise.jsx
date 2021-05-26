import {React,useEffect,useState} from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise(props){
    
    const [exercise,setExercise] = useState({
        username: "",
        description: "",
        duration: 0,
        date: new Date(),
        users: [],
        fetchExercise: false,
        fetchUser: false
      });

    useEffect(()=>{
        if(exercise.fetchExercise===false){
            axios.get("http://localhost:8080/exercises/"+props.match.params.id)
                .then(res => {
                    console.log(res.data);
                    setExercise(prevValue => ({
                        ...prevValue,
                        username: res.data.username,
                        description: res.data.description,
                        duration: res.data.duration,
                        date: new Date(res.data.date),
                        fetchExercise:true
                    }))
                })
            // console.log(props);
        }
        if(exercise.fetchUser===false){
            axios.get("http://localhost:8080/users")
                .then(res => {
                    if(res.data.length>0){
                        setExercise(prevValue => ({
                            ...prevValue,
                            users: res.data.map(user => user.username),
                            fetchUser: true
                        }))
                    }
                })
        }
        
    },[]);
    function handleChange(event){
        const {name,value} = event.target;

        setExercise(prevValue => ({
            ...prevValue,
            [name]:value
        }))
    }

    function handleDate(value){
        // const value = event.target.value;
        console.log(exercise.date);
        setExercise(prevValue => ({
            ...prevValue,
            date: value
        }));
    }

    function handleSubmit(event){
        event.preventDefault();
        const newExercise ={
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date,
            users: exercise.users
        }
        axios.post("http://localhost:8080/exercises/update/"+props.match.params.id,newExercise)
            .then(res => console.log(res.data));
        window.location="/";
    }


    
    return (
        <div className="container">
            <h3>Edit Exercise</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select name="username" className="form-control" value={exercise.username} onChange={handleChange}>{exercise.users.map((user)=>{
                        return <option>{user}</option>
                    })}</select>

                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input name="description" type="text" className="form-control" value={exercise.description} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input name="duration" type="text" className="form-control" value={exercise.duration} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker name="date" dateFormat='yyyy-MM-dd' selected={exercise.date} onChange={handleDate}/>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Edit exercise log</button>
                </div>

            </form>
        </div>
    );
}

export default EditExercise;