import { useState, useEffect } from "react";
import { homeProducts } from "../services/api";

import ProductCard from "../components/ProductCard";
import SkeletonProductCard from "../skeletons/SkeletonProductCard";

function Home() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);


  useEffect(() => {
    homeProducts().then((datos) => {
      console.log(datos);
      setDatos(datos);
      setCargando(false);
    });
  }, []);
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {
        cargando ? (
        <SkeletonProductCard />
      ) : (
        datos.map(dato =>
        <div key={dato.id} className="m-3">
          <ProductCard
            id={dato.id}
            imageUrl={dato.image}
            description={dato.description}
            price={dato.price}
          />
          </div>
          )
        )
      }
    </div>
  );
}

export default Home;
