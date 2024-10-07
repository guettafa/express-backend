import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware to parse responses to JSON
app.use(express.json()),

app.get("/", (req: Request, res: Response) => {
 res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

