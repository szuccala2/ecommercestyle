import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import { ProductDetailsCard } from './Product';
import { useParams } from "react-router-dom";
import { ProductType } from '../model/models';
import styled from 'styled-components';
import { useProducts } from './Functions';

const ExtGridDiv = styled.div`
    min-height: 100vh;
    position: relative;
`;

const ContainerGrid = styled.div`
    width: 97%;
    margin: 16px auto 0 auto;
    padding: 10px 20px;
`;

const Title: React.FC = () => {
    return (
        <h3 style={{gridArea: 'title'}}>Available colors:</h3>
    );
}

const VariantGridDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 15px;
`;

const VariantImage = styled.img`
    cursor: pointer;
    width: 200px;
    height: 100px;
`;

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id : string }>();
    var product = useProducts().find((prod:ProductType) => prod.UPC===id);
    const [variant, setVariant] = 
        React.useState<ProductType | Omit<ProductType, "variants">>();
    const [temp, setTemp] = 
        React.useState<ProductType | Omit<ProductType, "variants"> | undefined>();

    React.useEffect(() => {
        setVariant(product);
        setTemp(product);
    }, [product]);

    const VariantCard:React.FC<{product: ProductType | Omit<ProductType, "variants">}>=({product}) => {
        return (
            <VariantImage src={ `https://picsum.photos/800/400?random=${product.UPC}` }
                onMouseEnter={ () => setVariant(product) }
                onMouseLeave={ () => setVariant(temp) }
                onClick={ () => setTemp(product) } />
        );
    }

    return (
        <ExtGridDiv>
            <Header />
            {product && variant ?
            <ContainerGrid>    
                <ProductDetailsCard product={variant} /> 
                <Title />
                <VariantGridDiv>
                    <VariantCard product={product} />
                    {product?.variants?.map((prod) => 
                        <VariantCard product={prod} key={prod.UPC} />)}
                </VariantGridDiv>
            </ContainerGrid> : null}
            <Footer />
        </ExtGridDiv>
    );
}

export default ProductDetails;