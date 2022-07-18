import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LocContext from "../../Context/LocationProvider";

export default function SearchBox() {
  const [form, setForm] = useState(" ");
  const { loc, setLoc, setCity, setCountry, setData, setHourly, setLoading } =
    useContext(LocContext);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${
          form.length !== 0 ? form : ""
        }&limit=1&appid=${process.env.REACT_APP_API_OPENWEATHERMAP}`
      )
      .then((city) => {
        setCity(city.data[0].name);
        setCountry(city.data[0].country);
        setLoc("lat=" + city.data[0].lat + "&lon=" + city.data[0].lon);
      })
      .then(() => {
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?${loc}&exclude=current,minutely,alerts&appid=${process.env.REACT_APP_API_OPENWEATHERMAP}&units=metric&lang=en`
        )
          .then((res) => res.json())
          .then((data) => {
            setData(data.daily);
            setHourly(data.hourly.slice(0, 7));
          });
      });
  }, [form]);

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="group relative" onSubmit={onSubmit}>
      <svg
        width="20"
        height="20"
        fill="currentColor"
        className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        />
      </svg>
      <input
        className="searchBox focused"
        type="text"
        name="city"
        placeholder="Search places..."
        onChange={(e) => setForm(e.target.value)}
      />
    </form>
  );
}
