import { PrismaClient } from "@prisma/client"
import { Router } from "express"
const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {

    try {
        const clientes = await prisma.cliente.findMany()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.post("/", async (req, res) => {
    try {
        const { nome, email, cidade, datanascimento } = req.body

        if (!nome || !email || !cidade || !datanascimento) {
            res.status(400).json({ "Erro": "Necessário inserir nome, email, cidade e datanascimento" })
            return
        }
        const cliente = await prisma.cliente.create({
            data: {
                nome,
                email,
                cidade,
                datanascimento: new Date(datanascimento)
            }
        })
        res.status(201).json(cliente)
    } catch (error) {
        res.status(400).json(error)
    }
})



router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { nome, email, cidade, datanascimento } = req.body

    if (!nome || !email || !cidade || !datanascimento) {
        res.status(400).json({ "Erro": "Necessário inserir nome, email, cidade e datanascimento" })
        return
    }
    try {
        const cliente = await prisma.cliente.update({
            where: { id: Number(id) },
            data: { nome, email, cidade, datanascimento: new Date(datanascimento) }
        })
        res.status(200).json(cliente)
    }
    catch (error) {
        res.status(400).json(error)
    }
})



router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const cliente = await prisma.cliente.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(cliente)
    } catch (error) {
        res.status(400).json(error)
    }
})


export default router
