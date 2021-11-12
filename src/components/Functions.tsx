import * as React from 'react';
import { ProductType } from '../model/models';

export const useProducts = () => {
    const [products, setProducts] = React.useState<ProductType[]>([]);

    React.useEffect(() => {
        fetch(
          "https://assets.fc-dev.instore.oakley.com/assets/products/products.json"
        )
          .then((res) => res.json())
          .then((products) => setProducts(products));
    }, []);

    return products;
}