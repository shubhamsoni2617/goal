import { MAX_TOP, MAX_LEFT, newPosition } from "./utility";

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

export default reducer;
