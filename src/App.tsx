import './App.css';
import * as React from 'react';
import ProductDetails from './components/PDP';
import PLP from './components/PLP';
import {
  Switch,
  Route
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { productsActions } from './store/actions';
import { ProductType } from './model/models';

const App : React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch(
      "https://assets.fc-dev.instore.oakley.com/assets/products/products.json"
    )
    .then((res) => res.json())
    .then((products) => {
      const prods = products.map((prod : Omit<ProductType, "img">) => {
        const vars = prod.variants.map((va : Omit<ProductType, "variants">) => {
          return {
            UPC: va.UPC,
            name: va.name,
            price: va.price,
            availability: va.availability,
            img: `https://picsum.photos/800/400?random=${va.UPC}`
          }
        });

        return {
          UPC: prod.UPC,
          name: prod.name,
          price: prod.price,
          availability: prod.availability,
          img: `https://picsum.photos/800/400?random=${prod.UPC}`,
          variants: vars
        };
      })

      console.log("prods", prods);
      dispatch(productsActions.setProducts(prods));
    });
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/prod/:id" component={ProductDetails} />
      <Route exact path="/" component={PLP} />
    </Switch>
  );
}

export default App;
