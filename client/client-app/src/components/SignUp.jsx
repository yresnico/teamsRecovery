import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./SignUp.css";

function SignUp () {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const navigate = useNavigate();

  function handleSubmit (e) {
    // POST request 
    navigate("/orders");
  }

  function handleUsername (e) {
    const usernameInput = e.target.value;
    const regex = /^[A-za-z0-9]{7,}$/;

    if (!regex.test(usernameInput)) {
      setUsernameError("Username must be 7 alphanumeric characters long.");
    } else {
      setUsernameError("");
      setUsername(usernameInput);
    }
  }

  function handleEmail (e) {
    const emailInput = e.target.value;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!regex.test(emailInput)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      setEmail(emailInput);
    }
  }

  function handlePassword (e) {
    const passwordInput = e.target.value;
    const regex = /^(?=.*[0-9a-zA-Z])(?=.*[!@-]).{4,32}$/;

    if (!regex.test(passwordInput)) {
      setPasswordError("Password must be at least 4 characters, and contain one of the following special characters: ! - @");
    } else {
      setPasswordError("");
      setPassword(passwordInput);
    }
  }

  function handleConfirmPassword (e) {
    const confirmPasswordInput = e.target.value;

    if (password !== confirmPasswordInput) {
      setConfirmError("Password entered does not match.");
    } else {
      setConfirmError("");
    }
  }

  return (
    <Form className='form' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" onChange={handleUsername} />
        <p>{usernameError}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <p>{emailError}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
        <p>{passwordError}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handleConfirmPassword} />
        <p>{confirmError}</p>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignUp;