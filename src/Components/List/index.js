import { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
  //let lat = "33.44";
  //let lon = "-94.04";

  const [loc, setLoc] = useState("lat=41.0868&lon=29.0459");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
        }, 100);
      });

      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?${loc}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_API_OPENWEATHERMAP}&units=metric&lang=en`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result.daily.slice(0, 7));
        });
    };
    console.log(data[0].weather[0].main);
    fetchData();
  }, [loc]);

  return (
    <>
      <h1 className="my-4">Hello</h1>
      <div className="box">
        {loading ? "Loading.." : JSON.stringify(data[0].temp)}
      </div>
      <section className="grid gap-4 my-4 grid-cols-6 md:grid-cols-2">
        {data.slice(1, 7).map((days, index) => (
          <div key={index + 1} className="box">
            {loading ? "Loading.." : JSON.stringify(days.temp.day)}
          </div>
        ))}
      </section>
    </>
  );
}
