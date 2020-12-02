import * as express from "express";
import * as cors from "cors";
import { response } from './misc';

import usersRoute from './ressources/users';
import groupsRoute from './ressources/groups';
import postsRoute from './ressources/posts';

// Create express instance and apply cors-restriction
const app = express();
app.use(cors());

// Apply given routers
app.use("/users", usersRoute);
app.use("/groups", groupsRoute);
app.use("/posts", postsRoute);

// Catch all other request to not run into an error
app.all('/', (req, res) => response(req, res, 200, 'Welcome to the backend of TwoGether! :)'));
app.all('*', (req, res) => response(req, res, 404));

app.listen(process.env.PORT || 8080, () => console.log("Backend running"));
