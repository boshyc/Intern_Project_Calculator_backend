import express, { Express, Request, Response } from 'express';
import bodyparser from 'body-parser'
import '../connect'
import { history } from '../models/allhisotry'

const app: Express = express();
app.use(bodyparser.json())


app.get("/history/all", async (req: Request, res: Response): Promise<Response> => {
  const allhis: history[] = await history.findAll();
  return res.status(200).json(allhis);
});

app.get("/history/all/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const his: history | null = await history.findByPk(id);
  return res.status(200).json(his);
});

export default app