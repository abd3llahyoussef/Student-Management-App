"use client";
import axios from "axios";
import React, { useState } from "react";

interface data {
  _id?: string;
  name: string;
  age: number;
}
export default function Modify({ id }: { id: data["_id"] }) {
  const [updatedData, setUpdatedData] = useState<data>({
    name: "",
    age: 0,
  });
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };
  const handleUpdate = async (_id: data["_id"]) => {
    try {
      await axios.put("http://localhost:7070/editStudent", {
        _id,
        updatedData,
      });
    } catch (err) {
      alert("Error in removing a student");
    }
  };
  const reset = () => {
    window.location.reload();
  };
  return (
    <div>
      <form>
        <li className="list-group-item">
          <input
            type="text"
            placeholder="Enter Student Name"
            name="name"
            value={updatedData.name}
            onChange={handleInputs}
          />
          <input
            type="text"
            placeholder="Enter Student age"
            name="age"
            value={updatedData.age}
            onChange={handleInputs}
          />
        </li>
        <li>
          <button onClick={() => handleUpdate(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
          </button>
          <button onClick={reset}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </li>
      </form>
    </div>
  );
}
