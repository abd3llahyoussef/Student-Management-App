"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface data {
  _id?: string;
  name: string;
  age: number;
}
export default function Home() {
  const [data, setData] = useState<data[]>([]);
  const [input, setInput] = useState<data>({
    name: "",
    age: 0,
  });
  const [updatedData, setUpdatedData] = useState<data>({
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
  const handleUpdate = async (id: data["_id"]) => {
    try {
      await axios.put("http://localhost:7070/editStudent", { id, updatedData });
    } catch (err) {
      alert("Error in removing a student");
    }
  };
  const handleDelete = async (id: data["_id"]) => {
    console.log(id);
    try {
      await axios.delete("http://localhost:7070/deleteStudent", {
        data: { id },
      });
      alert("deleted Successfully");
      window.location.reload();
    } catch (err) {
      alert("Error in removing a student");
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
              <button className="border-2 border-black rounded-full  hover:bg-black  w-1/2">
                <span className="hover:text-white text-black z-10">Insert</span>
              </button>
            </li>
          </form>

          {data.map((item, key) => (
            <li className="list-group-item grid grid-cols-2" key={item._id}>
              <p> {item.name}</p>
              <div className="flex justify-end">
                <button onClick={() => handleUpdate(item._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-clockwise"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                    />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(item._id)} className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
