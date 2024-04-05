import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import UploadIcon from '../../../assets/subir-icon.png'
import ManualIcon from '../../../assets/manual-icon.png'

const Home = () => {
  return (
  <section id="home-section">
    <h3>Crear nueva oferta</h3>
    <article>
      <Link to="/cups">
        <button>Manualmente 
          <img src={ManualIcon} alt="" className="home-icon"  />
        </button>
      </Link>
      <button>Subir factura
        <img src={UploadIcon} alt="" className="home-icon" />
      </button>
    </article>
  </section>
  )
};

export default Home;
