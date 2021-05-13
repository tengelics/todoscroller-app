export const dummyTaskHelper = () => {
  let dummyArray = [];
  for (let i = 1; i <= 30; i++) {
    dummyArray.push({
      taskName: `${i}. task`,
      hardness: Math.floor(Math.random() * 5) + 1,
    });
  }
  return dummyArray;
};
