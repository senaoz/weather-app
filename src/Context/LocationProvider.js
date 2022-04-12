import { createContext, useState, useEffect } from "react";

const LocContext = createContext();

export const LocProvider = ({ children }) => {
  const [loc, setLoc] = useState("lat=41.0868&lon=29.0459");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [city, setCity] = useState();
  const [country, setCountry] = useState();

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
        }, 5000);
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
