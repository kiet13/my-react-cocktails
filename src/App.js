import { BrowserRouter as Router } from 'react-router-dom';
import CocktailBuilder from './containers/CocktailBuilder';

function App() {
  return (
    <Router>
      <CocktailBuilder />
    </Router>
  );
}

export default App;
