This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Decisions taken to design and code the game.

There are 3 entities to focus on :-

1. `Playground`
2. `Goal`
3. `Player`

#### `Playground`

`Playground` acts as outerbound for `goal` and `player`. It is having a dimension of `700 x 450`. I have took fixed width and height to keep things simple.

#### `Goal`

`Goal` is having a dimension of `90 x 90`. It's initial position is bottom-right corner of the `playground`. The position of Goal is dynamically changed(using the `function newPosition` which is in `utility.js`.The function always gives position less than or equal to the outer bound of the `playground`. Also, the position is kept as multiple of 10. Again, to keep things simple. since, we will move the player by 10px in any direction such that player could reach the goal without much hurdles. ) to a new position everytime player reaches the goal which is being checked in `useEffect`.

#### `Player`

`Player` is also having a dimension of `90 x 90`. It's initial position is top-left corner of the `playground`. The position of player is updated on basis of `onKeyDown` which dispatches action to the reducer and thus changes the position of the player by `10px` in the direction based on the key pressed.

-------------------------------------------------------------------------------<br />

There are 3 major files i.e. App.js, utility.js and reducer.js:-

1. `utility.js` contains the constants and helper functions
2. `reducer.js` acts as a controller for App.js
3. `App.js` is the view part of our game

#### `reducer.js` - The controller of the game

`reducer.js` is the heart of this game. It handles all the logic of player movement and goal assignment. we are having 5 intital properties on the `reducer object` i.e. `position` as postion of player, `goal`, `level`, `lastFivePosition`and `undoIndex` which we change based on `action type`.

`lastFivePosition` is updated based on any change any player position. It's an array of object with maximum length of 6. The last item in array is the current position of the player.

`undoIndex` keeps track of the index( there is a little issue with the nomenclature here, though there is `index` in the name. however, it's acting as `nth` element of the array) which we update based on click of `undo button`.

#### `App.js` - The view part of the game

we have `initialState` object in `App.js` which has the initial state for the reducer
we have two useffects, one is to focus the div initially and the other one helps in
setting the session and checking if player reached the goal on state change which only renders when position or goal changes.
-------------------------------------------------------------------------------<br />

#### Session storage

we are saving all the game data in the session storage keeping key as `game` which is updated on any change in state.. since, session storage takes only string as the value of any given key. Hence, we are stringifying the data before saving and parsing while fetching it.

#### Steps taken to improve performance

we are using `useReducer` instead of `useState`. since, we are updating two entities at the same time. It helps in performance improvement. if we would have used `useState` component would have rendered twice when updating two entities at the same.

In the `onKeyDown` function we are checking if the `player` is at the border of `player` to refrain from dispatching any action and thus avoiding any potential rerender
