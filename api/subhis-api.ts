import express, { Express, Request, Response } from 'express';
import bodyparser from 'body-parser'
import '../connect'
import { subhistory } from '../models/subtracthistory'
const app: Express = express();
app.use(bodyparser.json())

app.get("/history/plus", async (req: Request, res: Response): Promise<Response> => {
    const allhis: subhistory[] = await subhistory.findAll();
    return res.status(200).json(allhis);
  });
  
  app.get("/history/plus/:id", async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const his: subhistory | null = await subhistory.findByPk(id);
    return res.status(200).json(his);
  });
  
  app.post("/history/plus", async (req: Request, res: Response): Promise<Response> => {
    const his: subhistory = await subhistory.create({ ...req.body});
    return res.status(201).json(his);
  });

export default app;