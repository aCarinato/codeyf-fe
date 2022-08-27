export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const checkboxSelection = (
  e,
  stateArray,
  setStateArray,
  allSelectedOptions
) => {
  let currentSelection = [];
  currentSelection = stateArray.slice();

  if (arrayEquals(currentSelection, [])) {
    currentSelection.push(e.target.value);
    setStateArray(currentSelection);
  } else if (arrayEquals(currentSelection, allSelectedOptions)) {
    if (e.target.checked) {
      currentSelection = [];
      currentSelection.push(e.target.value);
    } else {
      const index = currentSelection.indexOf(e.target.value);
      currentSelection.splice(index, 1);
    }

    setStateArray(currentSelection);
  } else {
    if (currentSelection.includes(e.target.value)) {
      const index = currentSelection.indexOf(e.target.value);
      currentSelection.splice(index, 1);
      if (arrayEquals(currentSelection, [])) {
        setStateArray(allSelectedOptions);
      } else {
        setStateArray(currentSelection);
      }
    } else {
      currentSelection.push(e.target.value);
      setStateArray(currentSelection);
    }
  }
};
