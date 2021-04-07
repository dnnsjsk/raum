export function setHistory(id, set = false) {
  history.replaceState(
    {
      id: id,
    },
    "",
    set === false ? "/project/" + id : set
  );
}
