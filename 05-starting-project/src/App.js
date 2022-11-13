import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. async와 await
  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true); // 로딩이 시작할때 상태변화 발생
    setError(null); // 이전에 받았을 수도 있는 오류를 초기화
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong");
      } //fetch API는 실패하면 데이터를 보내지 않기 때문에 파싱 전에 오류처리를 해줘야 한다.

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message); // 에러 호출
    }
    setIsLoading(false);
  }, []);

  // 최초 로딩 시, 데이터 가져오기
  // useEffect 함수 내에서 사용하는 모든 의존성을 의존성 배열에 표시해두는 것이 가장 좋다. 여기서는 fetchMovieHandler가 대상. 허나 이것은 함수이고 객체이기 때문에, 컴포넌트 재 렌더링 시 함수 역시 바뀐다는 문제가 있다.
  // 해결책 1. 의존성 배열을 비운다.(하지만 함수가 외부 상태를 사용하면 의도치 않은 버그가 생길 수 있다.)
  // 해결책 2. useCallback (가장 좋은 해결책)

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  // 2. then 체인 사용
  // function fetchMovieHandler() {
  //   fetch("https://swapi.dev/api/films/")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //       setMovies(transformedMovies);
  //     });
  // }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
