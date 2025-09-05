import { useState } from "react";
import { Rating } from "../src/Rating";

export default function App() {
  const [rating, setRating] = useState(2.5);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>⭐ React Rating Stars Demo</h1>
      <Rating value={rating} onChange={setRating} allowHalf size={40} />
      <p style={{ marginTop: "16px" }}>Current Rating: {rating}</p>
    </div>
  );
}
