import React, {useEffect, useCallback, useState} from 'react'
import axios from '../../axios-order';
import styles from './CocktailDetails.module.scss';
import { Link, useParams } from 'react-router-dom';
import Button from '../Button/Button';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function CocktailDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const fetchDetails = useCallback( async () => {

    const response = await axios.get(`/lookup.php?i=${id}`);
    const { drinks } = response.data;
    if (drinks) {
      const cocktail = drinks[0];
      const ingredientArr = Object.keys(cocktail).reduce((prevArr, igKey) => {
        if (igKey.startsWith('strIngredient') && cocktail[igKey] !== null) {
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
    }
  }, [id]);

  useEffect(() => {
    fetchDetails()
  }, [id, fetchDetails]);

  let content = null;
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
