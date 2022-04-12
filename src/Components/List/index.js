import { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
  var ourDate = new Date();
  var Days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const [loc, setLoc] = useState("lat=41.0868&lon=29.0459");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hourly, setHourly] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setTimeout(() => {
          setLoc(
            "lat=" +
              position.coords.latitude +
              "&lon=" +
              position.coords.longitude
          );
          setLoading(false);
        }, 1000);
      });

      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?${loc}&exclude=current,minutely,alerts&appid=${process.env.REACT_APP_API_OPENWEATHERMAP}&units=metric&lang=en`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result.daily);
          setHourly(result.hourly.slice(0, 7));
        });
    };
    fetchData();
  }, [loc]);
  return (
    <>
      <h1 className="mb-0 mt-16 text-center">Hello</h1>

      <div className="flex rounded-xl px-6 justify-center">
        {Days[ourDate.getDay()] +
          " | " +
          (loading ? "Loading.." : Math.round(hourly[0].temp) + "°")}
      </div>

      <section className="grid my-4 grid-cols-7 border rounded-xl p-4">
        {hourly.map((hours, index) => (
          <div key={index + 1} className="grid text-center">
            <span>{index == 0 ? "Now" : ourDate.getHours() + index}</span>
            <span>{loading ? "..." : Math.round(hours.temp) + "°"}</span>
          </div>
        ))}
      </section>
      <section className="grid my-4 grid-cols-1 md:grid-cols-2 border rounded-xl px-4 md:p-0 md:border-none md:gap-4">
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
