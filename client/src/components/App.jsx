import Layout from './Layout';
import ChatBody from './ChatBody';
import NotFound from './NotFound';
import { useEffect } from 'react';

import {
  Routes,
  Route
} from "react-router-dom";

import io from 'socket.io-client';
import SocketContext from '../contexts/index';

const serverUrl = 'http://localhost:5000';
const socket = io(serverUrl);

const App = () => {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  // componentDidMount:
  useEffect(() => {
    if (userId !== null) {
      socket.emit('user:add', {
        userId,
        username,
      });
      socket.emit('handshake', { userId, username });
    }
  }, []);


  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Client connected: ${socket.id}`);
    });

    socket.on('disconnect', (reason) => {
      console.log(`Client disconnected: ${reason}`);
    });

    socket.on('connect_error', (reason) => {
      console.log(`Client connect_error: ${reason}`);
    });
  });

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ChatBody />} />

          {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;