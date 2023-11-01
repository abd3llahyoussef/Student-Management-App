"use client";
import axios from "axios";
import React, { useState, useEffect, ReactNode } from "react";

interface data {
  id?: string;
  name: string;
  age: number;
}
export default function Home() {
  const [data, setData] = useState<data[]>([]);
  const [input, setInput] = useState<data>({
    name: "",
    age: 0,
  });
  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get("http://localhost:7070/allStudents");
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    })();
  }, []);
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };
  const handleStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(input);
    e.preventDefault();
    try {
      const insertStudent = await axios.post(
        "http://localhost:7070/addStudent",
        input
      );
      if (insertStudent) alert("Student Inserted successfully");
    } catch (err) {
      console.log(err);
      alert("there is an error while inserting an student");
    }
  };
  return (
    <div className="bg-white h-screen">
      <div className="bg-white h-1/6 flex item-center justify-center">
        <p className="text-black bg-gray-500 rounded-3xl border-2 border-l-cyan-100 w-7/12 h-10 text-center pt-2">
          Student Management App
        </p>
      </div>
      <div className="bg-white flex justify-center h-screen">
        <ul className="list-group list-group-flush">
          <form onSubmit={handleStudent}>
            <li className="list-group-item">
              <input
                type="text"
                placeholder="Enter Student Name"
                name="name"
                value={input.name}
                onChange={handleInputs}
              />
              <input
                type="text"
                placeholder="Enter Student age"
                name="age"
                value={input.age}
                onChange={handleInputs}
              />
            </li>
            <li>
              <button className="border-2 text-black border-black rounded-full hover:bg-black hover:text-white  w-1/2">
                Insert
              </button>
            </li>
          </form>

          {data.map((item, key) => (
            <li className="list-group-item" key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
