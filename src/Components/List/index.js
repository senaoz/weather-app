import { useContext } from "react";
import LocContext from "../../Context/LocationProvider";

export default function List() {
  const { loading, data, hourly, city, country } = useContext(LocContext);
  var ourDate = new Date();
  var Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <>
      <h1 className="mb-2 mt-14 text-center">
        {city ? `${city}, ${country}` : "Current Location"}
      </h1>

      <div className="flex rounded-xl px-6 mb-14 text-xl justify-center">
        {Days[ourDate.getDay()] +
          " | " +
          (loading ? "Loading.." : Math.round(hourly[0].temp) + "°")}
      </div>

      <section className="grid my-4 grid-cols-7 border rounded-xl p-4 shadow-md">
        {hourly.map((hours, index) => (
          <div key={index + 1} className="grid text-center">
            <span className="font-bold">
              {index == 0 ? "Now" : ourDate.getHours() + index}
            </span>
            <span>{loading ? "..." : Math.round(hours.temp) + "°"}</span>
          </div>
        ))}
      </section>
      <section className="grid my-4 grid-cols-1 md:grid-cols-2 border rounded-xl px-4 md:p-0 md:border-none md:gap-4 shadow-md">
        <div className="box text-opacity-50 text-sm md:hidden">
          8-DAY FORECAST
        </div>
        {data.map((days, index) => (
          <div key={index + 1} className="box">
            <span className="w-1/2">
              {index == 0 ? "Today" : Days[ourDate.getDay() + index]}
            </span>
            <span className="w-1/2">
              {loading
                ? "Loading.."
                : Math.round(days.temp.min) +
                  "° - " +
                  Math.round(days.temp.max) +
                  "°"}
            </span>
          </div>
        ))}
      </section>
    </>
  );
}
