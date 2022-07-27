import React from "react";
import LocationFilter from "../../components/Filter/LocationFilter";
import Grid from "../../components/Grid";
import LocationCard from "../../components/LocationCard";
import Results from "../../components/Results";
import getLocations from "../../services/getLocations";

export default function Locations({ id }: { id?: string }) {
  if (id) return <h1>Location with id {id}</h1>;
  else
    return (
      <Results
        title="Locations"
        filterComponent={LocationFilter}
        getData={getLocations}
        grid={Grid}
        colSize={6}
      />
    );
}
