import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();
  const { quoteId } = params;
  // 객체 구조 분해할당을 사용하는 이유는 params객체 대신 의존성으로, 쿼트 ID를 전달할 수 있기 때문이다. 이는 파라미터가 변경될 때마다 이 효과가 다시 실행된다는 말이다.
  // 여기서는 파라미터가 하나 뿐이지만, 만약 더 많은 파라미터가 있다면 이 효과를 예기치 않게 다시 실행할 수 있다. 그래서, 가능한 한 정확하게 객체 구조 분해 할당을 해서 사용하는 것이 좋다.

  const { sendRequest, data: loadedQuote, error, status } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  // loadedQuote에 text가 없는지 확인.
  if (!loadedQuote.text) {
    return <p>No quote found</p>;
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Outlet />
      {/* 중첩라우팅이 어디에 위치해야 하는지 알리는 역할 */}
    </>
  );
};

export default QuoteDetail;
