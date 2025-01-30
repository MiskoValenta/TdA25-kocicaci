const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'views', 'overview', 'index.html')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'overview', 'index.html'));
  app.use(express.static(path.join(__dirname, 'views', 'overview')));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login', 'login.html'));
  app.use(express.static(path.join(__dirname, 'views', 'login')));
});

app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user.html'));
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, 'views', 'error', 'error.html'));
  app.use(express.static(path.join(__dirname, 'views', 'error')));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

//testík