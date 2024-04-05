import React from "react";
import { Link } from "react-router-dom";

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataExtraContext } from "../../../../context/DataExtraProvider";
import axios from "axios";


const FormDataExtra = () => {
  const { dataExtra, setDataExtra } = useContext(DataExtraContext);
  const [otrosFields, setOtrosFields] = useState([
    { concepto: "", cantidad: "", opcion1: "no", opcion2: "no" },
    { concepto: "", cantidad: "", opcion1: "no", opcion2: "no" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    setDataExtra((prevState) => ({
      ...prevState,
      otros_1:
        otrosFields[0]?.opcion1 === "si" ? otrosFields[0]?.cantidad : "0",
      otros_2:
        otrosFields[1]?.opcion1 === "si" ? otrosFields[1]?.cantidad : "0",
    }));
  }, [otrosFields]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataExtra({
      ...dataExtra,
      [name]: value,
    });
  };

  const handleOtrosFieldChange = (index, field, value) => {
    let nuevosOtros = [...otrosFields];
    nuevosOtros[index] = {
      ...nuevosOtros[index],
      [field]: value,
    };
    setOtrosFields(nuevosOtros);
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/datoscliente",
        dataExtra
      );
      console.log("Data submitted successfully", response.data);
      navigate("/energy");
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <>
    <article id="data-extra-sct">
      <h5>Datos extra</h5>
      <section className="datos-extra-form">   
        <div className="importe-energia">
          <div className="form-group">
            <label htmlFor="impuesto_electrico">Impuesto Eléctrico</label>
            <input
              id="impuesto_electrico"
              name="impuesto_electrico"
              type="text"
              value={dataExtra.impuesto_electrico}
              onChange={handleInputChange}
              className="no-radius"
            />
          </div>
          <div className="form-group">
            <label htmlFor="energia_reactiva">Energia reactiva</label>
            <input
              id="energia_reactiva"
              name="energia_reactiva"
              type="text"
              value={dataExtra.energia_reactiva}
              onChange={handleInputChange}
              className="no-radius"
            />
          </div>
        </div>
        <div className="importe-energia">
            <div className="form-group">
              <label htmlFor="dias_facturacion">Días de facturación</label>
              <input
                id="dias_facturacion"
                name="dias_facturacion"
                type="text"
                value={dataExtra.dias_facturacion}
                onChange={handleInputChange}
                className="no-radius"
              />
            </div>
            <div className="form-group">
              <label htmlFor="alquiler_equipo">Alquiler de equipo</label>
              <input
                id="alquiler_equipo"
                name="alquiler_equipo"
                type="text"
                value={dataExtra.alquiler_equipo}
                onChange={handleInputChange}
                className="no-radius"
              />
            </div>
        </div>
        <div className="otros">
          {otrosFields.map((field, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`otros-concepto-${index}`}>Otros</label>
            <input
              id={`otros-concepto-${index}`}
              type="text"
              placeholder="Concepto..."
              value={field.concepto}
              onChange={(e) =>
                handleOtrosFieldChange(index, "concepto", e.target.value)
              }
              className="no-radius"
            />
            <input
              id={`otros-cantidad-${index}`}
              type="text"
              placeholder="Cantidad..."
              value={field.cantidad}
              onChange={(e) =>
                handleOtrosFieldChange(index, "cantidad", e.target.value)
              }
              className="no-radius"
            />
            <select
              id={`otrosOpcion1-${index}`}
              value={field.opcion1}
              onChange={(e) =>
                handleOtrosFieldChange(index, "opcion1", e.target.value)
              }
              className="no-radius"
            >
              <option value="si" className="no-radius">Sí</option>
              <option value="no" className="no-radius">No</option>
            </select>
            <select
              id={`otrosOpcion2-${index}`}
              value={field.opcion2}
              onChange={(e) =>
                handleOtrosFieldChange(index, "opcion2", e.target.value)
              }
              className="no-radius"
            >
              <option value="si" className="no-radius">Sí</option>
              <option value="no" className="no-radius">No</option>
            </select>
          </div>
        ))}
        <p>Añadir otros</p>
        </div>
        <div className="iva">
          <label htmlFor="iva">IVA</label>
          <select
            id="iva"
            name="iva"
            value={dataExtra.iva}
            onChange={handleInputChange}
            className="no-radius"
          >
            <option className="no-radius" value="21">21%</option>
            <option value="10" className="no-radius">10%</option>
            <option value="5" className="no-radius">5%</option>
          </select>
        </div>
      </section>
    </article>
    <article className="navigation-sct-dataextra">
      <Link to="/client">
        <button className="back-btn">Atrás</button>
      </Link>
      <Link to="/energy">
        <button  className="continue-btn" onClick={postData}>Continuar</button>
      </Link>
    </article>
    </>
  );
};

export default FormDataExtra;