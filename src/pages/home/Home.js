import { Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup';
import { firestore } from '../../firebase';
import { useHistory } from 'react-router';

function RegistrationModal(props) {
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [gender,setGender] = useState('');
    const [loading,setLoading] = useState();
    const history = useHistory();
    const onSubmit=(e)=>{
        setLoading(true);
        e.preventDefault();
        firestore.collection('users').add( {name,gender,age}).then(res=>{
            setLoading(false);
            localStorage.setItem('user',JSON.stringify({name,gender,age,id:res.id}));
                    history.push('/lets-start');
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })
    }
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h5 className="text-center mb-2">Let's get started complete the form below</h5>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        disabled={loading}
                         required 
                         placeholder="Enter your name" />
                       
                    </Form.Group>
                    <Form.Group controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                        value={age}
                        onChange={(e)=>setAge(e.target.value)}
                        disabled={loading}
                         required type="number" placeholder="Enter your age" />

                    </Form.Group>
                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>

                        <Form.Control 
                        value={gender}
                        onChange={(e)=>setGender(e.target.value)}
                        disabled={loading}
                         required as="select" custom>
                            <option value=''>Select a gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </Form.Control>

                    </Form.Group>

                    <Button className="w-100 mt-0" disabled={loading}  variant="primary" type="submit">
                    {loading ? 'Processing...' : 'Start your journey'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


function Home() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div class="home-container">
            <img src={require('../../assets/images/logo.png').default} alt="" />
            <p className="mb-4">Financial Education for the Youth <br />This game teaches young adults about the importance of financial literacy and how it plays a role in your life.</p>
            <p className="mb-4"> The objective is to have the highest net worth at the end of the game. </p>

            <Button onClick={() => setModalShow(true)}>
                Let's go
            </Button>

            <RegistrationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

        </div>
    )
}

export default Home
