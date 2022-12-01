import { Route } from "react-router-dom"; // Route는 실제 컴포넌트가 된다. 특정 경로를 정의한 다음 URL에서 경로가 활성화될 때 로드되어야 하는 리액트 컴포넌트를 정의하는 컴포넌트이다.
import MainHeader from "./components/MainHeader";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        {/* react 라우터는 url을 평가하고, url을 기반으로 올바른 컴포넌트를 랜더링 하는지 확인한다.  */}
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
      </main>
    </div>
  );
}

export default App;
