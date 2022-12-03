import { Link, Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  { id: "q1", author: "jihyeon", text: "life is beautiful" },
  { id: "q2", author: "kim", text: "learning react is fun!" },
];

const QuoteDetail = () => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (!quote) {
    return <p>No quote found</p>;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      {/* 중첩 라우팅으로 URL을 근거로 다른 콘텐츠를 상황에 따른 렌더할 수 있다. */}
      {/* Load comments가 "/quotes/:quoteId" 경로 일때에만 보이고, 실제 Comments 컴포넌트가 보일 때에는 Load comments가 보이지 않는다. */}
      <Route path="/quotes/:quoteId" exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${params.id}/comments`}>
            Load comments
          </Link>
        </div>
      </Route>
      <Route path={`/quotes/${params.id}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
