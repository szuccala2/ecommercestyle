import React, { useState, useLayoutEffect, MouseEvent } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { productsActions } from '../store/actions';
import { searchFilterSelector, selectedFilterSelector } from "../store/selectors";

const SearchBarWrapper = styled.div`
    position: relative;
    margin-top: 8px;
    margin-left: 10px;
    display: flex;
`;

const Input = styled.input`
    font-size: 17px;
    padding: 10px;
    display: block;
    height: 34px;
    width: 21vw;
    border: 1px solid rgb(100,100,100,0.5);
    border-radius: 3px;
    &:focus {
      outline: none;
      border: 2px solid #1976D2;
    }
`;

const Label = styled.label`
    color: gray;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 13px;
    top: 13px;
    transition: 0.2s ease all;
    ${Input}:focus ~ & {
      top: -10px;
      font-size: 13px;
      color: #1976D2;
      background-color: white;
      width: 40px;
      padding-left: 5px;
    }

    &.up {
      top: -10px;
      font-size: 13px;
      color: #1976D2;
      background-color: white;
      width: 40px;
      padding-left: 5px;
    }
`;

const ResetButton = styled.button `
    background-color: rgb(25, 118, 210);
    position: relative;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 3px;
    font-size: 14px;
    height: 35px;
    margin-top: 8px;
    margin-left: 15px;
    cursor: pointer;
    transition: 0.4s;
    box-shadow: 1px 2px 2px -1px grey;

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

const SearchBox: React.FC = () => {
  const searchTerm = useSelector(searchFilterSelector);
  const dispatch = useDispatch();

  const ResetButtonWrapper: React.FC = () => {
    return (
    <ResetButton id="reset" onClick={() => dispatch(productsActions.setSearchFilter(""))} >
      RESET
      <Ripple color="rgb(255,2555,255,0.5)"/>
    </ResetButton>
  )};

  return (
  <SearchBarWrapper>
    <Input value={searchTerm} onChange={(e) => dispatch(productsActions.setSearchFilter(e.target.value))} />
    <Label className={searchTerm==="" ? "" : "up"}>search</Label>
    <ResetButtonWrapper />
  </SearchBarWrapper>
)};

const ToggleButton = styled.button`
  background-color: white;
  color: rgb(21, 101, 192, 0.9);
  padding: 10px 15px;
  box-shadow: 0px 1.5px #888888;
  font-weight: 500;
  font-size: 0.875rem;
  height: 36px;
  min-width: 64px;
  padding: 5px 15px;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  overflow: hidden;
  position: relative;

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

  &:hover {
    background-color: rgb(21, 101, 192, 0.1);
    cursor: pointer;
    border: 1px solid rgb(21, 101, 192);
  }

  &.active {
    background-color: rgb(21, 101, 192, 0.9);
    color: white;

    &:hover {
      background-color: rgb(21, 101, 192);
    }
  }

  @media (max-width: 1230px) {
    height: 72px;
    padding: 10px;
  }
`;

const ToggleButtonsWrapper = styled.div`
  display: flex;
  margin-top: 22px;

  @media (max-width: 1230px) {
    margin: 5px;
  }
`;

const ToggleButtons: React.FC = () => {
  const selected = useSelector(selectedFilterSelector);
  const dispatch = useDispatch();
  
  return (
  <ToggleButtonsWrapper>
    <ToggleButton className={selected==="in" ? "in active" : "in"}
      onClick={() => 
        selected === "in"
        ? dispatch(productsActions.setSelectedFilter("none"))
        : dispatch(productsActions.setSelectedFilter("in"))}
    >IN STOCK<Ripple/></ToggleButton>
    <ToggleButton className={selected==="out" ? "out active" : "out"}
      onClick={() => 
        selected === "out"
        ? dispatch(productsActions.setSelectedFilter("none"))
        : dispatch(productsActions.setSelectedFilter("out"))}
    >OUT OF STOCK<Ripple/></ToggleButton>
  </ToggleButtonsWrapper>
)};

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 30% 35% 35%;
`;

const BoxDiv = styled.div`
  border-bottom: 1px solid black;
`;

const Header: React.FC = () => {
  return (
    <BoxDiv>
      <GridDiv>
        <img src="https://via.placeholder.com/150x80" alt="logo" />
        <ToggleButtons />
        <SearchBox />
      </GridDiv>
    </BoxDiv>
  );
}

export default Header;