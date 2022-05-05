import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Toma essa rota");
});
app.get("/clientes", (req, res) => {
    res.send("Toma essa também dada");
});

app.listen(3333, () => console.log("tá rodando fdp"));
