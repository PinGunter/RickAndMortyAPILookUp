import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route } from "wouter";
import Locations from "./pages/Locations";
import { routes } from "./routes";

function App() {
  return (
    <>
      <Header />
      <Route path="/" component={Home} />
      <Route path={routes["characters"]} component={Home} />
      <Route path={`${routes["locations"]}/:id?`}>
        {(params) => <Locations id={params.id} />}
      </Route>{" "}
      <Route path={`${routes["episodes"]}/:id?`}>
        {(params) => <h1>Episodios</h1>}
      </Route>
    </>
  );
}

export default App;
