import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./configs/db.config.js";

//import routes


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type", "content-type: multipart/form-data");  
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

sequelize
    .sync({ force: false })
    .then(async () => {
        console.log("Database & tables created!");
        
    })
    .catch((error) => {
        console.error("Error while creating tables", error);
    });

// main routes


// run server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`); 
});
