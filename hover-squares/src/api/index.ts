export const getModes = async () =>
  await fetch(`${process.env.REACT_APP_GET_MODES}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err?.message));
