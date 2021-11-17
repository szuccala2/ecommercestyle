import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import { ProductCard } from './Product';
import styled from 'styled-components';
import { ProductType } from '../model/models';
import { useSelector } from 'react-redux';
import { useProducts } from './Functions';
import { selectedFilterSelector, searchFilterSelector } from '../store/selectors';

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

const ProductList: React.FC = () => {
    const selected = useSelector(selectedFilterSelector);
    const searchTerm = useSelector(searchFilterSelector);
    const products = useProducts();

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