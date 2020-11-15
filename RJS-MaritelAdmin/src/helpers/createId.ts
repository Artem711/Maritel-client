export const createID = (prodsId: string[]) => {
  const id: string[] = [];

  for (let i = 0; i < 2; i++) {
    id.push(String.fromCharCode(Math.random() * (90 - 65) + 65));
  }

  id.push((Math.random() * (99999 - 1) + 1).toFixed(0).padStart(5, "0"));

  if (prodsId.some((prod) => prod === id.join("").toLocaleLowerCase())) {
    createID(prodsId);
  }

  return id.join("").toLocaleLowerCase();
};
