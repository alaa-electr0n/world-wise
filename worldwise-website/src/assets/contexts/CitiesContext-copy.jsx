import { createContext, useEffect, useContext, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentSelectedCity: {},
  error: "",
};

function reducerfn(state, action) {
  switch (action.type) {
    //first the loading is on
    case "loading":
      return { ...state, isLoading: true };
    // set the cities array and set loading again to false after that
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    // get the city data from the id
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentSelectedCity: action.payload,
      };

    //create new City using post request
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentSelectedCity: action.payload,
      };

    // deleting a city from the city list using id and post request
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentSelectedCity: {},
      };

    // set is Loading false as the request is rejected and setting the error to be handeled in the UI
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentSelectedCity, error }, dispatch] =
    useReducer(reducerfn, initialState);

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentSelectedCity, setCurrentSelectedCity] = useState({});

  //Fetch the City List
  useEffect(function () {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        // console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There is Error Fetching the cities...",
        });
      }
    }
    fetchData();
  }, []);

  //fetch one City According to its ID
  //it won't be used inside use effect in the context as we want to fetch the data when reached the component no on the APP first mount

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      // console.log(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There is an Error Loading the City Data...",
      });
    }
  }

  async function createNewCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch("http://localhost:9000/cities", {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There is Error creating the city ...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There is Error in deleting the city ...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        createNewCity,
        error,
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
