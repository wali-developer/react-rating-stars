# ⭐ React Rating Stars

A simple, customizable, and lightweight React rating component with **full, half, and empty star support**.  
Built with [React Icons](https://react-icons.github.io/react-icons/) — works with **React** and **Next.js**.

[![NPM](https://img.shields.io/npm/v/@wali-developer/react-rating-stars.svg)](https://www.npmjs.com/package/@wali-developer/react-rating-stars)
[![License](https://img.shields.io/npm/l/@wali-developer/react-rating-stars.svg)](https://github.com/wali-developer/react-rating-stars/blob/main/LICENSE)

---

## 🚀 Demo

Check out the live demo: [React Rating Stars Demo](https://codesandbox.io/p/sandbox/friendly-leftpad-hk2gdm)

---

## 📦 Installation

```bash
npm install @wali-developer/react-rating-stars
# or
yarn add @wali-developer/react-rating-stars
# or
pnpm add @wali-developer/react-rating-stars

```

## Usage

import React, { useState } from "react";
import { Rating } from "@wali-developer/react-rating-stars";

export default function App() {
const [rating, setRating] = useState(2.5);

return (

<div>
<h2>Rate this product</h2>
<Rating
        maxStars={5}
        value={rating}
        onChange={setRating}
        size={30}
      />
</div>
);
}

## Props

| Prop           | Type                      | Default     | Description                          |
| -------------- | ------------------------- | ----------- | ------------------------------------ |
| `value`        | `number`                  | `0`         | Controlled rating value              |
| `defaultValue` | `number`                  | `0`         | Initial value for uncontrolled usage |
| `onChange`     | `(value: number) => void` | `-`         | Callback fired when rating changes   |
| `max`          | `number`                  | `5`         | Maximum number of stars              |
| `size`         | `number`                  | `24`        | Size of each star in pixels          |
| `readOnly`     | `boolean`                 | `false`     | Disables interaction if true         |
| `className`    | `string`                  | `""`        | Custom class name for wrapper        |
| `showLabel`    | `boolean`                 | `false`     | Shows numeric label next to stars    |
| `filledColor`  | `string`                  | `"#F59E0B"` | Color of filled stars                |
| `emptyColor`   | `string`                  | `"#CBD5E1"` | Color of empty stars                 |
| `halfColor`    | `string`                  | `"#F59E0B"` | Color of half-filled stars           |
| `allowHalf`    | `boolean`                 | `false`     | Enables half-star selection          |

## Features

⭐ Full, half, and empty star ratings

⚡ Lightweight, no external heavy deps

🎯 Works with React & Next.js

🎨 Customizable size and colors

♿ Keyboard accessible (Arrow keys)

## License

MIT © [Wali Ullah](https://github.com/wali-developer)
