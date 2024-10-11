import styles from "./home_skeleton.module.css";

export const HomeSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <section className={styles.homeSkeleton}>
      {skeletonItems.map((_, index) => (
        <article key={index}>
          <img />
          <div>
            <h3></h3>
            <div>
              <h4></h4>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
