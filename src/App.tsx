import './App.css';
import ProductDetails from './components/ProductDetails';
import PLP from './components/PLP';
import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/prod/:id" component={ProductDetails} />
      <Route exact path="/" component={PLP} />
    </Switch>
  );
}

export default App;
