const mongoose = require("mongoose");

// Conectar a la url que hemos definido en el env.
mongoose.connect(process.env.MONGO_URL);