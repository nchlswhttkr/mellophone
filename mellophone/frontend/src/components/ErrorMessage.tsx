import React from "react";

interface Props {
  error?: Error;
}

export default function ErrorMessage({ error }: Props) {
  if (!error) return null;
  return <p style={{ color: "red" }}>{error.message}</p>;
}
