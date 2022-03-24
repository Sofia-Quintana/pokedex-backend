const express = require('express');
const app = express();
const cors = require("cors");
const router = require('./users/user.controller');
const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/user', router);

app.get('/', (request, response) => {
    response.json({ message: "Welcome to pokedex"});
});

// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Server listening on port ' + PORT));