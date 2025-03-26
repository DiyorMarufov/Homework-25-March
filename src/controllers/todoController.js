import { join } from "path";
import { v4 } from "uuid";
import { readFile } from "../libs/readFile.js";
import { writeFile } from "../libs/writeFile.js";
import { log } from "console";

export const todoList = [];

const donePathFile = join(import.meta.dirname,"..","db","doneTodoList.json") 
const listPathFile = join(import.meta.dirname,"..","db","todoList.json") 


export const doneTodoList = [];

export const todoController = {
  create: (req, res, next) => {
    try {
      const body = req.body;
      body.id = v4();
      todoList.push(body);
      writeFile(listPathFile,todoList)
      res.render("pages/index", {
        title: "Todo page",
        todoList,
        doneTodoList,
      });
    } catch (error) {
      next(error);
    }
  },
  update: (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      
      
      let toDoList = readFile(listPathFile)
      const todoIndex = todoList.findIndex((todo) => todo.id === id);
      
      
      if (todoIndex === -1) {
        res.json({
          message: "todo not found!",
          ok: false,
        });
        return;
      }

      const oldList = toDoList[todoIndex] 
      const update = {
        ...oldList,
        ...body,
      };
      
      
      
      todoList.splice(todoIndex, 1, update);
      writeFile(listPathFile,todoList)
      res.json({
        message: "updated",
        ok: true,
      });
      
    } catch (error) {
      next(error);
    }
  },
  delete: (req, res, next) => {
    try {
      const id = req.params.id;
      const todoIndex = todoList.findIndex((todo) => todo.id === id);

      if (todoIndex < 0) {
        res.json({
          message: "todo not found!",
          ok: false,
        });
        return;
      }
      todoList.splice(todoIndex, 1);
      writeFile(listPathFile,todoList)
      res.json({
        message: "deleted",
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },
  findAll: (req, res, next) => {
    try {
        
        res.render("pages/index",{
            title: "Todo Page",
            todoList,
            doneTodoList
        })
    } catch (error) {
      next(error);
    }
  },
  findOne: (req, res, next) => {
    try {
      const id = req.params.id;
      const todo = todoList.find((todo) => todo.id === id);

      if (!todo) {
        return res.render("pages/index", {
          title: "Todo page",
          todoList,
          doneTodoList,
        });
      }
      res.render("pages/edit", {
        title: "Update page",
        todo,
      });
    } catch (error) {
      next(error);
    }
  },
  done: (req, res, next) => {
    try {
      const id = req.params.id;
      const todoIndex = todoList.findIndex((todo) => todo.id === id);

      if (todoIndex < 0) {
        res.json({
          message: "todo not found!",
          ok: false,
        });
        return;
      }
      const doneTodo = todoList[todoIndex];
      doneTodoList.push(doneTodo);
      todoList.splice(todoIndex, 1);
      res.json({
        message: "done",
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },
};