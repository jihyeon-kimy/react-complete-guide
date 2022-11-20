import React, { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailalbeMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 컴포넌트가 렌더링될 때 항상 이 컴포넌트 안에서 로딩 데이터로 시작하기 때문에 초기값을 true로 해주어도 괜찮다.
  const [httpError, setHttpError] = useState(null); // null을 설정해서 처음에 값을 갖지 않는다는 목적을 더 분명히 알린다.

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-6df0d-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // fetch가 실패했음에도, Loading... 이 계속 표시되는 문제
    // try {
    //   fetchMeals();
    // } catch (error) {
    //   setIsLoading(false);
    //   setHttpError(error.message);
    // }

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {/* {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && mealsList.length === 0 && <p>Found no meals</p>}
      {!isLoading && mealsList.length > 0 && ( */}
      <Card>
        <ul>{mealsList}</ul>
      </Card>
      {/* )} */}
    </section>
  );
};

export default AvailalbeMeals;
