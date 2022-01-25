import { useState, useEffect, useContext } from 'react';
import ChatRooms from './ChatRooms';
import MessageBox from './MessageBox';
import UserModal from './UserModal';
import {
  Form,
  Button,
  InputGroup,
  ListGroup,
  FormControl,
  Col,
  Row
} from "react-bootstrap";
import { nanoid } from 'nanoid';

import SocketContext from '../contexts/index';

const ChatBody = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [usersOnline, setUsersOnline] = useState([]);
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');

  const socket = useContext(SocketContext);

  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      id: nanoid(),
      userId,
      username,
      text: messageText,
      date: new Date(),
    };

    socket.emit('message:add', newMessage);
    setMessageText('');
  };

  useEffect(() => {
    socket.emit('message:get');
    socket.on('messages', (messages) => {
      setMessages(messages);
    });

    socket.emit('room:get');
    socket.on('rooms', (rooms) => {
      setRooms(rooms);
    });

    socket.emit('user:get:online');
    socket.on('users:online', (onlineUsers) => {
      setUsersOnline(onlineUsers);
    });
  }, []);

  return (
    <>
      <Row className="h-100 shadow-sm p-2 m-4 bg-body rounded">

        <Col xs={2} className="h-100 bg-white p-2 border-end">
          <ListGroup className="my-2">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Онлайн</span>
          </div>
            {usersOnline.map((onlineUser) => <ListGroup.Item className="text-truncate">{onlineUser.username}</ListGroup.Item>)}
          </ListGroup>
          <ChatRooms rooms={rooms} />
        </Col>

        <Col className="h-100">
          <Row className="h-100">
            <MessageBox messages={messages} />
          </Row>

          <Row>
            <Form className="px-3" onSubmit={handleSubmit}>
              <InputGroup className="mb-3 bg-light">
                <FormControl
                  name="message"
                  placeholder="Введите сообщение..."
                  aria-label="Новое сообщение"
                  required
                  value={messageText}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" type="submit">
                  Отправить
                </Button>
              </InputGroup>
            </Form>
          </Row>

        </Col>

      </Row>
      <UserModal />
    </>
  );
};

export default ChatBody;