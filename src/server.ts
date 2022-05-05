import express from "express";
import { send } from "process";
import { prisma } from "./prisma";

const app = express();
app.use(express.json()); // Isso é chamado de midleware

/* 
Métodos API
GET = Buscar Informações
POST = Gravar informações
PUT = Atualizar informações de uma entidade (Varias 
    colunas de uma linha, ex.: Nome, Idade, Endereço)
PATCH = Atualizar uma informação unica de uma entidade
    (No exemplo acima seria como atualizar somente o nome)
DELETE = Deletar uma informação
*/

app.get("/users", (req, res) => {
    return res.send("Teste");
});

app.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        },
    });

    return res.status(201).json({ data: feedback });
});

app.listen(3333, () => console.log("tá rodando fdp"));
