import React from "react";
import "./App.css";
import Header from "./components/Header";
import CharacterGrid from "./pages/CharacterGrid";
import { Route } from "wouter";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <Header />
      <Route path="/">{(params) => <CharacterGrid title="Characters" />}</Route>
      <Route path="/characters/:id?">
        {(params) => <CharacterGrid title="Characters" id={params.id} />}
      </Route>
      <Route path="/locations/:id?">
        {(params) => <h1>Localizaciones</h1>}
      </Route>{" "}
      <Route path="/episodes/:id?">{(params) => <h1>Episodios</h1>}</Route>
      <Route path="/search/:keyword">
        {(params) => <SearchResults keyword={params.keyword} />}
      </Route>
    </>
  );
}

export default App;
