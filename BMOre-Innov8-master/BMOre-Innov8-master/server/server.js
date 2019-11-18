const express = require("express");
const app = express();
const PORT = 3000;

require('./routes/index')(app);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})