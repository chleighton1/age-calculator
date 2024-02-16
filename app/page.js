"use client";

import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Arrow from "./components/Arrow";
const { DateTime } = require("luxon");

export default function Home() {
  const [age, setAge] = useState({
    years: "",
    months: "",
    days: "",
  });

  const form = useForm({
    shouldFocusError: false,
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  function onSubmit(data) {
    const now = DateTime.now();
    const userBirth = DateTime.local(
      Number(data.year),
      Number(data.month),
      Number(data.day)
    );
    if (userBirth.c == null) {
      return alert("Not a valid date");
    }

    const diff = now.diff(userBirth, ["months", "days", "years"]).toObject();
    setAge(() => ({
      years: Math.floor(diff.years),
      months: Math.floor(diff.months),
      days: Math.floor(diff.days),
    }));
    // console.log(age);
  }

  return (
    <main className="bg-white rounded-3xl rounded-br-[114px] mt-16 mx-5 p-6">
      {/* AGE INPUT */}
      <div>
        <form
          className="form mb-20 mt-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex w-full mb-14 gap-8">
            <div className="form-control">
              <label
                htmlFor="day"
                className={`block text-sm font-bold mb-2 ${
                  errors.day?.message ? "text-red" : "text-grey"
                }`}
              >
                DAY
              </label>
              <input
                className={`border font-bold rounded w-full px-6 py-2 ${
                  errors.day?.message
                    ? "border-red active:border-red"
                    : "border-line"
                }`}
                type="text"
                id="day"
                placeholder="DD"
                {...register("day", {
                  required: true,
                  pattern: {
                    value: /^0[1-9]|[12][0-9]|3[01]/,
                    message: "Invalid day format",
                  },
                })}
              />
              <p className="error text-red text-center">
                {errors.day?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="month"
                className={`block text-sm font-bold mb-2 ${
                  errors.month?.message ? "text-red" : "text-grey"
                }`}
              >
                MONTH
              </label>
              <input
                className={`border font-bold rounded w-full px-6 py-2 ${
                  errors.month?.message
                    ? "border-red active:border-red"
                    : "border-line"
                }`}
                type="number"
                id="month"
                placeholder="MM"
                {...register("month", {
                  required: true,
                  maxLength: 2,
                  pattern: {
                    value: /^0[1-9]|1[1,2]/,
                    message: "Invalid month format",
                  },
                })}
              />
              <p className="error text-red text-center">
                {errors.month?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="year"
                className={`block text-sm font-bold mb-2 ${
                  errors.year?.message ? "text-red" : "text-grey"
                }`}
              >
                YEAR
              </label>
              <input
                className={`border font-bold rounded w-full px-6 py-2 ${
                  errors.year?.message
                    ? "border-red active:border-red"
                    : "border-line"
                }`}
                type="number"
                id="year"
                placeholder="YYYY"
                {...register("year", {
                  required: true,
                  pattern: {
                    value: /^(19|20)\d{2}/,
                    message: "Invalid year format",
                  },
                })}
              />
              <p className="error text-red text-center">
                {errors.year?.message}
              </p>
            </div>
          </div>
          <div className="relative w-full">
            <div className="border border-line"></div>
            <button className="absolute top-[-24px] left-[42.5%]">
              <Arrow />
            </button>
          </div>
        </form>
        <DevTool control={control} />
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
