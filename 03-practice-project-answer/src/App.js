import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import MealsSummary from "./components/Meals/MealsSummary";

function App() {
  return (
    <>
      <Header />

      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
