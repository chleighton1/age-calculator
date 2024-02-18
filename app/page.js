"use client";

import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Arrow from "./components/Arrow";
const { DateTime } = require("luxon");
import CountUp from "react-countup";

export default function Home() {
  const [age, setAge] = useState({
    years: "",
    months: "",
    days: "",
  });

  const form = useForm({
    shouldFocusError: false,
  });
  const { register, control, handleSubmit, formState, getValues } = form;
  const { errors } = formState;

  function onSubmit(data) {
    const now = DateTime.now();
    const userBirth = DateTime.local(
      Number(data.year),
      Number(data.month),
      Number(data.day)
    );

    const diff = now.diff(userBirth, ["months", "days", "years"]).toObject();
    setAge(() => ({
      years: Math.floor(diff.years) == 0 ? "0" : Math.floor(diff.years),
      months: Math.floor(diff.months) == 0 ? "0" : Math.floor(diff.months),
      days: Math.floor(diff.days) == 0 ? "0" : Math.floor(diff.days),
    }));
  }

  return (
    <main className="bg-white min-w-80 sm:w-auto lg:w-[704px] sm:mx-32 lg:mx-auto rounded-3xl rounded-br-[114px] mt-16 mx-5 p-6 md:px-10">
      {/* AGE INPUT */}
      <div>
        <form
          className="form mb-16 lg:mb-12 mt-5"
          onSubmit={handleSubmit(onSubmit)}
          autocomplete="off"
          noValidate
        >
          <div className="flex w-full lg:w-3/4 mb-14 lg:mb-12 form-control gap-6">
            <div className="">
              <label
                htmlFor="day"
                className={`block tracking-widest text-sm font-semibold mb-2 ${
                  errors.day?.message ? "text-red" : "text-grey"
                }`}
              >
                DAY
              </label>
              <input
                className={`border w-full text-xl lg:text-2xl font-bold rounded-lg px-4 py-3 ${
                  errors.day?.message
                    ? "border-red active:border-red"
                    : "border-line"
                }`}
                type="text"
                id="day"
                placeholder="DD"
                {...register("day", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  pattern: {
                    value: /^0[1-9]|[12][0-9]|3[01]/,
                    message: "Must be a valid date",
                  },
                  validate: (day) => {
                    const date = DateTime.local(
                      Number(getValues("year")),
                      Number(getValues("month")),
                      Number(day)
                    );
                    return date.c !== null || "Not a valid date";
                  },
                })}
              />
              <p className="error text-red text-xs mt-1 ml-1 italic">
                {errors.day?.message}
              </p>
            </div>
            <div className="">
              <label
                htmlFor="month"
                className={`block text-sm tracking-widest font-semibold mb-2 ${
                  errors.month?.message ? "text-red" : "text-grey"
                }`}
              >
                MONTH
              </label>
              <input
                className={`border w-full text-xl lg:text-2xl font-bold rounded-lg px-4 py-3 ${
                  errors.month?.message
                    ? "border-red active:border-red"
                    : "border-line"
                }`}
                type="text"
                id="month"
                placeholder="MM"
                {...register("month", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  maxLength: 2,
                  pattern: {
                    value: /^0[1-9]|1[1,2]/,
                    message: "Must be a valid month",
                  },
                })}
              />
              <p className="error text-red text-xs mt-1 ml-1 italic">
                {errors.month?.message}
              </p>
            </div>
            <div className="">
              <label
                htmlFor="year"
                className={`block text-sm tracking-widest font-semibold mb-2 ${
                  errors.year?.message ? "text-red" : "text-grey"
                }`}
              >
                YEAR
              </label>
              <input
                className={`border w-full text-xl lg:text-2xl font-bold rounded-lg px-3 py-3 ${
                  errors.year?.message
                    ? "border-red active:border-red"
                    : "border-line"
                }`}
                type="text"
                id="year"
                placeholder="YYYY"
                {...register("year", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  max: {
                    value: DateTime.now().year,
                    message: "Must be in the past",
                  },
                  pattern: {
                    value: /^(19|20)\d{2}/,
                    message: "Must be a valid year",
                  },
                })}
              />
              <p className="error text-red text-xs mt-1 ml-1 italic">
                {errors.year?.message}
              </p>
            </div>
          </div>
          <div className="relative w-full">
            <div className="border border-line"></div>
            <button className="absolute top-[-30px] left-[40.5%] lg:top-[-35px] lg:left-auto lg:right-0">
              <Arrow />
            </button>
          </div>
        </form>
        {/* <DevTool control={control} /> */}
      </div>

      {/* AGE OUTPUT */}
      <div className="mb-14">
        <h1 className="text-[50px] sm:text-6xl lg:text-8xl lg:font-extrabold italic font-bold mb-2">
          <span className="text-purple font-extrabold text-[50px] sm:text-6xl lg:text-8xl italic">
            {age.years ? <CountUp end={age.years} /> : "--"}
          </span>{" "}
          years
        </h1>
        <h1 className="text-[50px] sm:text-6xl lg:text-8xl lg:font-extrabold italic font-bold mb-2">
          <span className="text-purple font-extrabold text-[50px] sm:text-6xl lg:text-8xl italic">
            {age.months ? <CountUp end={age.months} /> : "--"}
          </span>{" "}
          months
        </h1>
        <h1 className="text-[50px] sm:text-6xl lg:text-8xl lg:font-extrabold italic font-bold">
          <span className="text-purple font-extrabold text-[50px] sm:text-6xl lg:text-8xl italic">
            {age.days ? <CountUp end={age.days} /> : "--"}
          </span>{" "}
          days
        </h1>
      </div>
    </main>
  );
}
