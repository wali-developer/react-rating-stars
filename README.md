# react-rating-stars

A customizable React star rating component with **half-star support**.

## Installation

```bash
npm install react-rating-stars
```

## Usage

import { CustomRating } from "react-star-rating-custom";

function App() {
const [rating, setRating] = useState(0);

return (
<CustomRating
            value={rating}
            onChange={setRating}
            allowHalf
            size={30}
            color="#facc15"
      />
);
}

## Props

value (number): Current rating

onChange (fn): Callback when rating changes

max (number): Default 5

allowHalf (boolean): Allow half stars

size (number): Star size

color (string): Filled star color

emptyColor (string): Empty star color

readOnly (boolean): Disable interaction
