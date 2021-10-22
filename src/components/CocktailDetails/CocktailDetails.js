import React, {useEffect, useCallback, useState} from 'react'
import axios from '../../axios-order';
import styles from './CocktailDetails.module.scss';
import { useParams } from 'react-router-dom';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import handleError from '../../error-handler';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function CocktailDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({status: false, msg: "", type: ""});

  const fetchDetails = useCallback( async () => {
    setLoading(true);
    try {
      const [response, responseErr] = await handleError(axios.get(`/lookup.php?i=${id}`));
      if (responseErr) {
        setLoading(false);
        throw new Error("Cannot fetch data!");
      }

      const { drinks } = response.data;
      if (drinks) {
        const cocktail = drinks[0];
        console.log(cocktail);
        const ingredientArr = Object.keys(cocktail).reduce((prevArr, igKey) => {
          if (igKey.startsWith('strIngredient') && cocktail[igKey]) {
            prevArr.push(cocktail[igKey]);
          }
          return prevArr;
        }, []);

        const {
          strDrink,
          strDrinkThumb,
          strCategory,
          strAlcoholic,
          strGlass,
          strInstructions,
        } = cocktail;

        setDetails({
          name: strDrink,
          img: strDrinkThumb,
          category: strCategory,
          type: strAlcoholic,
          glass: strGlass,
          instructions: strInstructions,
          ingredients: ingredientArr
        });
        setError({status: false, msg: "", type: ""});
      }
    } catch(e) {
      console.log(e);
      setError({status: true, msg: e.message, type: e.name});
    }
    
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [id, fetchDetails]);

  let content = null;
  if (loading) {
    content = <Loader />;
  }

  if (error.status) {
    content = <p>{error.msg}</p>
  }

  if (details) {
    const ingredientArr = details.ingredients.map(ig => {
      return <Button key={ig}>{ig}</Button>;
    });

    const infoList = Object.keys(details).reduce((prevArr, dtKey) => {
      if (dtKey !== "img") {
        prevArr.push((
          <div key={dtKey} className={styles.InfoItem}>
            <span className={styles.InfoTitle}>{capitalize(dtKey)}:</span>
            <span>{dtKey !== "ingredients" ? details[dtKey] : ingredientArr}</span>     
          </div>
        ));
      } 
      return prevArr;
    }, []);

    content = (
      <>
        <h1 className="mb-5">{details.name}</h1>
        <div className={styles.CocktailDetails}>
          <img src={details.img} alt="cocktail glass" />
          <div className={styles.CocktailInfo}>
            {infoList}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={styles.CocktailDetailsContainer}>
      {content}
    </div>
  )
}
