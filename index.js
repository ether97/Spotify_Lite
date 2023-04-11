const app = require("./server");
const PORT = process.env.PORT || 3000;
const connection = require("./config/db");

connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Sever live and running: http://localhost:${PORT}`);
  });
});
