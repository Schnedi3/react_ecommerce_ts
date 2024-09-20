import { useFetchProduct } from "../../hooks/useFetch";
import { useCartContext } from "../../context/useCartContext";
import "./detail.css";

export const Detail = () => {
  const { product, loading, error } = useFetchProduct();
  const { cart, addToCart } = useCartContext();

  if (!product) return <p>Failed to load product</p>;
  if (loading) return <p>Loading</p>;
  if (error) return <p>{error}</p>;

  const { images, title, price, description } = product;

  return (
    <section className="detail_container container">
      <img src={images[0]} alt={product.title} />
      <article className="detail_info">
        <h2>{title}</h2>
        <h3>{price}$</h3>
        <p>{description}</p>
        {cart.map((item) => (
          <button key={item.id} onClick={() => addToCart(product)}>
            {item.id === product.id ? "Already on cart" : "Add to Cart"}
          </button>
        ))}
      </article>
    </section>
  );
};
