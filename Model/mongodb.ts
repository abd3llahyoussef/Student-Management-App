import mongoose from "mongoose";

export interface StudentDoc extends mongoose.Document {
  name: string;
  age: number;
}
const db = new mongoose.Schema<StudentDoc>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});
const task = mongoose.model<StudentDoc>("Student", db);

export interface data {
  name: string;
  age: number;
}
export class Student {
  async create(name: string, age: number): Promise<void> {
    try {
      const insertStudent = new task({ name: name, age: age });
      await insertStudent
        .save()
        .then(() => console.log("the student is inserted"));
    } catch (err) {
      throw err;
    }
  }
  async getAll(): Promise<data[]> {
    try {
      return await task.find().exec();
    } catch (error) {
      throw error;
    }
  }
  async updateStudent(
    student_id: string,
    name: string,
    age: number
  ): Promise<void> {
    try {
      let updatedStudent = await task.updateOne(
        { _id: student_id },
        { name: name, age: age }
      );
      if (!updatedStudent) {
        throw Error("No such user found");
      } else {
        return console.log("updated");
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteStudent(student_id: string): Promise<void> {
    try {
      let deletedStudent = await task.deleteOne({ _id: student_id });
      if (!deletedStudent) {
        throw Error("No such user found");
      } else {
        return console.log("deleted");
      }
    } catch (err) {
      throw err;
    }
  }
}
