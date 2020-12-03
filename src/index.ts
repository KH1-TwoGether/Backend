import * as express from "express";
import * as cors from "cors";

import usersRoute from './routes/users';
import groupsRoute from './routes/groups';
import postsRoute from './routes/posts';

// Create express instance and apply cors-restriction
const app = express();
app.use(express.json());
app.use(cors());

// Apply given routers
app.use("/users", usersRoute);
app.use("/groups", groupsRoute);
app.use("/posts", postsRoute);

// Catch all other request to not run into an error
app.all('/', (req, res) => res.status(200).send('Welcome to the backend of TwoGether! :)'));
app.all('*', (req, res) => res.status(404).send());

app.listen(process.env.PORT || 8080, () => console.log("Backend running"));
