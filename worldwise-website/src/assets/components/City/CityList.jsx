import styles from "./CityList.module.css";
import Spinner from "../Spinner/Spinner";
import CityItem from "./CityItem";
import Message from "../Message/Message";
import { useCities } from "../../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return <Message message="Start choosing where you are traviling" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
