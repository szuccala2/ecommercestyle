import React, { useState, useLayoutEffect, MouseEvent } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions } from '../store/actions';
import { searchFilterSelector, selectedFilterSelector } from "../store/selectors";

const ExtGrid = styled.div`
    display: grid;
    height: fit-content;
    grid-template-columns: 2fr 2fr 2fr;
    grid-template-areas: 'logo toggle search';
    border-bottom: 1px solid black;
    grid-area: 'header';
    font-size: 2rem;
`;

const ToggleButton = styled.button`
    position: relative;
    background-color: white;
    color: rgb(21, 101, 192, 0.9);
    box-shadow: 0px 1.5px #888888;
    font-weight: 500;
    font-size: 0.875rem;
    letter-spacing: 0.02857em;
    padding: 10px 15px;
    height: 40px;

    @media (max-width: 650px) {
        height: 72px;
        padding: 5px 10px;
    }

    &.in {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: 1px solid rgb(21, 101, 192);
    }

    &.out {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border: 1px solid rgb(21, 101, 192, 0.5);
    }

    &.active {
        background-color: rgb(21, 101, 192, 0.9);
        color: white;

        &:hover {
            background-color: rgb(21, 101, 192);
        }
    }
`;

const ToggleButtonWrapper = styled.div`
    display: flex;
    margin-top: 20px;

    @media (max-width: 650px) {
        margin: 3px 10px;
    }
`;

const ToggleButtonBox : React.FC = () => {
    const selected = useSelector(selectedFilterSelector);
    const dispatch = useDispatch();

    return(
        <ToggleButtonWrapper>
            <ToggleButton className={selected==="in" ? "in active" : "in"}
                onClick={() => 
                selected === "in"
                ? dispatch(productsActions.setSelectedFilter("none"))
                : dispatch(productsActions.setSelectedFilter("in"))}>IN STOCK<Ripple/></ToggleButton>
            <ToggleButton className={selected==="out" ? "out active" : "out"}
                onClick={() => 
                selected === "out"
                ? dispatch(productsActions.setSelectedFilter("none"))
                : dispatch(productsActions.setSelectedFilter("out"))}>OUT OF STOCK<Ripple/></ToggleButton>
        </ToggleButtonWrapper>
    );
}

const SearchBar = styled.input`
    font-size: 1.063rem;
    border: 1px solid rgb(100,100,100,0.5);
    border-radius: 3px;
    height: 50px;
    width: 20vw;
    padding-left: 10px;

    &:focus {
      outline: 2px solid #1976D2;
    }
`;

const SearchLabel = styled.label`
    color: gray;
    font-size: 1.125rem;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    top: 15px;
    left: 15px;
    transition: 0.2s ease all;

    ${SearchBar}:focus ~ & {
      top: -8px;
      font-size: 0.813rem;
      color: #1976D2;
      background-color: white;
      width: 40px;
      padding-left: 3px;
    }

    &.up {
      top: -8px;
      font-size: 0.813rem;
      color: #1976D2;
      background-color: white;
      width: 40px;
      padding-left: 3px;
    }
`;

const ResetButton = styled.button`
    background-color: rgb(25, 118, 210);
    position: relative;
    color: white;
    border: none;
    border-radius: 3px;
    font-size: 0.875rem;
    height: 35px;
    cursor: pointer;
    transition: 0.4s;
    box-shadow: 1px 2px 2px -1px grey;
    padding: 10px 15px;
    top: 8px;
    left: 15px;

    &:hover {
      background-color: rgb(21, 101, 192);
      box-shadow: 1px 2px 10px -1px grey;
    }

    &:active {
      box-shadow: 0px 10px 15px -1px grey;
      opacity: 0.7;
      transition: 0.5s;
    }
`;

const RippleContainer = styled.div<{color: string, duration: number}>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    opacity: 0.75;
    background-color: ${props => props.color};
    animation-name: ripple;
    animation-duration: ${props => props.duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;

const useDebouncedRippleCleanUp = (rippleCount: number, duration: number, cleanUpFunction:()=>void) => {
  useLayoutEffect(() => {
    let bounce: null | NodeJS.Timeout = null;
    if (rippleCount > 0) {
      bounce && clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        bounce && clearTimeout(bounce);
      }, duration * 4);
    }

    return () => {bounce && clearTimeout(bounce)};
  }, [rippleCount, duration, cleanUpFunction]);
};

const Ripple = ({ duration = 850, color = "#fff" }) => {
  const [rippleArray, setRippleArray] = useState<{x: number, y:number, size: number}[]>([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = (event: MouseEvent) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <RippleContainer duration={duration} color={color} onMouseDown={addRipple}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={"span" + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size
              }}
            />
          );
        })}
    </RippleContainer>
  );
};

Ripple.propTypes = {
  duration: PropTypes.number,
  color: PropTypes.string
};

const SearchWrapper = styled.div`
    display: flex;
    position: relative;
    top: 10px;
`;

const SearchBox : React.FC = () => {
    const searchTerm = useSelector(searchFilterSelector);
    const dispatch = useDispatch();

    return (
        <SearchWrapper>
            <SearchBar value={searchTerm} onChange={(e) => dispatch(productsActions.setSearchFilter(e.target.value))} />
            <SearchLabel className={searchTerm==="" ? "" : "up"}>search</SearchLabel>
            <ResetButton onClick={() => dispatch(productsActions.setSearchFilter(""))}>RESET<Ripple/></ResetButton>
        </SearchWrapper>
    );
}

const Header : React.FC = () => {
    return (
        <ExtGrid>
            <img alt='logo' src="https://via.placeholder.com/150x80" />
            <ToggleButtonBox />
            <SearchBox />
        </ExtGrid>
    );
}

export default Header;