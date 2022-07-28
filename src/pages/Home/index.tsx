import React from "react";
import getCharacters from "../../services/getCharacters";
import CharacterFilter from "../../components/Filter/CharacterFilter";
import Results from "../../components/Results";

export default function Home() {
  return (
    <Results
      title="Characters"
      filterComponent={CharacterFilter}
      getData={getCharacters}
    />
  );
}
