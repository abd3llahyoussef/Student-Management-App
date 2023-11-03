import express, { Request, Response } from "express";
import { data, Student } from "../Model/mongodb";

const std = new Student();

const createStudent = async (req: Request, res: Response) => {
  const studentName = req.body.name;
  const studentAge = req.body.age;

  try {
    const make = await std.create(studentName, studentAge);
    res.status(201).json({ message: "Successfully Created", data: make });
  } catch (err) {
    res.status(500).send({ message: "Error in the request" });
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await std.getAll();
    if (!students) {
      throw new Error("No Students");
    }
    return res.status(200).json({ message: "successful", data: students });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "error", error: e });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  const id = req.body.id;
  const studentName = req.body.updatedData.name;
  const studentAge = req.body.updatedData.age;
  try {
    const update = await std.updateStudent(id, studentName, studentAge);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "error", error: e });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  const _id = req.body.id;
  console.log(_id);
  try {
    const deleted = await std.deleteStudent(_id);
    res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error", error: err });
  }
};

export const Final = (app: express.Application) => {
  app.post("/addStudent", createStudent);
  app.get("/allStudents", getStudents);
  app.put("/editStudent", updateStudent);
  app.delete("/deleteStudent", deleteStudent);
};
