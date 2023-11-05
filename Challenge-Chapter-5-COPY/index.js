import express from "express";
import knex from "knex";
const app = express();
const { PORT = 8000 } = process.env;
import path from "path";
import route from "./route";
// Serve Static file
const PUBLIC_DIRECTORY = path.join(__dirname, "./public");
app.use(express.static(PUBLIC_DIRECTORY));
// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// EJS
app.set("view engine", "ejs");
// knex connect
const knexInstance = knex({
    client: "postgresql",
    connection: {
        database: "bcr_cars",
        user: "postgres",
        password: "timothy",
    },
});
// Routes
app.get("/", route.getLandingPage);
app.listen(PORT, () => console.log("Server running on http://localhost:%d", PORT));
