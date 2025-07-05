import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { homeProducts } from "../services/api";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";
import ProductCard from "../components/ProductCard";
import SkeletonProductCard from "../skeletons/SkeletonProductCard";

function Home() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { error } = useParams();

  useEffect(() => {
    homeProducts(error)
      .then((datos) => {
        setDatos(datos);
        setCargando(false);
      })
      .catch(() => {
        SwalReact(Swal).fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  }, [error]);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {cargando ? (
        <SkeletonProductCard />
      ) : (
        datos.map((dato) => (
          <div key={dato.id} className="m-3">
            <ProductCard product={dato} />
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
