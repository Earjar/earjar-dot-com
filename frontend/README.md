# Kamve Space - Frontend

## API

### Structure
```
src/
├── components/
│   ├── index.ts
│   └── ...
├── route/
│   └── RouteProvider.tsx
├── views/
│   ├── index.ts
│   └── ...
└── App.tsx
```
I use an `index.ts` file to export all components and views at once for cleaner imports
Example
```jsx
export { default as MyComponent } from "./path-to-component/MyComponent.txt"
```
OR
```jsx
export * as myComponents from "./path-to-component/MyComponent.txt"
```

#### Reusable Custom UI Components.

I have placed these components under /frontend/src/components/custom

- CustomButtons
These are simply my custom buttons

- CustomUI
These are also reusable UI components, but are more specific like; popups, cards, inputs, dividers, etc


#### Routing

Frontend routing is handled in `route/RouteProvider.tsx`:
```jsx
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import { TestView } from "../views";

export default function RouteProvider() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestView />} />
        <Route path="/*" element={<Navigate to="/" />} /> {/* fallback route */}
      </Routes>
    </Router>
  );
}
```

In `App.tsx` my views are renders like:
```jsx
import RouteProvider from './route/RouteProvider.tsx';

function App() {
  return <RouteProvider />;
}

export default App;
```

---