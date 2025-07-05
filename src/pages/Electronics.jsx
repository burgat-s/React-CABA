import { useState, useEffect } from "react";
import { electronicsProducts } from "../services/api";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";
import ProductCard from "../components/ProductCard";
import SkeletonProductCard from "../skeletons/SkeletonProductCard";

function Electronics() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    electronicsProducts()
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
  }, []);

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

export default Electronics;
