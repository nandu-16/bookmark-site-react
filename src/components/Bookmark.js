import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Container, Row, Col, Modal, Alert } from 'react-bootstrap';
import Navbar from './Navbar'; // Ensure the correct path to Navbar

const Bookmark = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showError, setShowError] = useState(false);

  const itemsPerPage = 5;

  // Assuming you store the logged-in user's username in localStorage
  const username = localStorage.getItem('loggedInUser');

  useEffect(() => {
    if (username) {
      const savedBookmarks = JSON.parse(localStorage.getItem(`bookmarks_${username}`)) || [];
      setBookmarks(savedBookmarks);
    }
  }, [username]);

  const handleAddBookmark = () => {
    if (!title || !url) {
      alert('Please enter both title and URL.');
      return;
    }

    const newBookmark = {
      title,
      url,
      date: new Date().toLocaleString(),
    };

    let updatedBookmarks = [...bookmarks];

    if (editIndex !== null) {
      // Update the existing bookmark
      updatedBookmarks[editIndex] = newBookmark;
      setEditIndex(null);
    } else {
      if (updatedBookmarks.length >= 5) {
        setShowError(true); // Show the error alert
        return;
      }
      updatedBookmarks.push(newBookmark);
    }

    setBookmarks(updatedBookmarks);
    localStorage.setItem(`bookmarks_${username}`, JSON.stringify(updatedBookmarks));
    setTitle('');
    setUrl('');
    setShowError(false); // Hide the error alert if a bookmark is successfully added
  };

  const handleEditBookmark = (index) => {
    setEditIndex(index);
    setTitle(bookmarks[index].title);
    setUrl(bookmarks[index].url);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowModal(true);
  };

  const handleDeleteBookmark = () => {
    const updatedBookmarks = bookmarks.filter((_, i) => i !== deleteIndex);
    setBookmarks(updatedBookmarks);
    localStorage.setItem(`bookmarks_${username}`, JSON.stringify(updatedBookmarks));
    setShowModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginate = (array, pageNumber, itemsPerPage) => {
    return array.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
  };

  const paginatedBookmarks = paginate(bookmarks, currentPage, itemsPerPage);

  return (
    <Container>
      <Navbar />
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center">Manage Bookmarks</h2>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formUrl">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            {showError && (
              <Alert variant="danger" className="mt-3">
                You can only add up to 5 bookmarks.
              </Alert>
            )}

            <Button variant="primary" onClick={handleAddBookmark} className="mt-3 w-100">
              {editIndex !== null ? 'Update Bookmark' : 'Add Bookmark'}
            </Button>
          </Form>

          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookmarks.map((bookmark, index) => (
                <tr key={index}>
                  <td>{bookmark.title}</td>
                  <td><a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a></td>
                  <td>{bookmark.date}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEditBookmark((currentPage - 1) * itemsPerPage + index)} className="mx-1">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteClick((currentPage - 1) * itemsPerPage + index)} className="mx-1">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(bookmarks.length / itemsPerPage) }, (_, i) => (
              <Button key={i + 1} variant="light" onClick={() => handlePageChange(i + 1)} className="mx-1">
                {i + 1}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this bookmark?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteBookmark}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Bookmark;
