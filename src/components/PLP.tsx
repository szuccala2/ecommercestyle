import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import Product from './Product';
import styled from 'styled-components';
import { ProductType } from '../model/models';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useProducts } from './Functions';

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
    grid-template-columns: 25% 25% 25% 25%;
    row-gap: 15px;
`;

const ProductList: React.FC = () => {
    const selected = useSelector((state: RootState) => state.selectedFilter.selectedFilter);
    const searchTerm = useSelector((state: RootState) => state.searchFilter.searchFilter);
    const products = useProducts();

    return (
        <ExtGridDiv>
            <Header />
            <ContainerGrid>
                <ProdGridDiv>
                    {products && products
                    .filter((prod: ProductType)=>{
                        switch(selected) {
                        case "in":
                            return prod.availability.stock>0;
                        case "out":
                            return prod.availability.stock<=0;
                        default:
                            return true;
                        }
                    })
                    .filter((prod: ProductType)=>{return prod.name.toLowerCase().includes(searchTerm.toLowerCase())})
                    .map((prod: ProductType, _: number) => (
                        <Product prod={prod} det={false} key={prod.UPC} />
                    ))}
                </ProdGridDiv>
            </ContainerGrid>
            <Footer />
        </ExtGridDiv>
    );
}

export default ProductList;