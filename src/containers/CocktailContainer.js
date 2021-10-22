import React, { useState, useEffect, useCallback } from 'react'
import axios from '../axios-order';
import styles from './CocktailContainer.module.scss'
import Navigation from '../components/Navigation/Navigation';
import SearchForm from '../components/SearchForm/SearchForm';
import CocktailList from '../components/CocktailList/CocktailList';
import CocktailDetails from '../components/CocktailDetails/CocktailDetails';
import Loader from '../components/Loader/Loader';
import About from '../pages/About/About';
import handleError from '../error-handler';
import { Switch, Route, Redirect } from 'react-router-dom'


export default function CocktailContainer() {
  const [cocktailList, setCocktailList] = useState([]);
  const [term, setTerm] = useState("");
  const [error, setError] = useState({status: false, msg: "", type: ""});
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const [response, responseError] = await handleError(axios.get(`/search.php?s=${term}`));
      if (responseError) {
        throw new Error("Cannot fetch data");
      }

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
        setError({status: false, msg: "", type: ""});
      }
    } catch(e) {
      console.log(e);
      setError({status: true, msg: e.message, type: e.name});
    }
    setLoading(false);
  }, [term]);

  useEffect(() => {
    fetchItems();
  }, [term, fetchItems]);

  const onTermChange = (event) => {
    setTerm(event.target.value);
  }

  let cocktails = null;

  if (loading) {
    cocktails = <Loader />;
  }

  if (error.status) {
    cocktails = <p>{error.msg}</p>
  } else {
    cocktails = <CocktailList cocktails={cocktailList} />;
  }

  return (
    <div className={styles.CocktailContainer}>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <SearchForm changed={onTermChange}/>
            {cocktails}
          </Route>
          <Route path="/home">
            <Redirect to="/" />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/cocktail/:id">
            <CocktailDetails />
          </Route>
        </Switch>
    </div>
  )
}
