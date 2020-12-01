import * as express from "express";
import * as cors from "cors";
import { response } from './misc';

import postsRoute from './ressources/posts';
import usersRoute from './ressources/users';

// Create express instance and apply cors-restriction
const app = express();
app.use(cors());

// Apply given routers
app.use("/posts", postsRoute);
app.use("/users", usersRoute);

// Catch all other request to not run into an error
app.all('/', (req, res) => response(req, res, 200, 'Welcome to the backend of TwoGether! :)'));
app.all('*', (req, res) => response(req, res, 404));

app.listen(8080, () => console.log("Listening on port 8080"));
