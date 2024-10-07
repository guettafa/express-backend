import express, {Request, Response} from "express";

const router = express.Router()

// GET
router.get("/", (req: Request, res: Response) => {
    res.send("All the products");
});

// POST
router.post("/", (req: Request, res: Response) => {
    // post new product    
});

// GET BY ID
router.get("/:id", (req: Request, res: Response) => {
    try {
        req.params.id
    } catch (error) {
       res.send() // SEND 404 
    }
})

// PUT by ID
router.put("/:id", (req: Request, res: Response) => {
})

// DELETE by ID
router.delete("/:id", (req: Request, res: Response) => {
})

export default router;
