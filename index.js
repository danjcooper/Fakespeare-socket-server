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
    // console.log(data.playerList);
    socket.in(data.roomName).emit('updated players', data.playerList);
  });

  socket.on('start game', (data) => {
    // console.log(data.roomCode);
    socket.in(data.roomCode).emit('start game');
  });

  socket.on('book list', (data) => {
    socket.in(data.roomCode).emit('book list', data.bookList);
  });

  socket.on('answer', (data) => {
    console.log(data.answer);
    socket.in(data.roomCode).emit('answer', data);
  });

  socket.on('submit guess', (data) => {
    console.log(data.guess);
    socket.in(data.roomCode).emit('submit guess', data);
  });

  socket.on('update status', (data) => {
    socket.in(data.roomCode).emit('update status', data.status);
  });

  socket.on('update roundAnswers', (data) => {
    socket.in(data.roomCode).emit('update roundAnswers', data.answerList);
  });

  socket.on('update roundGuesses', (data) => {
    socket.in(data.roomCode).emit('update roundGuesses', data.guessList);
  });

  socket.on('update gameData', (data) => {
    socket.in(data.roomCode).emit('update gameData', data.gameData);
  });

  socket.on('disconnect', () => {
    console.log('Someone disconnected from the socket..');
  });
});

httpServer.listen(port, () =>
  console.log(`Express now departing from port ${port}!`)
);
