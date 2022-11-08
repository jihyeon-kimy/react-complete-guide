import React, { useState } from "react";

// 컴포넌트는 아니지만, 컴포넌트를 포함할 객체이기 때문에 파스칼 케이스로 표기
const AuthContext = React.createContext({
  isLoggedIn: false, // 초기값 false
  onLogout: () => {}, // IDE 자동 완성을 더 좋게 만들기 위해서, 더미 함수를 넣어주는 것
});

export default AuthContext;

// 앱에서 컨텍스트를 사용하려면, 2가지 작업 필요
// 1.공급(=JSX 코드로 감싸는 것) : 리액트에게 알려주기 <AuthContext.Provider>로 context를 사용할 컴포넌트를 감싸주기. AuthContext.Provider은 컴포넌트이다 그래서 JSX에서 사용할 수 있음
// 2.소비: 연동하고 리스닝해야 한다. <AuthContext.Consumer>로 실제로 사용할 컴포넌트를 감싸준다.
// 소비자는 자식으로 함수를 갖는다.
