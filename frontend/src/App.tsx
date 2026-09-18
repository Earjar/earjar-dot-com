import './App.css'
import RouteProvider from './routes/RouteProvider'
import { ParentWrapper } from "./components/index.ts";
import "@earjar/react-buttons/dist/index.css";

 function App() {
  return (
    <ParentWrapper>
      <RouteProvider />
    </ParentWrapper>
  );
}
export default App;