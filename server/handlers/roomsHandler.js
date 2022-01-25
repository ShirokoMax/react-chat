const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database/rooms.json');
const db = low(adapter);
 
db.defaults({ rooms: [] })
  .write();

const handleRoom = (io, socket) => {
  const getRooms = () => {
    const rooms = db.get('rooms').value();
    io.emit('rooms', rooms);
  };

  socket.on('room:get', getRooms);
};

module.exports = handleRoom;
