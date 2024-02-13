export default function Home() {
  return (
    <main className="bg-white m-4 p-4">
      {/* AGE INPUT */}
      <div>
        <form>
          <div className="flex w-full mb-5">
            <div>
              <label htmlFor="day">DAY</label>
              <input
                className="border rounded border-grey w-full"
                name="day"
                id="day"
              />
            </div>
            <div>
              <label htmlFor="month">MONTH</label>
              <input
                className="border rounded border-grey w-full"
                name="month"
                id="month"
              />
            </div>
            <div>
              <label htmlFor="year">YEAR</label>
              <input
                className="border rounded border-grey w-full"
                name="year"
                id="year"
              />
            </div>
          </div>
          <div className="border border-black"></div>
        </form>
      </div>

      {/* AGE OUTPUT */}
      <div>
        <h1>years</h1>
        <h1>months</h1>
        <h1>days</h1>
      </div>
    </main>
  );
}
