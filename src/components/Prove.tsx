import * as React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid-template-areas: 
        'uno uno uno uno'
        'due due due tre'
        'qua qua qua qua';
    grid-gap: 10px;
    background-color: blue;
    padding: 10px;
    width: 500px;

    & > div {
        background-color: lightblue;
    }
`;

const Uno: React.FC = () => {
    return (
        <div style={{gridArea: 'uno', textAlign: 'center'}}>
            Uno
        </div>
    );
}

const Due: React.FC = () => {
    return (
        <div style={{gridArea: 'due', textAlign: 'center'}}>
            Due
        </div>
    );
}

const Tre: React.FC = () => {
    return (
        <div style={{gridArea: 'tre', textAlign: 'center'}}>
            Tre
        </div>
    );
}

const Quattro: React.FC = () => {
    return (
        <div style={{gridArea: 'qua', textAlign: 'center'}}>
            Quattro
        </div>
    );
}

const Prova: React.FC = () => {
    return (
        <Grid>
            <Uno />
            <Due />
            <Tre />
            <Quattro />
        </Grid>
    );
}

export default Prova;