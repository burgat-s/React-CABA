const SkeletonProductCard = () => {
  return (
    <div className="card" style={{ width: "18rem", height: "100%" }}>
      <div
        className="card-img-top m-3"
        style={{
          height: "200px",
          backgroundColor: "#ccc",
          width: "calc(100% - 2rem)",
        }}
      />
      <div className="card-body" style={{ height: "calc(204px + 1rem)" }}></div>
    </div>
  );
};

export default SkeletonProductCard;