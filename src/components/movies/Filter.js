import React, {useRef} from 'react'
import {Form} from 'react-bootstrap'
function Filter(props) {

    let nameRef = useRef();
    // we are referring to input to change the value
   const changeButton = () => {
            props.onChange(nameRef.current.value);
    };
    return (
        <div>
            <Form className="m-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select ref={nameRef} onChange={()=> changeButton()} aria-label="Default select example">
                        <option value="">Filter by rating</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                        <option value="6">6+</option>
                        <option value="7">7+</option>
                        <option value="8">8+</option>
                        <option value="9">9+</option>
                    </Form.Select>
                </Form.Group>
            </Form> 
        </div>
    )
}

export default Filter
