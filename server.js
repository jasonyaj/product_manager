const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");

require("./server/config/mongoose.config");

app.use(cors());

app.use(express.json(), express.urlencoded({ extended: true }));

require("./server/routes/product.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
