import express, { Express, Request, Response } from "express";

export const app: Express = express();

// An example route for testing if the server works
app.get('/example', (req: Request, res: Response) => {
    res.send('Example get response');
});


