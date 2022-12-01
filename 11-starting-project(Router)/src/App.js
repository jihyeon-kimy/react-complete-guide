import { Route, Switch, Redirect } from "react-router-dom"; // Route는 실제 컴포넌트가 된다. 특정 경로를 정의한 다음 URL에서 경로가 활성화될 때 로드되어야 하는 리액트 컴포넌트를 정의하는 컴포넌트이다.
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        {/* react 라우터는 url을 평가하고, url을 기반으로 올바른 컴포넌트를 랜더링 하는지 확인한다.  */}
        <Switch>
          <Route path="/welcome">
            <Welcome />
          </Route>
          {/* exact를 사용하는 경우에는, 정확히 일치할 때에만 리액트에 일치한다고 알려주게 된다. 시작 부분만 확인하는 것이 아닌 전체경로가 일치하는지 확인하게 한다.  */}
          {/* 이제는 세부정보 페이지가 '/products'와 일치하지 않는다.  */}
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:productId">
            <ProductDetail />
          </Route>
          {/* 경로를 잘못 입력했을 때를 위한 리다이렉트 페이지를 만든다.  */}
          <Route path="*">
            <Redirect to="/welcome" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
