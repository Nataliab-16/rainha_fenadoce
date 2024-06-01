import { PrismaClient } from "@prisma/client"
import { Router } from "express"
const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
    try {
        const candidatas = await prisma.candidata.findMany()
        res.status(200).json(candidatas)
    }

    catch (error) { res.status(400).json(error) }
})


router.post("/", async (req, res) => {
    try {
        const { nome, clube, idade, sonho } = req.body

        if (!nome || !clube || !idade || !sonho) {
            res.status(400).json({ "Erro": "Necessário inserir nome, clube, idade e sonho" })
            return
        }
        const candidata = await prisma.candidata.create({
            data: {
                nome,
                clube,
                idade,
                sonho
            }
        })
        res.status(201).json(candidata)
    }
    catch (error) {
        res.status(400).json(error)
    }
})



router.put("/:id", async (req, res) => {
    const { id } = req.params

    const { nome, clube, idade, sonho } = req.body

    if (!nome || !clube || !idade || !sonho) {
        res.status(400).json({ "Erro": "Necessário inserir nome, clube, idade e sonho" })
        return
    }
    try {
        const candidata = await prisma.candidata.update({
            where: { id: Number(id) },
            data: { nome, clube, idade, sonho }
        })
        res.status(200).json(candidata)
    }
    catch (error) {
        res.status(400).json(error)
    }
})



router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const candidata = await prisma.candidata.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(candidata)
    }

    catch (error) {
        res.status(400).json(error)
    }
})



export default router
