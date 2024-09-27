import "./home_skeleton.css";

export const HomeSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 });

  return skeletonItems.map((_, index) => (
    <article key={index} className="home_skeleton">
      <img />
      <div>
        <h3></h3>
        <div>
          <h4></h4>
        </div>
      </div>
    </article>
  ));
};
