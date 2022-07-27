import React from "react";
import { Badge } from "react-bootstrap";

export default function StatusBadge({ status }: { status: string }) {
  const statusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "success";
      case "Dead":
        return "danger";
      case "unknown":
        return "secondary";
    }
  };

  return <Badge bg={statusColor(status)}>{status}</Badge>;
}
