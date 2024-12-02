import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CalculadorEnvio = () => {
//   const [codigoPostal, setCodigoPostal] = useState("");
//   const [opcionesEnvio, setOpcionesEnvio] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (codigoPostal.length === 5) {
//       obtenerOpcionesEnvio();
//     }
//   }, [codigoPostal]);

//   const manejarCambioCodigoPostal = (evento) => {
//     setCodigoPostal(evento.target.value);
//   };

//   const respuestaSimulada = {
//     data: [
//       {
//         carrier: "Transportadora 1",
//         price: 1000,
//         deliveryTime: 5,
//         pickup: false // Envío a domicilio
//       },
//       {
//         carrier: "Transportadora 2",
//         price: 500,
//         deliveryTime: 3,
//         pickup: true // Retiro en tienda
//       },
//       {
//         carrier: "Transportadora 3",
//         price: 800,
//         deliveryTime: 4,
//         pickup: false // Envío a domicilio
//       },
//       {
//         carrier: "Transportadora 4",
//         price: 400,
//         deliveryTime: 2,
//         pickup: true // Retiro en tienda
//       }
//     ]
//   };

//   const obtenerOpcionesEnvio = async () => {
//     setError("");
//     try {
//       //const respuesta = await axios.get(`/api/checkout/pub/postal-code/${codigoPostal}`);
//       const respuesta = respuestaSimulada;
//       setOpcionesEnvio(respuesta.data);
//     } catch (err) {
//       setError("Error al obtener las opciones de envío. Verifica el código postal.");
//     }
//   };

  return (
    <div className="calculador-envio">
      <style>{`
        .contenido-popup {
          text-align: center;
          padding: 20px;
        }

        .opciones-envio {
          margin-top: 20px;
        }

        .mensaje-error {
          color: red;
        }
      `}</style>
        <div className="contenido-popup">
        <form>
            <label>
              Código postal:
              <input
                type="text"
                value={codigoPostal}
                onChange={manejarCambioCodigoPostal}
                placeholder="Ej: 12345"
              />
            </label>
          </form>
          {error && <p className="mensaje-error">{error}</p>}
          <div className="opciones-envio">
            {opcionesEnvio.length > 0 && (
              <>
                <h3>Opciones de envío a domicilio:</h3>
                {opcionesEnvio
                  .filter((opcion) => opcion.pickup === false)
                  .map((opcion, index) => (
                    <div key={index}>
                      <p>
                        <strong>{opcion.carrier}</strong>: ${opcion.price} - {opcion.deliveryTime} días
                      </p>
                    </div>
                  ))}
                <h3>Opciones de retiro en tienda:</h3>
                {opcionesEnvio
                  .filter((opcion) => opcion.pickup === true)
                  .map((opcion, index) => (
                    <div key={index}>
                      <p>
                        <strong>{opcion.carrier}</strong>: ${opcion.price} - {opcion.deliveryTime} días
                      </p>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
    </div>
  );
};

// CalculadorEnvio.propTypes = {
//   textoBoton: PropTypes.string,
// };

// CalculadorEnvio.defaultProps = {
//   textoBoton: "Calcular costo de envío",
// };

export default CalculadorEnvio;