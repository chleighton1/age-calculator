"use client"

import {React, useState} from "react";
import Arrow from "./components/Arrow";
const { DateTime } = require("luxon");


export default function Home() {
  const [age, setAge] = useState({
    years: "",
    months: "",
    days: "",
  })
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
  })

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: Number(value)
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    
    const now = DateTime.now()
    const userBirth = DateTime.local(formData.year, formData.month, formData.day)

    const diff = now.diff(userBirth, ['months', 'days', 'years']).toObject()
    setAge(() => ({
      years: Math.floor(diff.years),
      months: Math.floor(diff.months),
      days: Math.floor(diff.days),
    }))
  }
  

  return (
    <main className="bg-white m-4 p-4">
      {/* AGE INPUT */}
      <div>
        <form className="form mb-12" onSubmit={handleSubmit}>
          <div className="flex w-full mb-12">
            <div>
              <label htmlFor="day" className="text-grey text-sm">DAY</label>
              <input
                className="border font-bold rounded border-grey w-full px-6 py-2"
                type="number"
                placeholder="DD"
                onChange={handleChange}
                name="day"
                value={formData.day}
                
              />
            </div>
            <div>
              <label htmlFor="month" className="text-grey text-sm">MONTH</label>
              <input
                className="border font-bold rounded border-grey w-full px-6 py-2"
                type="number"
                placeholder="MM"
                onChange={handleChange}
                name="month"
                value={formData.month}
              />
            </div>
            <div>
              <label htmlFor="year" className="text-grey text-sm">YEAR</label>
              <input
                className="border font-bold rounded border-grey w-full px-6 py-2"
                type="number"
                placeholder="YYYY"
                onChange={handleChange}
                name="year"
                value={formData.year}
              />
            </div>
          </div>
          <div className="border border-black relative"></div>
          <div className="flex justify-center w-14 h-14 absolute top-32 right-24 bg-purple rounded-full">
          <button><Arrow /></button>
          </div>
          
        </form>
      </div>

      {/* AGE OUTPUT */}
      <div>
        <h1 className="text-5xl italic font-bold"><span className="text-purple font-extrabold text-6xl italic">{age.years}</span> years</h1>
        <h1 className="text-5xl italic font-bold"><span className="text-purple font-extrabold text-6xl italic">{age.months}</span> months</h1>
        <h1 className="text-5xl italic font-bold"><span className="text-purple font-extrabold text-6xl italic">{age.days}</span> days</h1>
      </div>
    </main>
  );
}
