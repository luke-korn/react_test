export const new_board = (size = 4) => {
  const ba = Array.from(Array(size * size).keys())
  ba.sort(()=> Math.random() - 0.5)
  const a = [];
  let v = 0;
  for (let i = 0; i < size ; i++) {
    const inner = Array(size);
    a.push(inner);
    for (let j = 0; j < size; j++) {
      a[i][j] = ba[v++];
    }
  }
  return a;
};

