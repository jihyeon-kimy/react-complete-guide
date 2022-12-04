import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  // 페이지 history를 바꿀 수 있다. 즉 URL도 바꿀 수 있다.
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search); // 브라우저에 원래 있는 함수. 쿼리 매개변수를 편하게 추출할 수 있다.

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);
  // 쿼리 매개 변수를 바꿀 때마다 이 컴포넌트가 재실행될테니, 쿼리 매개 변수가 바뀔 때마다 sortedQuotes를 받을 수 있을 것.

  const ChangeSortingHandler = () => {
    history.push(`${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`); // location.push가 리랜더링 시킨다. 페이지를 push할 때, 지금 보고 있는 페이지일지라도 페이지 컴포넌트는 재평가된다.(react router는 history를 바꿨다고 봐서 페이지를 다시 렌더링하고, 그걸 띄운다.)

    // 아래처럼 작성할 수 도 있다.
    // history.push({
    //   pathname: location.pathname,
    //   search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    // });
  };
  // ChangeSortingHandler에서 수정할 것은 정렬 방식을 바꾸기 위해서 URL의 쿼리 매개 변수를 업데이트 하는 것이다. (useHistory : URL을 바꿀 수 있게 해준다.)
  // 그리고, 쿼리 매개 변수값을 읽어 정렬을 바꾼다. (useLocation : location 객체에 접속하게 한다. location 객체에는 최근 로드된 페이지와 url에 대한 정보가 있다.)

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={ChangeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
