import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Onboard from "./pages/onboard/Onboard";
import Home from "./pages/home/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import Body from "./Body";

function App() {
  return (
    <>
      <Provider store={store}>
        <Body />
      </Provider>
    </>
  );
}

export default App;
