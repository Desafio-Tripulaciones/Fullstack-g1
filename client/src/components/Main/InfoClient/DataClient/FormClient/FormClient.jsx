import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInfoCliente } from "../../../../../context/InfoClienteProvider";
import AuthContext from "../../../../../context/AuthProvider";
import axios from "../../../../../api/axios";
const POST_URL = "api/infocliente"

const FormClient = () => {

  const { auth } = useContext(AuthContext)

  const navigate = useNavigate()
  const [infoData, setInfoData] = useState({
    titular: "",
    direccion: "",
    comp_actual: "",
  });

  const { infoClienteState, setInfoId, setTitularDireccionCia} = useInfoCliente();

  const postInfoCliente = async () => {
    const asesorData = await axios.get(`api/user/obtenerasesor/${auth.email}`)
    const asesorID = asesorData.data
    console.log(asesorID)

    const infoCliente = {
      ...infoData,
      cup: infoClienteState.cup,
      usuario_id: asesorID
    }
  
    try {
      const response = await axios.post(POST_URL, infoCliente
      );
      const createdInfoId = response.data.info_id; 
      const titular = response.data.titular;
      const direccion = response.data.direccion;
      const comp_actual = response.data.comp_actual;
      setInfoId(createdInfoId);
      setTitularDireccionCia(titular, direccion, comp_actual);
      console.log(response.data);
      navigate("/dataextra"); 
    } catch (error) {
      console.error("Hubo un error al enviar los datos", error);
    }
  };

  const handleChange = (event) => {
    setInfoData({ ...infoData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postInfoCliente();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="titular">Nombre y apellidos</label>
      <input
        type="text"
        name="titular"
        value={infoData.titular}
        onChange={handleChange}
        pattern="[a-zA-Z\s]+"
        title="Solo letras son permitidos."
      />
      <label htmlFor="direccion">Dirección</label>
      <input
        type="text"
        name="direccion"
        value={infoData.direccion}
        onChange={handleChange}
        pattern="[a-zA-Z0-9\s]+"
        title="Solo letras y números son permitidos."
        required
      />
      <label htmlFor="comp_actual">Compañía actual</label>
      <input
        type="text"
        name="comp_actual"
        value={infoData.comp_actual}
        onChange={handleChange}
        pattern="[a-zA-Z0-9\s]+"
        title="Solo letras y números son permitidos."
        required
      /> 
      <article className="navigation-sct-cups">
        <Link to="/cups">
          <button className="back-btn">Atrás</button>
        </Link>
          <button type="submit" disabled={!infoData.titular || !infoData.direccion || !infoData.comp_actual ? true : false} className="continue-btn">Continuar</button>
      </article>
    </form>
  );
};

export default FormClient;
