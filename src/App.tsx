import React, { useEffect, useReducer } from "react";
import "./App.css";

import styled from "styled-components";

const ContainerDiv = styled.div`
  display: flex,
  justif-content: center,
  flexWrap: wrap,
`;

const CardDiv = styled.div`
  width: 5rem,
  height: 5rem,
  cursor: pointer,
  background-color: #000000,
  margin: 1rem,
`;

type Card = {
  id: number;
  value: string;
  isVisible: boolean;
};

type State = {
  cards: Card[];
  round: number;
  firstCard: string;
  secondCard: string;
};

enum ActionKind {
  CLICK = "CLICK",
  COMPARE = "COMPARE",
}

type Action =
  | {
      type: ActionKind.CLICK;
      payload: {
        id: number;
        value: string;
      };
    }
  | {
      type: ActionKind.COMPARE;
    };

const initialState: State = {
  cards: [
    { id: 1, value: "1", isVisible: false },
    { id: 2, value: "2", isVisible: false },
    { id: 3, value: "3", isVisible: false },
    { id: 4, value: "4", isVisible: false },
    { id: 5, value: "5", isVisible: false },
    { id: 6, value: "6", isVisible: false },
    { id: 7, value: "1", isVisible: false },
    { id: 8, value: "2", isVisible: false },
    { id: 9, value: "3", isVisible: false },
    { id: 10, value: "4", isVisible: false },
    { id: 11, value: "5", isVisible: false },
    { id: 12, value: "6", isVisible: false },
  ],
  round: 0,
  firstCard: "",
  secondCard: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKind.CLICK:
      const id = action.payload.id;
      state.cards.forEach((card) => {
        if (card.id === id) {
          card.isVisible = true;
        }
      });

      if (!state.firstCard.length) {
        return { ...state, firstCard: action.payload.value };
      } else {
        return { ...state, secondCard: action.payload.value };
      }
    case ActionKind.COMPARE:
      if (state.firstCard === state.secondCard) {
        console.log("yayyy");
        return {
          ...state,
          firstCard: (state.firstCard = ""),
          secondCard: (state.secondCard = ""),
        };
      } else {
        console.log("nooo");

        return {
          cards: [
            { id: 1, value: "1", isVisible: false },
            { id: 2, value: "2", isVisible: false },
            { id: 3, value: "3", isVisible: false },
            { id: 4, value: "4", isVisible: false },
            { id: 5, value: "5", isVisible: false },
            { id: 6, value: "6", isVisible: false },
            { id: 7, value: "1", isVisible: false },
            { id: 8, value: "2", isVisible: false },
            { id: 9, value: "3", isVisible: false },
            { id: 10, value: "4", isVisible: false },
            { id: 11, value: "5", isVisible: false },
            { id: 12, value: "6", isVisible: false },
          ],
          round: state.round++,
          firstCard: "",
          secondCard: "",
        };
      }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    dispatch({
      type: ActionKind.CLICK,
      payload: { id, value: (e.target as Element).innerHTML },
    });
  };

  useEffect(() => {
    if (state.firstCard.length && state.secondCard.length) {
      setTimeout(() => {
        dispatch({ type: ActionKind.COMPARE });
      }, 1000);
    }
  }, [state.firstCard, state.secondCard]);

  return (
    <>
      <h2>ROUND {state.round}</h2>

      <ContainerDiv>
        {state.cards?.map((card) => (
          <CardDiv
            key={card.id}
            className={card.isVisible ? "clicked" : ""}
            onClick={(e) => handleClick(e, card.id)}
          >
            <span>{card.value}</span>
          </CardDiv>
        ))}
      </ContainerDiv>
    </>
  );
}

export default App;
