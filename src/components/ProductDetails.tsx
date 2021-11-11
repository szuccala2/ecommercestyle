import * as React from 'react';
import Product from './Product';
import { useParams } from "react-router-dom";
import { ProductType } from '../model/models';
import styled from 'styled-components';

const ProdGridDiv = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    row-gap: 15px;
`;

const ProductDetails: React.FC = () => {
    const [product, setProduct] = React.useState<ProductType>();
    const { id } = useParams<{ id : string }>();

    React.useEffect(() => {
        fetch(
          "https://assets.fc-dev.instore.oakley.com/assets/products/products.json"
        )
          .then((res) => res.json())
          .then((products) => 
          setProduct(products.find((prod:ProductType) => prod.UPC===id)));
    });

    return product ? <ProdGridDiv><Product prod={product} det={true}/></ProdGridDiv> : null;
}

export default ProductDetails;