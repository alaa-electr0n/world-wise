import { useCities } from "../../contexts/CitiesContext";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import CountryItem from "./CountryItem";

import styles from "./CountryList.module.css";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Start visit some Places and choose them from the map" />
    );

  //Derived State
  const countriesList = cities.reduce((citiesArray, currCity) => {
    if (!citiesArray.map((el) => el.country).includes(currCity.country))
      return [
        ...citiesArray,
        { country: currCity.country, emoji: currCity.emoji },
      ];
    else return citiesArray;
  }, []);

  console.log(countriesList);

  return (
    <ul className={styles.countryList}>
      {countriesList.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
