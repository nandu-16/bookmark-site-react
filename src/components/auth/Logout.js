import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <Container className="text-center mt-5">
      <h2>Are you sure you want to log out?</h2>
      <Button variant="danger" onClick={handleLogout} className="mx-2">
        Confirm Logout
      </Button>
      <Button variant="secondary" onClick={handleCancel} className="mx-2">
        Cancel
      </Button>
    </Container>
  );
}

export default Logout;
