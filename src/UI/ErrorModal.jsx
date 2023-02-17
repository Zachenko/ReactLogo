import React from "react"
import Card from "./Card"
import Button from "./Button"

const ErrorModal = (props) => {

    return (
        <>
            <div>
                <Card>
                    <header>
                        <h2>{props.title}</h2>
                    </header>
                    <div>
                        <p>{props.msg}</p>
                    </div>
                    <footer>
                        <Button> O KI DOKI </Button>
                    </footer>
		        </Card>
            </div>
        </>
    )
}

export default ErrorModal