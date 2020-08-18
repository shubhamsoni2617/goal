import React, { useEffect, useReducer, useRef } from "react";
import "./App.css";
import reducer from "./reducer";
import { MAX_TOP, MAX_LEFT } from "./utility";

const session = JSON.parse(sessionStorage.getItem("game")) || {};
const initialState = {
  position: session.position || { left: 20, top: 20 },
  goal: session.goal || { left: MAX_LEFT - 20, top: MAX_TOP - 20 },
  level: session.level || 0,
  lastFivePosition: session.lastFivePosition || [{ left: 20, top: 20 }],
  undoIndex: session.undoIndex || 1,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { position, goal, level, undoIndex } = state;
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("game", JSON.stringify(state));
    if (
      state.position.left === state.goal.left &&
      state.position.top === state.goal.top
    ) {
      dispatch({ type: "GOAL_REACHED" });
    }
  }, [state]);

  const onKeyDown = ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        if (position.left === 0) return;
        return dispatch({ type: "UPDATE_LEFT", payload: position.left - 10 });
      case 38:
        if (position.top === 0) return;
        return dispatch({ type: "UPDATE_TOP", payload: position.top - 10 });
      case 39:
        if (position.left === MAX_LEFT) return;
        return dispatch({ type: "UPDATE_LEFT", payload: position.left + 10 });
      case 40:
        if (position.top === MAX_TOP) return;
        return dispatch({ type: "UPDATE_TOP", payload: position.top + 10 });
      default:
        break;
    }
  };

  return (
    <div ref={ref} className="container" tabIndex="0" onKeyDown={onKeyDown}>
      <div className="undo-score">
        <h4
          onClick={() => dispatch({ type: "UNDO" })}
          style={{
            cursor: undoIndex === 1 ? `not-allowed` : `pointer`,
            color: undoIndex === 1 ? `gainsboro` : ``,
          }}
        >
          Undo upto 5 Steps
        </h4>
        <h4>Score: {level}</h4>
      </div>
      <div className="playground">
        <span className="item" style={position}>
          Player
        </span>
        <span className="item goal" style={goal}>
          Goal
        </span>
      </div>
    </div>
  );
};

export default App;
