import React, { useEffect, useReducer } from "react";
import "./App.css";

// CONSTANTS
// @desc --  since width of the playground is 700px and that of player and goal is 90
// @desc -- So, keeping max width limit as playground - width of player & thus for height

const MAX_LEFT = 610;
const MAX_TOP = 360;

const initialState = {
  position: { left: 20, top: 20 },
  goal: { left: MAX_LEFT - 20, top: MAX_TOP - 20 },
  level: 0,
  lastFivePosition: [{ left: 20, top: 20 }],
  undoIndex: 1,
};

const newPosition = (max) => {
  let randomNumber = Math.floor(Math.random() * max);
  return randomNumber - (randomNumber % 10);
};

const handleLastFivePosition = (lastFivePosition, newPosition) => {
  let updatedLastFivePosition = [...lastFivePosition];
  if (lastFivePosition.length === 6) updatedLastFivePosition.shift();
  updatedLastFivePosition.push(newPosition);
  return updatedLastFivePosition;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TOP":
      return {
        ...state,
        position: { ...state.position, top: action.payload },
        lastFivePosition: handleLastFivePosition(state.lastFivePosition, {
          ...state.position,
          top: action.payload,
        }),
        undoIndex: handleLastFivePosition(state.lastFivePosition, {
          ...state.position,
          top: action.payload,
        }).length,
      };
    case "UPDATE_LEFT":
      return {
        ...state,
        position: { ...state.position, left: action.payload },
        lastFivePosition: handleLastFivePosition(state.lastFivePosition, {
          ...state.position,
          left: action.payload,
        }),
        undoIndex: handleLastFivePosition(state.lastFivePosition, {
          ...state.position,
          left: action.payload,
        }).length,
      };
    case "UNDO":
      if (state.undoIndex === 1) return state;
      return {
        ...state,
        position: state.lastFivePosition[state.undoIndex - 2],
        undoIndex: state.undoIndex - 1,
        lastFivePosition:
          state.undoIndex === 2
            ? [state.lastFivePosition[0]]
            : state.lastFivePosition,
      };
    case "GOAL_REACHED":
      return {
        ...state,
        goal: { top: newPosition(MAX_TOP), left: newPosition(MAX_LEFT) },
        level: state.level + 1,
      };
    default:
      return state;
  }
};

const App = () => {
  const [
    { position, goal, level, lastFivePosition, undoIndex },
    dispatch,
  ] = useReducer(reducer, initialState);
  console.log(undoIndex, lastFivePosition);

  useEffect(() => {
    if (position.left === goal.left && position.top === goal.top) {
      console.log("test");
      dispatch({ type: "GOAL_REACHED" });
    }
  }, [position, goal]);

  const onKeyDown = ({ keyCode }) => {
    console.log("onKeyDown", keyCode);
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
    <div className="container" tabIndex="0" onKeyDown={onKeyDown}>
      <div className="undo-score">
        <h4
          onClick={() => dispatch({ type: "UNDO" })}
          style={{ cursor: undoIndex === 1 ? `not-allowed` : `pointer` }}
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
