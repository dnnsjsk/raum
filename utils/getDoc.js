export function getDoc(css, html, js) {
  return btoa(
    `<html lang="en"><head><style>${css}</style><title>Raum</title></head><body><div>${html}</div><script type="module">${js}</script></body></html>`
  );
}
