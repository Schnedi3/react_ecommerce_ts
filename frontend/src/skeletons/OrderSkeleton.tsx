import "./order_skeleton.css";

export const OrderSkeleton = () => {
  const orderItems = Array.from({ length: 3 });

  return (
    <li className="order_skeleton container">
      {orderItems.map((_, index) => (
        <article key={index}>
          <img />

          <div>
            <h3></h3>
            <div>
              <p></p>
              <p></p>
              <p></p>
            </div>

            <p></p>
          </div>

          <p></p>
        </article>
      ))}
    </li>
  );
};
