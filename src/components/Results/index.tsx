import React, { FunctionComponent } from "react";
import { Type } from "typescript";

type resultProps = {
  title: string;
  type: Type;
  filterComponent: FunctionComponent;
  getData: Function;
};

export default function Results({
  title,
  type,
  filterComponent,
  getData,
}: resultProps) {
  return <h1>{title}</h1>;
}
