import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { convertToEmoji, formatDate } from "../../utilities/utiliFunctions";
import { useCities } from "../../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import BackButton from "../Button/BackButton";

function City() {
  //Step 3: using the data from the url in the UI by "useParams" hook
  // Using UseParams to read the parameter that we passed with the same param name /:id
  const { id } = useParams();
  const { currentCity, getCity, isloading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, emoji, date, notes } = currentCity;
  // //using Search queries :
  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  if (isloading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
