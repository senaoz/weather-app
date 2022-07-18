import { createContext, useState, useEffect } from "react";

const LocContext = createContext();

export const LocProvider = ({ children }) => {
  const [loc, setLoc] = useState("lat=41.0868&lon=29.0459"); // Istanbul is default location
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [city, setCity] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLoc(
        "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude
      );
    });

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?${loc}&exclude=current,minutely,alerts&appid=${process.env.REACT_APP_API_OPENWEATHERMAP}&units=metric&lang=en`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.daily);
        setHourly(data.hourly.slice(0, 7));
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  const values = {
    loc,
    setLoc,
    loading,
    data,
    hourly,
    city,
    country,
    setLoading,
    setHourly,
    setData,
    setCity,
    setCountry,
  };
  return <LocContext.Provider value={values}>{children}</LocContext.Provider>;
};

export default LocContext;
