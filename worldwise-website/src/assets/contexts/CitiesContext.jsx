import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSelectedCity, setCurrentSelectedCity] = useState({});

  //Fetch the City List
  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        // console.log(data);
        setCities(data);
      } catch {
        throw new Error("Error fetching the Data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  //fetch one City According to its ID
  //it won't be used inside use effect in the context as we want to fetch the data when reached the component no on the APP first mount

  //prevent infinte requests because of including it in the useEffect , by using useCallback
  const getCity = useCallback(
    async function getCity(id) {
      //if it the same city don't fetch again
      if (Number(currentSelectedCity.id) === id) return;
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:9000/cities/${id}`);
        const data = await res.json();
        // console.log(data);
        setCurrentSelectedCity(data);
      } catch {
        throw new Error("Error fetching the Data");
      } finally {
        setIsLoading(false);
      }
    },
    [currentSelectedCity.id]
  );

  async function createNewCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:9000/cities", {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setCities((prevCities) => [...prevCities, data]);
    } catch {
      throw new Error("Error sending the city data to API");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });

      setCities((prevCities) => prevCities.filter((city) => city.id !== id));
    } catch {
      throw new Error("Error in deleting the city..");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        createNewCity,
        deleteCity,
        currentCity: currentSelectedCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Context used outside its provider");

  return context;
}

export { CitiesProvider, useCities };
