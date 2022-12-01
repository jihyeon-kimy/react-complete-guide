import { useParams } from "react-router-dom";
// 동적 경로 기능을 실제로 활용하려면 로드된 컴포넌트 내부에서 url에 입력된 구체적인 값에 액세스 해야 한다.

const ProductDetail = () => {
  const params = useParams();

  console.log(params.productId);

  return (
    <section>
      <h1>Product Detail</h1>
      <p>{params.productId}</p>
    </section>
  );
};

export default ProductDetail;
