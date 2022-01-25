const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database/users.json');
const db = low(adapter);

db.defaults({})
  .write();

const handleUser = (io, socket, ee) => {
  const getUsers = () => {
    const users = db.value();
    io.emit('users', users);
    getOnlineUsers();
  };

  const getOnlineUsers = () => {
    const users = db.value();
    const usersArr = Object.values(users);
    const onlineUsers = usersArr.filter((user) => user.isOnline);
    io.emit('users:online', onlineUsers);
  };

  const addUser = ({ userId, username }) => {
    if (db.has(userId).value()) {
      db.set(`${userId}.isOnline`, true)
        .write();
    } else {
      db.set(userId, {
        username,
        isOnline: true,
      })
        .write();
    }
    getOnlineUsers();
  };

  const setUserOffline = (userId) => {
    if (db.has(userId).value()) {
      db.set(`${userId}.isOnline`, false)
        .write();
    }
    getOnlineUsers();
  };

  socket.on('user:get', getUsers);
  socket.on('user:get:online', getOnlineUsers);
  socket.on('user:add', addUser);
  ee.on('user:leave', setUserOffline);
};

module.exports = handleUser;
