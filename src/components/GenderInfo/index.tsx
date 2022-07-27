import React from "react";

export default function GenderInfo({ gender }: { gender: string }) {
  let iconName: string;
  switch (gender) {
    case "Male":
      iconName = "bi bi-gender-male";
      break;
    case "Female":
      iconName = "bi bi-gender-female";
      break;
    case "Genderless":
      iconName = "bi bi-slash-circle";
      break;
    default:
      iconName = "bi bi-question-circle";
      break;
  }
  return (
    <span>
      <i className={iconName} /> {gender}
    </span>
  );
}
