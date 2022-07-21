import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser'
import './connect'
import { history } from './models/allhisotry'
import { plushistory } from './models/plushistory'
import { subhistory } from './models/subtracthistory'
import { multiplyhistory } from './models/mulhistory'; 
import { divisionhistory } from './models/divisionhis'
import allhis from './api/history-api'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(bodyparser.json())
app.use(allhis)

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Serverss');
});

app.post('/api/plus', async (req,res) =>{
  const a:string =req.body.value1
  const b:string =req.body.value2
  const c:number = (parseInt(a)+parseInt(b))
  const his: history = await history.create({ ...req.body,'sign':'+','result':`${c}`});
  const ps: plushistory = await plushistory.create({...req.body,'result':`${c}`}) 
  res.status(201).json({
    his,
    ps
  });
})

app.post('/api/subtract', async (req,res) =>{
  const a:string =req.body.value1
  const b:string =req.body.value2
  const c:number = (parseInt(a)-parseInt(b))
  const his: history = await history.create({ ...req.body,'sign':'-','result':`${c}`});
  const ps: subhistory = await subhistory.create({...req.body,'result':`${c}`}) 
  res.status(201).json({
    his,
    ps
  });
})

app.post('/api/multiply', async (req,res) =>{
  const a:string =req.body.value1
  const b:string =req.body.value2
  const c:number = (parseInt(a)*parseInt(b))
  const his: history = await history.create({ ...req.body,'sign':'*','result':`${c}`});
  const ps: multiplyhistory = await multiplyhistory.create({ ...req.body,'result':`${c}`})
  return res.status(201).json({
    his,
    ps
  });
})

app.post('/api/division', async (req,res) =>{
  const a:string =req.body.value1
  const b:string =req.body.value2
  const c:number = (parseInt(a)/parseInt(b))
  const his: history = await history.create({ ...req.body,'sign':'/','result':`${c}`});
  const ps: divisionhistory = await divisionhistory.create({ ...req.body,'result':`${c}`})
  return res.status(201).json({
    his,
    ps
  });
})

app.get("/history/plus", async (req: Request, res: Response): Promise<Response> => {
  const allhis: plushistory[] = await plushistory.findAll();
  return res.status(200).json(allhis);
}
)
app.get("/history/plus/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const his: plushistory | null = await plushistory.findByPk(id);
  return res.status(200).json(his);
});

app.get("/history/subtract", async (req: Request, res: Response): Promise<Response> => {
  const allhis: subhistory[] = await subhistory.findAll();
  return res.status(200).json(allhis);
});

app.get("/history/subtract/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const his: subhistory | null = await subhistory.findByPk(id);
  return res.status(200).json(his);
});


app.get("/history/multiply", async (req: Request, res: Response): Promise<Response> => {
  const allhis: multiplyhistory[] = await multiplyhistory.findAll();
  return res.status(200).json(allhis);
});

app.get("/history/multiply/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const his: multiplyhistory | null = await multiplyhistory.findByPk(id);
  return res.status(200).json(his);
});

app.get("/history/division", async (req: Request, res: Response): Promise<Response> => {
  const allhis: divisionhistory[] = await divisionhistory.findAll();
  return res.status(200).json(allhis);
});

app.get("/history/division/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const his: divisionhistory | null = await divisionhistory.findByPk(id);
  return res.status(200).json(his);
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});