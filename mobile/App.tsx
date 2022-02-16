import Routes from "./src/routes";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  return <Routes />;
}
