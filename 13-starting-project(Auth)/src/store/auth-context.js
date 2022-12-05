import React, { useState } from "react";

// 1. AuthContext 상수를 추가한다.
// 초기화를 여기서 해주는데, 초기화를 하면 컨텍스트의 전반적인 형태를 정의할 수 있고 나중에 자동완성도 잘 된다.
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// 2. 인증과 관련된 상태를  관리하는 컴포넌트를 만든다.(래퍼로 사용하여, 다른 컴포넌트가 컨텍스트에 접근할 수 있도록 하는 용도)
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token; // !!는 참 또는 거짓 값을 불리언으로 바꿔준다.

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  // 2-1. Context 상수에서 정의한 변수들의 값을 매칭하고, return <AuthContext.Provider value ={}>에 value값을 넣어준다.
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext; // *export default가 상수인것 확인!
