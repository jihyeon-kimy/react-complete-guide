import { Route } from "react-router-dom";
// 한 곳에서만 라우트를 정의하는 것이 아니라 원하는 곳 어디서나 라우트를 정의할 수 있다.

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      {/* 일부 콘텐츠를 표시하기 위해, '/products' 라우트를 설정하면, 아래  라우트는 '/porudcts'로 시작하는 경로에 대한 해당 시작 페이지에 있을 수 없기 때문에 활성화되지 않는다. */}
      <Route path="/products"></Route>
      {/* welcome페이지에서 아래 라우트는 활성화된다. /welcome을 방문하면 그 문단이 안 보이지만 /welcome/newuser를 방문하면 보인다.[중첩 라우팅]*/}
      {/* 다른 컴포넌트에서 라우트를 정의할수 있으므로 다른 라우트에서도 정의할 수 있다. 여기에서와 같이 더 구체적인 경로가 일치하는 경우 더 많은 콘텐츠를 로드할 수 있다. */}
      <Route path="/welcome/new-user">
        <p>Welcome, new user!</p>
      </Route>
    </section>
  );
};

export default Welcome;
