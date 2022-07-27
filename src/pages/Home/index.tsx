import React from "react";
import getCharacters from "../../services/getCharacters";
import Grid from "../../components/Grid";
import CharacterFilter from "../../components/Filter/CharacterFilter";
import Results from "../../components/Results";

export default function Home({ title }: { title: string }) {
  return (
    <Results
      title="Characters"
      filterComponent={CharacterFilter}
      getData={getCharacters}
      grid={Grid}
    />
  );
}
