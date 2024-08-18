"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const PORT = 3002;
index_1.app.listen(PORT, () => {
    console.log(`API successfully started at port ${PORT}`);
});
