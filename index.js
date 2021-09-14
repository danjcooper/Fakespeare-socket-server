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
  console.log('hello, new connection');

  socket.on('joinRoom', (data) => {
    socket.join(data.roomName);
    console.log(`${data.username} joined ${data.roomName}`);
    // Tell everyone a user joined
    socket.in(data.roomName).emit('newPlayer', data);
  });

  socket.on('disconnect', () => {
    console.log('Someone disconnected from the socket..');
  });
});

httpServer.listen(port, () =>
  console.log(`Express now departing from port ${port}!`)
);
