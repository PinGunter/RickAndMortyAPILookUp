import React from "react";
import LocationFilter from "../../components/Filter/LocationFilter";
import LocationInfo from "../../components/LocationInfo";
import Results from "../../components/Results";
import getLocations from "../../services/getLocations";

export default function Locations({ id }: { id?: string }) {
  if (id) return <LocationInfo id={id} />;
  else
    return (
      <Results
        title="Locations"
        filterComponent={LocationFilter}
        getData={getLocations}
        colSize={6}
      />
    );
}
