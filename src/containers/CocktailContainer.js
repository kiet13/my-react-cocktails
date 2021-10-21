import React, { useState, useEffect, useCallback } from 'react'
import axios from '../axios-order';
import styles from './CocktailContainer.module.scss'
import Navigation from '../components/Navigation/Navigation';
import SearchForm from '../components/SearchForm/SearchForm';
import CocktailList from '../components/CocktailList/CocktailList';
import About from '../pages/About/About';
import { Switch, Route } from 'react-router-dom'


export default function CocktailContainer() {
  const [cocktailList, setCocktailList] = useState([]);
  const [term, setTerm] = useState("");
  const [error, setError] = useState(false);
  const fetchItems = useCallback(async () => {
    try {
      const response = await axios.get(`/search.php?s=${term}`);
      const { drinks } = response.data;
      if (drinks) {
        const newCocktailList = drinks.map(item => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strGlass,
          } = item;

          return {
            id: idDrink,
            name: strDrink,
            img: strDrinkThumb,
            glass: strGlass
          };
        })

        setCocktailList(newCocktailList);
        setError(false);
      }
    } catch {
      setError(true);
    }
    
  }, [term]);

  useEffect(() => {
    fetchItems();
  }, [term, fetchItems]);

  const onTermChange = (event) => {
    setTerm(event.target.value);
  }

  let cocktails = <p>Not found!</p>;
  if (!error) {
    cocktails = <CocktailList cocktails={cocktailList} />
  }

  return (
    <div className={styles.CocktailContainer}>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <SearchForm changed={onTermChange}/>
            {cocktails}
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>

        
    </div>
    
  )
}
