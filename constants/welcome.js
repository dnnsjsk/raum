export const welcome = {
  html: `<h1>Hello friend, code away! :-)</h1>`,
  css: `:root {
  --space: clamp(0.875rem, 5vw, 2rem);
}

body {
  margin: 0;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

* {
  box-sizing: border-box;
}
  
h1 {
  background: white;
  font-family: sans-serif;
  padding: var(--space);
  border-radius: 0.5rem;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid #ebebeb;
  font-size: var(--space);
  animation: colorize;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  color: lightseagreen;
}

@keyframes colorize {
  from {
    filter: hue-rotate(0deg);
  }

  to {
    filter: hue-rotate(360deg);
  }
}`,
};
