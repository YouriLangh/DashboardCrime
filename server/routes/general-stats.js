import express from "express"

const router = express.Router();

router.get("/occurences", async (req,res) => {
    try{
        const reply = "Here you go"
        res.status(200).json(reply)
    } catch(error){
        res.status(404).json({ message: error.message })
    }
})



export default router;
