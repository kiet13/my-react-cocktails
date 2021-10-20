import { BrowserRouter as Router } from 'react-router-dom';
import CocktailContainer from './containers/CocktailContainer';

function App() {
  return (
    <Router>
      <CocktailContainer />
    </Router>
  );
}

export default App;
