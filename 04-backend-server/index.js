const express = require("express");

const app = express();

// rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "hola undo cruel y salvaje"
    })
})

app.listen(3000, () => {
  console.log("servidor corriendo en el puerto " + 3000);
});
