import React from "react";
import { Link } from "react-router-dom";
import SmallSpinner from '../../../../../assets/Gif_carga.gif'

const FormCups = ({ cups, setCups, load }) => {
  return (
    <form id="cups-form">
      <div>
        <label>Escribir CUPS</label>
        <img src={SmallSpinner} alt="" className={load ? "small-spinner" : "offscreen"}/>
      </div>
      <input
        type="text"
        value={cups}
        onChange={(e) => setCups(e.target.value)}
      />      
    </form>
  );
};

export default FormCups;
