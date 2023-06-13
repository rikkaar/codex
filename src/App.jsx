import {BrowserRouter} from "react-router-dom";
import AppRouter from "@components/AppRouter.jsx";
import NavBar from "@components/NavBar.jsx";

function App() {

  return (
      <BrowserRouter>
          <div className={"site-container"}>
              <NavBar/>
              <AppRouter/>
          </div>
      </BrowserRouter>
  )
}

export default App