/**
 * Replaces the URL bar history.
 */
export function setHistory(id) {
  history.replaceState(
    {
      id: id,
    },
    "",
    "/project/" + id
  );
}
