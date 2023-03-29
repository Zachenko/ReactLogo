import React, { useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css' ;
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import GettedMessage from '../UI/GettedMessage'

// https://zbreactlogofb-default-rtdb.firebaseio.com/

function AddUser() {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorModal, setErrorModal] = useState(null);
    const [messageData, setMessageData] = useState({});
    const [data, setData] = useState("")
    
    async function addUserHandler(event) {
        event.preventDefault();

        if (name.length < 3) {
            setErrorModal({
                title: "Błędny name",
                msg: "name musi myć >= 3"
            });
            return
        } else if (+age < 1) {
            setErrorModal({
                title: "Błędny wiek",
                msg: "Wiek musi myć > 0"
            });
            return

        } else if (password.length < 8) {
            setErrorModal({
                title: "Błędny password",
                msg: "password musi myć >= 10"
            });
            return

        }

        setMessageData({
            name: name,
            age: age,
            email: email,
            password: password
        })

        const message_obj = {
            message: messageData
        }

        const responce = await fetch('https://zbreactlogofb-default-rtdb.firebaseio.com/react_logowanie.json',
        {
            method: 'POST',
            body: JSON.stringify(messageData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setAge('');
        setName('');
        setEmail('');
        setPassword('');
    }

    const getDataHandler = useCallback(async () => {

        const responce = await fetch('https://zbreactlogofb-default-rtdb.firebaseio.com/react_logowanie.json');
        const fbData = await responce.json();
        const loadedData = [];

        for (const key in fbData) {
            loadedData.push({
                message: fbData[key]
            })
        }
        
        console.log(loadedData)
    });

    function namedChangeHandler(event) {
        setName(event.target.value)
    }

    function ageChangeHandler(event) {
        setAge(event.target.value);
    }

    function emailChangeHandler(event) {
        setEmail(event.target.value);
    }

    function passwordChangeHandler(event) {
        setPassword(event.target.value);
    }

    const errorHandler = () => {
        setErrorModal(null)
    };

    useEffect(() => {
        getDataHandler()
    }, [getDataHandler]);

    return (
        <>
            {errorModal && <ErrorModal title={errorModal.title} msg={errorModal.msg} removeError={errorHandler}/>}
            <Card className={classes.input}>
            <form onSubmit={addUserHandler} >
                <label htmlFor="username">Username</label>
                <input id="username" type="text"
                    onChange={namedChangeHandler} 
                    value={name}
                />

                <label htmlFor="age">Age</label>
                <input id="age" type="number" 
                    onChange={ageChangeHandler}
                    value={age}
                />

                <label htmlFor="email">Email</label>
                <input id="email" type="email" 
                    onChange={emailChangeHandler}
                    value={email}
                />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" 
                    onChange={passwordChangeHandler}
                    value={password}
                />

                <Button myType="submit"> Add user </Button>
                <Button myType="button" onClick={getDataHandler}> Get data </Button>
            </form>
            </Card>
            
        </>
    );
}

export default AddUser;