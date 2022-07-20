import React from "react";
import "./App.css";
import Header from "./components/Header";
import Results from "./pages/Results";
import { Route } from "wouter";

function App() {
  return (
    <>
      <Header />
      <Route path="/">{(params) => <Results title="Characters" />}</Route>
      <Route path="/characters/:id?">
        {(params) => <Results title="Characters" id={params.id} />}
      </Route>
      <Route path="/locations/:id?">
        {(params) => <Results title="Locations" id={params.id} />}
      </Route>{" "}
      <Route path="/episodes/:id?">
        {(params) => <Results title="Episodes" id={params.id} />}
      </Route>
    </>
  );
}

export default App;
