"use client";

import { React, useState } from "react";
import Arrow from "./components/Arrow";
const { DateTime } = require("luxon");

export default function Home() {
  const [age, setAge] = useState({
    years: "",
    months: "",
    days: "",
  });
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: Number(value),
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const now = DateTime.now();
    const userBirth = DateTime.local(
      formData.year,
      formData.month,
      formData.day
    );

    const diff = now.diff(userBirth, ["months", "days", "years"]).toObject();
    setAge(() => ({
      years: Math.floor(diff.years),
      months: Math.floor(diff.months),
      days: Math.floor(diff.days),
    }));
  }

  return (
    <main className="bg-white rounded-3xl rounded-br-[114px] mt-16 mx-5 p-6">
      {/* AGE INPUT */}
      <div>
        <form className="form mb-20 mt-5" onSubmit={handleSubmit}>
          <div className="flex w-full mb-14 gap-8">
            <div>
              <label
                htmlFor="day"
                className="text-grey block text-sm font-bold mb-2"
              >
                DAY
              </label>
              <input
                className="border font-bold rounded border-line w-full px-6 py-2"
                type="number"
                placeholder="DD"
                onChange={handleChange}
                name="day"
                value={formData.day}
              />
            </div>
            <div>
              <label
                htmlFor="month"
                className="text-grey block text-sm font-bold mb-2"
              >
                MONTH
              </label>
              <input
                className="border font-bold rounded border-line w-full px-6 py-2"
                type="number"
                placeholder="MM"
                onChange={handleChange}
                name="month"
                value={formData.month}
              />
            </div>
            <div>
              <label
                htmlFor="year"
                className="text-grey block text-sm font-bold mb-2"
              >
                YEAR
              </label>
              <input
                className="border font-bold rounded border-line w-full px-6 py-2"
                type="number"
                placeholder="YYYY"
                onChange={handleChange}
                name="year"
                value={formData.year}
              />
            </div>
          </div>
          <div className="relative w-full">
            <div className="border border-line"></div>
            <button className="absolute top-[-24px] left-[42.5%]">
              <Arrow />
            </button>
          </div>
        </form>
      </div>

      {/* AGE OUTPUT */}
      <div className="mb-14">
        <h1 className="text-5xl italic font-bold mb-2">
          <span className="text-purple font-extrabold text-6xl italic">
            {age.years ? age.years : "--"}
          </span>{" "}
          years
        </h1>
        <h1 className="text-5xl italic font-bold mb-2">
          <span className="text-purple font-extrabold text-6xl italic">
            {age.months ? age.months : "--"}
          </span>{" "}
          months
        </h1>
        <h1 className="text-5xl italic font-bold">
          <span className="text-purple font-extrabold text-6xl italic">
            {age.days ? age.days : "--"}
          </span>{" "}
          days
        </h1>
      </div>
    </main>
  );
}
