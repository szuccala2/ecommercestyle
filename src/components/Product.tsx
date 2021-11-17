import * as React from 'react';
import { useHistory } from "react-router-dom";
import { ProductType } from '../model/models';
import styled from 'styled-components';

const Chip = styled.div`
    background-color: rgb(204, 204, 204, 0.4);
    padding: 8px 12px 8px 12px;
    border-radius: 20px;
    font-size: 13px;
    width: 45px;
    margin-bottom: 15px;
`;

const InStockChip: React.FC = () => (
    <Chip>
        in stock
    </Chip>
)

const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    width: 97%;
    margin: 0 auto;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    max-height: 62vh;

    &:hover {
        cursor: pointer;
    }
`;

const CardDes = styled.div`
    margin-top: -5px;
    padding-left: 15px;
    overflow: hidden;
`;

const Text = styled.p`
    &.name {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        padding-top: 12px;
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 1.334;
        letter-spacing: 0em;
        padding-top: 12px;
    }

    &.price {
        font-size: 20px;
        color: grey;
    }
`;

const Image = styled.img`
    width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

export const ProductCard: React.FC<{product: ProductType}> = ({ product }) => {
    var history = useHistory();
    return (
        <Card onClick={()=>{history.push(`/prod/${product.UPC}`)}}>
            <Image src="https://via.placeholder.com/350" alt="prodImg" />
            <CardDes>
                <Text className="name">{product.name}</Text>
                <Text className="price">{product.price.current.value}$</Text>
                {product.availability.stock > 0 && <InStockChip />}
            </CardDes>
        </Card>
    );
}

const ProdDetGrid = styled.div`
    display: grid;
    grid-template-areas: 
        'title title title title title'
        'img   det   det   det   det  ';
    width: 80%;
    margin-top: -35px;
`;

const Title: React.FC<{title: string}> = ({title}) => {
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
                <Title title={product ? product.name : ""} />
                <DetImage alt={ `img${product?.UPC}` } src={`https://picsum.photos/800/400?random=${product?.UPC}`} />
                <ProdDet product={product} />
            </ProdDetGrid>
        </div>
    );
}