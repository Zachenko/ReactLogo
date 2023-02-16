import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";

function AddUser() {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    function namedChangeHandler(event) {
        setName(event.target.value);
        //console.dir(name)
    }

    function ageChangeHandler(event) {
        setAge(event.target.value);
        //  console.dir(age)
    }

    function addUserHandler(event) {
        event.preventDefault();
        console.dir(`${name} ${age}`)
        setName('')
        setAge('')
    }
    
    return (
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text"
                    onChange={namedChangeHandler}
                    value={name}
                /><br/><br/>

                <label htmlFor="age">Age</label>
                <input id="age" type="number"
                    onChange={ageChangeHandler}
                    value={age}
                />

                <Button myType="submit">Add user</Button>
            </form>
        </Card>
    )
}

export default AddUser;