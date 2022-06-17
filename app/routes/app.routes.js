export default (app) => {
    const App = require("../controllers/app.controller.js");

    app.get("/world", App.getWorld);

    app.put("/world", App.updateWorld);
}