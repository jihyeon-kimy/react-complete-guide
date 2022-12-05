import { Link, Navigate, Redirect, Route, Routes } from "react-router-dom";
import Comments from "./components/comments/Comments";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NewQuotes from "./pages/NewQuote";
import NotFound from "./pages/NotFound";
import QuoteDetail from "./pages/QuoteDetail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/quotes" />} />
        <Route path="/quotes" element={<AllQuotes />} />
        <Route path="/quotes/:quoteId/*" element={<QuoteDetail />}>
          {/* 중첩 라우팅을 모아서 표현할 수 있다. */}
          <Route
            path=""
            element={
              <div className="centered">
                <Link className="btn--flat" to="comments">
                  Load comments
                </Link>
              </div>
            }
          />
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route path="/new-quote" element={<NewQuotes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
export default App;
