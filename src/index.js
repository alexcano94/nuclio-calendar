const express = require("express")
require("express-async-errors")
const errorHandler = require("./middlewares/error-handler")
const UserService = require("./services/user-service")
const EventService = require("./services/event-service")
const createRouter = require("./controllers/crud-controllers")
const cors = require('cors');
const Auth = require('./controllers/AuthController');
const EventsController = require('./controllers/EventsController');

const app = express()
const port = process.env.PORT || 8000

app.use(cors( {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(express.json())
app.use(Auth);
app.use(EventsController);
app.use("/users", createRouter(UserService))
app.use("/events", createRouter(EventService))
app.use(errorHandler)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
