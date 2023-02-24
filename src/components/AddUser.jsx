import React, { useState} from 'react'; 
import Card from '../UI/Card';
import classes from './AddUser.module.css' ;
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

function AddUser() {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [errorModal, setErrorModal] = useState(null)

    function namedChangeHandler(event) {
        setName(event.target.value)
    }

    function ageChangeHandler(event) {
        setAge(event.target.value);
        console.log(age)
    }

    function addUserHandler(event) {
        event.preventDefault();
        //console.log(name, age);

        if (+age < 1) {
            setErrorModal({
                title: "Błędny wiek",
                msg: "Wiek musi myć > 0"
            });
        }

        setAge('');
        setName('');
    }

    const errorHandler = () => {
        setErrorModal(null)
    };

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
                <input id="age" type="Number" 
                        onChange={ageChangeHandler}
                        value={age}
                />

                <Button myType="submit"> Add user </Button>
            </form>
            </Card>
        </>
    );
}

export default AddUser;