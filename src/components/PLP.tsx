import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { ProductType } from '../model/models';
import { useSelector } from 'react-redux';
import { selectedFilterSelector, searchFilterSelector, productsSelector } from '../store/selectors';
import { useHistory } from 'react-router-dom';

const ExtGridDiv = styled.div`
    min-height: 100vh;
    position: relative;
`;

const ContainerGrid = styled.div`
    width: 99%;
    margin: 16px auto 0 auto;
    padding-bottom: 90px;
`;

const ProdGridDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 15px;
`;

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

const ProductCard: React.FC<{product: ProductType}> = ({ product }) => {
    var history = useHistory();
    return (
        <Card onClick={()=>{history.push(`/prod/${product.UPC}`)}}>
            <Image src={product.img} alt={`prodImg${product.UPC}`} />
            <CardDes>
                <Text className="name">{product.name}</Text>
                <Text className="price">{product.price.current.value}$</Text>
                {product.availability.stock > 0 && <InStockChip />}
            </CardDes>
        </Card>
    );
}

const ProductList: React.FC = () => {
    const selected = useSelector(selectedFilterSelector);
    const searchTerm = useSelector(searchFilterSelector);
    const products = useSelector(productsSelector);

    return (
        <ExtGridDiv>
            <Header />
            <ContainerGrid>
                <ProdGridDiv>
                    {products && products
                    .filter((product: ProductType)=>{
                        switch(selected) {
                        case "in":
                            return product.availability.stock>0;
                        case "out":
                            return product.availability.stock<=0;
                        default:
                            return true;
                        }
                    })
                    .filter((product: ProductType)=>{return product.name.toLowerCase().includes(searchTerm.toLowerCase())})
                    .map((product: ProductType, _: number) => (
                        <ProductCard product={product} key={product.UPC} />
                    ))}
                </ProdGridDiv>
            </ContainerGrid>
            <Footer />
        </ExtGridDiv>
    );
}

export default ProductList;