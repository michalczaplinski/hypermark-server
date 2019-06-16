import { Application, RequestHandler } from "express";

import { IMiddleware } from '../types';

import ItemsService from "../services/items";
const itemsServiceInstance = new ItemsService();

export default (app: Application, middlewares: IMiddleware[]) => {

  app.get("/notes", ...middlewares, async (req, res) => {
    res.status(200).json({ status: '200 OK' })
  })

  app.post('/notes', ...middlewares, async (req, res) => {
    res.status(200).json({ status: '200 OK' })
  })
}
