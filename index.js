// const { SocketAddress } = require('net');
const httpServer = require('http').createServer();

const port = process.env.PORT || 3000;

const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('hello, new connection ');

  socket.on('joinRoom', (data) => {
    socket.join(data.roomName);
    console.log(`${data.username} joined ${data.roomName}`);
    // Tell everyone a user joined
    socket.in(data.roomName).emit('newPlayer', data);
  });

  socket.on('player update', (data) => {
    console.log(data.playerList);
    socket.in(data.roomName).emit('updated players', data.playerList);
  });

  socket.on('start game', (data) => {
    console.log(data.roomCode);
    socket.in(data.roomCode).emit('start game');
  });

  socket.on('disconnect', () => {
    console.log('Someone disconnected from the socket..');
  });
});

httpServer.listen(port, () =>
  console.log(`Express now departing from port ${port}!`)
);
