import { Route, Switch } from "wouter";
import { useEffect, useState, useRef } from "react";
import Resume from "./Resume";

import "./App.css";
import Menu from "./Menu";
function Screen({}) {
  // By default, show the menu
  const [active, setActive] = useState(true);
  // When an option on the menu is clicked, obtain the string word to figure out which component to render
  const [component, setComponent] = useState("Menu");
  // When the menu is clicked, set active to false to hide the menu
  return (
    <>
      {/* {active ? (
        <Menu setActive={setActive} setComponent={setComponent} />
      ) : component === "Resume" ? (
        <Resume setActive={setActive} />
      ) : null} */}
      <Switch>
        <Route path="/" component={Menu} />
        <Route path="/resume" component={Resume} />
      </Switch>
    </>
  );
}
export default Screen;
