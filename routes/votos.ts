import { PrismaClient } from "@prisma/client"
import { Router } from "express"
const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
    try {
        const votos = await prisma.voto.findMany({
            include: {
                candidata: true,
                cliente: true
            }
        })
        res.status(200).json(votos)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.post("/", async (req, res) => {
    
        const { dataregistro, justificativa, candidataId, clienteId } = req.body

        if (!dataregistro || !candidataId || !clienteId) {
            res.status(400).json({ "Erro": "Necessário inserir data, justificativa, Id da candidata e do cliente." })
            return
        }

    try {    
        const [voto, candidata] = await prisma.$transaction([
            prisma.voto.create({  data: { dataregistro: new Date(dataregistro), justificativa, candidataId, clienteId}}),
            prisma.candidata.update({
                where: { id: candidataId },
                data: { numVotos: {increment : 1}}
            })
        ])
        res.status(201).json({voto, candidata})
        
    } catch (error) {
        res.status(400).json(error)
    }
})



router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { dataregistro, justificativa, candidataId, clienteId } = req.body

    if (!dataregistro || !candidataId || !clienteId) {
        res.status(400).json({ "Erro": "Necessário inserir data, justificativa, Id da candidata e do cliente." })
        return
    }
    try {
        const voto = await prisma.voto.update({
            where: { id: Number(id) },
            data: { dataregistro: new Date(dataregistro), justificativa, candidataId, clienteId }
        })
        res.status(200).json(voto)
    } catch (error) {
        res.status(400).json(error)
    }
})



router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {


        const voto = await prisma.voto.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(voto)
    } catch (error) {
        res.status(400).json(error)
    }
})

export default router
