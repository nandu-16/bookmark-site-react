import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.some(user => user.username === username);
    if (userExists) {
      setError('Username already exists.');
      return;
    }

    const newUser = { username, password };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    setSuccess('User registered successfully!');
    setError('');

    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Sign Up</h2>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign Up
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>Already have an account? <Link to="/login">Log in here</Link></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
