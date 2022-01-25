import { nanoid } from 'nanoid';
import { useState, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import SocketContext from '../contexts/index';

const UserModal = () => {
  const isLoggedOut = localStorage.getItem('username') === null;

  const [show, setShow] = useState(isLoggedOut);
  const [isInvalid, setIsInvalid] = useState(false);
  const [username, setUsername] = useState('');

  const socket = useContext(SocketContext);

  const validateUsername = (usrname) => {
    const len = usrname.length;
    return len > 0 && len < 32;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(validateUsername(username)) {
      setIsInvalid(false);
      const newUser = {
        userId: nanoid(),
        username,
      };
  
      localStorage.setItem('userId', newUser.userId);
      localStorage.setItem('username', newUser.username);
  
      socket.emit('user:add', newUser);
      socket.emit('handshake', newUser);
      setShow(false);
    } else {
      setIsInvalid(true);
    }

  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Имя пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>Введите, пожалуйста, ваше имя</Modal.Body>
      <Modal.Footer>
        <Form className="w-100" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя..."
              isInvalid={isInvalid}
              value={username}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              Имя пользователя должно быть не более 32 символов.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
