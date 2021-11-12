import * as React from 'react';
import Product from './Product';
import { useParams } from "react-router-dom";
import { ProductType } from '../model/models';
import styled from 'styled-components';
import { useProducts } from './Functions';

const ProdGridDiv = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    row-gap: 15px;
`;

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id : string }>();
    const product = useProducts().find((prod:ProductType) => prod.UPC===id);

    return product ? <ProdGridDiv><Product prod={product} det={true}/></ProdGridDiv> : null;
}

export default ProductDetails;