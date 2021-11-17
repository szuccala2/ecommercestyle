import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useParams } from "react-router-dom";
import { ProductType } from '../model/models';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { productsSelector } from '../store/selectors';

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

const ProdDetGrid = styled.div`
    display: grid;
    grid-template-areas: 
        'title title title title title'
        'img   det   det   det   det  ';
    width: 80%;
    margin-top: -35px;
`;

const VariantTitle: React.FC<{title: string}> = ({title}) => {
    return (
        <h1 style={{gridArea: 'title'}}>{title}</h1>
    );
}

const DetImage = styled.img`
    grid-area: 'img';
`;

const DetElement = styled.h1`
    font-size: 18px;
    color: gray;
    display: flexbox;

    & > span {
        font-weight: bold;
        color: black;
    }
`;

const ProdDet: React.FC<{product: ProductType | Omit<ProductType, "variants"> | undefined}> = ({ product }) => {
    return (
        <div>
            <DetElement>Name: <span>{product ? product.name : ""}</span></DetElement>
            <DetElement>Price: <span>{product ? product.price.current.value : ""}$</span></DetElement>
            <DetElement>Stock: <span>{product ? product.availability.stock : ""}</span></DetElement>
            <DetElement>UPC: <span>{product ? product.UPC : ""}</span></DetElement>
        </div>
    );
}

export const ProductDetailsCard:
    React.FC<{product: ProductType | Omit<ProductType, "variants"> | undefined}> = ({ product }) => {
    return (
        <div>
            <ProdDetGrid>
                <VariantTitle title={product ? product.name : ""} />
                <DetImage alt={ `img${product?.UPC}` } src={product?.img} />
                <ProdDet product={product} />
            </ProdDetGrid>
        </div>
    );
}

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id : string }>();
    var product = useSelector(productsSelector).find((prod:ProductType) => prod.UPC===id);
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
            <VariantImage src={ product.img }
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