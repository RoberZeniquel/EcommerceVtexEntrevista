import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useProduct } from "vtex.product-context";

const CalculadorCuotas = ({ cantidadCuotas }) => {
  const productContext = useProduct();

  if (!productContext || !productContext.product) {
    return null;
  }

  const price = productContext.product.priceRange.sellingPrice.highPrice;

  if (!price) {
    return <p>No hay información de precio disponible.</p>;
  }

  const precioPorCuota = price / cantidadCuotas;

  return (
    <div className="calculadora-cuotas">
      <style>{`
        .calculadora-cuotas {
          font-size: 14px;
          color: #4b4b4b;
          font-weight: 700;
        }
        .calculadora-cuotas strong {
          color: #259c2d;
        }
      `}</style>
      <p>
        {cantidadCuotas} cuotas sin interés de{" "}
        <strong>${precioPorCuota.toFixed(2)}</strong>
      </p>
      
    </div>
  );
};

CalculadorCuotas.propTypes = {
  cantidadCuotas: PropTypes.number,
};

CalculadorCuotas.defaultProps = {
  cantidadCuotas: 12,
};

CalculadorCuotas.schema = {
  title: "Calculadora de Cuotas",
  description: "Muestra el precio en cuotas sin interés en la tarjeta del producto.",
  type: "object",
  properties: {
    cantidadCuotas: {
      title: "Cantidad de cuotas",
      type: "number",
      default: 12,
    },
  },
};


export default CalculadorCuotas;
