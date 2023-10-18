const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOption");

const app = express();
const PORT = process.env.PORT || 3500;

// Add middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, "public")));
app.use('/', require("./routes/root"));

// Covers 404 errors
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts("html"))
        res.sendFile(path.join(__dirname, "views", "404.html"));
    else if (req.accepts("json"))
        res.json({ message: "404 Not Found" });
    else
        res.type("txt").send("404 Not Found");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

