const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use(cors());

app.get("/test", (req, res, next) => {
    try {
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        next(error);
    }
});

app.get("/users", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

app.get("/users/:id", async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
        });
        res.sendStatus(200).json(user);
    } catch (error) {
        next(error);
    }
});

app.post("/users", async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: { ...req.body },
        });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

app.post("/users/:id", async (req, res, next) => {
    try {
        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: { ...req.body },
        });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

app.delete("/users/:id", async (req, res, next) => {
    try {
        const user = await prisma.user.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
