import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { formatDate } from "../../utilities/utiliFunctions";
import { useCities } from "../../contexts/CitiesContext";

function CityItem({ city }) {
  // console.log({ city });
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();
  // console.log(formatDate(date));

  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      {/* Step 2: set the Link that will go to the Element CITY by using the Route You Set using Params and using Queries also*/}
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          {" "}
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
