import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { getAllQuotes } from "../lib/api";

const AllQuotes = () => {
  const { sendRequest, status, data: loadedQuote, error } = useHttp(getAllQuotes, true); // 두번째 인자를 true로 해두면, 로딩 상태에서 시작한다.

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

  if (status === "completed" && (!loadedQuote || loadedQuote.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuote} />;
};

export default AllQuotes;
