const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database/messages.json');
const db = low(adapter);
 
db.defaults({ messages: [] })
  .write();

const handleMessage = (io, socket) => {
  const getMessages = () => {
    const messages = db.get('messages').value();
    io.emit('messages', messages);
  };

  const addMessage = (message) => {
    db.get('messages')
      .push(message)
      .write();

    getMessages();
  }

  socket.on('message:get', getMessages);
  socket.on('message:add', addMessage);
};

module.exports = handleMessage;
