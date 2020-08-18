// @desc --  since width of the playground is 700px and that of player and goal is 90
// @desc -- So, keeping max width limit as playground - width of player & thus for height
export const MAX_LEFT = 610;
export const MAX_TOP = 360;

export const newPosition = (max) => {
  let randomNumber = Math.floor(Math.random() * max);
  return randomNumber - (randomNumber % 10);
};
