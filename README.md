This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Decisions taken to design and code the game.

There are 3 Files i.e. App.js, utility.js and reducer.js:-

1. utility.js contains the constants and helper functions
2. reducer.js acts as a controller for App.js
3. `App.js` is the view part of our game

we are using `useReducer` instead of `useState`. since, we are updating two entities at the same time. It helps in performance improvement. if we would have used `useState` component would have rendered twice when updating two entities at the same.

we have two useffects, one is to focus the div initially and the other one helps in
setting the session and checking if player reached the goal on state change which only renders when position or goal changes.

we have `initialState` object in `App.js` which has the initial state for the reducer

`reducer.js` contains all the logic part of the app like updating position and all.
