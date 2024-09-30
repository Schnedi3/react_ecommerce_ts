import "./detail_skeleton.css";

export const DetailSkeleton = () => {
  const sizeItems = Array.from({ length: 4 });

  return (
    <section className="detail_skeleton container">
      <img />
      <article>
        <h2></h2>
        <h3></h3>
        <p></p>
        <ul>
          {sizeItems.map((_, index) => (
            <li key={index}>
              <button></button>
            </li>
          ))}
        </ul>
        <button></button>
      </article>
    </section>
  );
};
