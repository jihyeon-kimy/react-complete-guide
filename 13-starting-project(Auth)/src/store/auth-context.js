import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

// 1. AuthContext 상수를 추가한다.
// 초기화를 여기서 해주는데, 초기화를 하면 컨텍스트의 전반적인 형태를 정의할 수 있고 나중에 자동완성도 잘 된다.
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); // 현재 타임 스템프(ms)
  // ms으로 리턴하면, setTimeout에서 바로 사용할 수 있다.
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime"); // localStorage는 동기라서 이런식으로 작성하는 것이 가능하다.

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  // 1분보다 작으면
  if (remainingTime <= 6000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return;
  }

  return { token: storedToken, duration: remainingTime };
};

// 2. 인증과 관련된 상태를  관리하는 컴포넌트를 만든다.(래퍼로 사용하여, 다른 컴포넌트가 컨텍스트에 접근할 수 있도록 하는 용도)
export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
    // 초기에 토큰을 설정했다면, 타이머도 설정해야한다. 여기서는 logoutHandler를 사용할 수 없으니, useEffect를 사용하여 뒷 부분에 작성해보자.
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token; // !!는 참 또는 거짓 값을 불리언으로 바꿔준다.

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);
  // localStorage와 clearTimeout은 브라우저 빌티인 함수이기 때문에, 의존성 배열을 추가하지 않아도 된다.
  // setToken도 상태 업데이트 함수라서 리액트가 바뀌지 않는 것을 보장해서, 적어주지 않아도 된다.
  // logoutTimer는 전역 변수라 랜더링 흐름 바깥에 있기 때문에 추가할 필요가 없다.

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime); // 고려해야 할 것은, localStorage에 저장되는 것은 문자열이어야 한다는 것이다. 미리 문자열로 변환함

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
    // setTimeout은 레퍼런스와 id를 리턴하기 때문에, 변수에 저장할 수 있다.
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);
  // tokenData의 값을 만들어주는 함수 retrieveStoredToken이 컴포넌트 밖에 있으므로 초기에만 실행된다(렌더링 흐름 바깥에 있다).
  // logoutHandler는 useCallback으로 감싸준다.

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
