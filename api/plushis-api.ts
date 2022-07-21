import express, { Express, Request, Response } from 'express';
import bodyparser from 'body-parser'
import '../connect'
import { plushistory } from '../models/plushistory'
const app: Express = express();
app.use(bodyparser.json())

app.get("/history/plus", async (req: Request, res: Response): Promise<Response> => {
    const allhis: plushistory[] = await plushistory.findAll();
    return res.status(200).json(allhis);
  });
  
app.get("/history/plus/:id", async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const his: plushistory | null = await plushistory.findByPk(id);
    return res.status(200).json(his);
  });
  
app.post("/history/plus", async (req: Request, res: Response): Promise<Response> => {
    const his: plushistory = await plushistory.create({ ...req.body});
    return res.status(201).json(his);
  });

export default app;