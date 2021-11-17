import './App.css';
import Prova from './components/Prove';
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
      <Route path="/prova" component={Prova} />
      <Route exact path="/" component={PLP} />
    </Switch>
  );
}

export default App;
