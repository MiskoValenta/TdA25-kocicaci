const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Serve static files from the 'views' folder
app.use(express.static(path.join(__dirname, 'views')));

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});