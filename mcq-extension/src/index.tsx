import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* KOYL: Putting general thoughts over here...

Great stab at a first run! I wasn't lying when I say this was very impressive to get working!
Of course, there are some syntactical and logical decisions that I think we can clean up
but we shall get there!

*/

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <div className="site-container">
      <App />
    </div>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
