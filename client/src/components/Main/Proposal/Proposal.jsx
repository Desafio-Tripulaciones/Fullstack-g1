
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ConsumosAnualesContext from "../../../context/ConsumosAnualesProvider";
import { usePowerContext } from "../../../context/PowerProvider";
import { useFranjasContext } from "../../../context/FranjasProvider";
import { DataExtraContext } from "../../../context/DataExtraProvider";
import { useInfoCliente } from "../../../context/InfoClienteProvider";
import AuthContext from "../../../context/AuthProvider";
import IconoPDF from "../../../assets/icono-pdf.png";

const Proposal = () => {
  const { consumosAnuales } = useContext(ConsumosAnualesContext);
  const { rowsPower, setRowsPower, rowsPowerTotales } = usePowerContext();
  const { rowsEnergy, rowsEnergyTotales } = useFranjasContext();
  const { dataExtra } = useContext(DataExtraContext);
  const { infoClienteState } = useInfoCliente();
  const { auth } = useContext(AuthContext);

  const [preciosData, setPreciosData] = useState([]);
  const [ciasData, setCiasData] = useState([]);
  const [metodosData, setMetodosData] = useState([]);
  const [productosCiasData, setProductosCiasData] = useState([]);
  const [sistemasData, setSistemasData] = useState([]);
  const [tarifasData, setTarifasData] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [mesData, setMesData] = useState([]);
  const [ahorroFacturaActual, setAhorroFacturaActual] = useState(0);
  const [ahorroAnualState, setAhorroAnualState] = useState(0);
  const [showCards, setShowCards] = useState(false);
  const [porcentajeAnual, setPorcentajeAnual] = useState(false);
  const [porcentajeFactura, setPorcentajeFactura] = useState(false);

  const [ciasStringData, setCiasStringData] = useState("");
  const [metodosStringData, setMetodosStringData] = useState("");
  const [productosCiasStringData, setProductosCiasStringData] = useState("");
  const [sistemasStringData, setSistemasStringData] = useState("");
  const [tarifasStringData, setTarifasStringData] = useState("");
  const [feeStringData, setFeeStringData] = useState("");
  const [mesStringData, setMesStringData] = useState("");

  useEffect(() => {
    const obtenerFiltros = async () => {
      const response = await axios.get("http://127.0.0.1:5000/load_filters");

      setCiasData(response.data.cias);
      setMetodosData(response.data.metodos);
      setProductosCiasData(response.data.producto_cia);
      setSistemasData(response.data.sistemas);
      setTarifasData(response.data.tarifas);
      setFeeData(response.data.fee || ["No existen fees en este producto"])
      setMesData(response.data.mes || ["No hay datos mensuales"]);

      // console.log(datos)
    };
    obtenerFiltros();
  }, []);

  const crearInputSistemas = () => {
    if (sistemasData) {
      const datosMapeados = sistemasData.map((value, i) => {
        return (
          <option key={i} name="sistema" value={value}>
            {value}
          </option>
        );
      });
      return datosMapeados;
    } else {
      return <option value="">No se cargaron los datos</option>;
    }
  };
  const crearInputTarifas = () => {
    if (tarifasData) {
      const datosMapeados = tarifasData.map((value, i) => {
        return (
          <option key={i} name="tarifa" value={value}>
            {value}
          </option>
        );
      });
      return datosMapeados;
    } else {
      return <option value="">No se cargaron los datos</option>;
    }
  };
  const crearInputCompañias = () => {
    if (ciasData) {
      const datosMapeados = ciasData.map((value, i) => {
        return (
          <option key={i} name="cia" value={value}>
            {value}
          </option>
        );
      });
      return datosMapeados;
    } else {
      return <option value="-">No se cargaron los datos</option>;
    }
  };
  const crearInputMetodos = () => {
    if (metodosData) {
      const datosMapeados = metodosData.map((value, i) => {
        return (
          <option key={i} name="metodo" value={value}>
            {value}
          </option>
        );
      });
      return datosMapeados;
    } else {
      return <option value="-">No se cargaron los datos</option>;
    }
  };
  const crearInputProductoCIA = () => {
    if (productosCiasData) {
      const datosMapeados = productosCiasData.map((value, i) => {
        return (
          <option key={i} name="producto_cia" value={value}>
            {value}
          </option>
        );
      });
      return datosMapeados;
    } else {
      return <option value="-">No se cargaron los datos</option>;
    }
  };
  const crearInputMesFact = () => {
    if (mesData) {
      const datosMapeados = mesData.map((value, i) => {
        return (
          <option key={i} name="mes_fact" value={value}>
            {value}
          </option>
        );
      });
      return datosMapeados;
    } else {
      return <option value="-">No hay meses de facturación</option>;
    }
  };
  const crearInputFEE = () => {
    if (feeData) {
      const datosMapeados = feeData.map((value, i) => {
        return (
          <option key={i} name="fee" value={value}>
            {value}
          </option>
        );
      });
      return datosMapeados;
    } else {
      return <option value="-">No hay fees disponibles</option>;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        `http://127.0.0.1:5000/reload_filters?tarifa=${tarifasStringData}&cia=${ciasStringData}&metodo=${metodosStringData}`
      );
      console.log(response.data);
      setProductosCiasData(response.data.producto_cia);
      setFeeData(response.data.fee);
      setMesData(response.data.meses);
      setCiasData(response.data.cia);

      const responsePrecios = await axios.post(
        `http://127.0.0.1:5000/cargar_precios?tarifa=${tarifasStringData}&cia=${ciasStringData}&metodo=${metodosStringData}&sistema=${sistemasStringData}&producto_cia=${productosCiasStringData}&mes=${mesStringData}&fee=${feeStringData}`
      );
      console.log(responsePrecios.data.precios);
      setPreciosData(responsePrecios.data.precios);
    };
    fetchData();
  }, [
    tarifasStringData,
    ciasStringData,
    metodosStringData,
    productosCiasStringData,
    mesStringData,
    feeStringData,
    setPreciosData,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`${name}: ${value}`);

    switch (name) {
      case "tarifa":
        setTarifasStringData(value);
        break;
      case "metodo":
        setMetodosStringData(value);
        break;
      case "compañia":
        setCiasStringData(value);
        break;
      case "producto_cia":
        setProductosCiasStringData(value);
        break;
      case "mes_fact":
        setMesStringData(value);
        break;
      case "fee":
        setFeeStringData(value);
        break;
      case "sistema":
        setSistemasStringData(value);
        break;
      default:
        break;
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const url = 'http://127.0.0.1:5000/descargar_pdf';

      const response = await axios.get(url, { responseType: 'blob' });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

      const downloadUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'propuesta_final.pdf'); 
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  };

  const generarPDF = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/descargar_pdf")
      // JSON.stringify({
      //   Nombre_cliente: infoClienteState.clientData.titular,
      //   Direccion_cliente: infoClienteState.clientData.direccion,
      //   Numero_cups: infoClienteState.cup,
      //   Nombre_asesor: auth.asesor,
      //   Telefono_asesor: auth.contacto,
      //   Delegacion: auth.delegacion,
      //   Ahorro_actual: 0,
      //   Ahorro_anual: 0,
      //   Compañia: ciasStringData,
      //   Tarifa: tarifasStringData,
      //   P1: preciosData[0].P1 ?? "No contemplada",
      //   P2: preciosData[0].P2 ?? "No contemplada",
      //   P3: preciosData[0].P3 ?? "No contemplada",
      //   P4: preciosData[0].P4 ?? "No contemplada",
      //   P5: preciosData[0].P5 ?? "No contemplada",
      //   P6: preciosData[0].P6 ?? "No contemplada",
      //   p1: preciosData[0].p1 ?? "No contemplada",
      //   p2: preciosData[0].p2 ?? "No contemplada",
      //   p3: preciosData[0].p3 ?? "No contemplada",
      //   p4: preciosData[0].p4 ?? "No contemplada",
      //   p5: preciosData[0].p5 ?? "No contemplada",
      //   p6: preciosData[0].p6 ?? "No contemplada",
      //   PM1: preciosData[0].PM1 ?? "No contemplada",
      //   PM2: preciosData[0].PM2 ?? "No contemplada",
      //   PM3: preciosData[0].PM3 ?? "No contemplada",
      //   PM4: preciosData[0].PM4 ?? "No contemplada",
      //   PM5: preciosData[0].PM5 ?? "No contemplada",
      //   PM6: preciosData[0].PM6 ?? "No contemplada",
      //   Energia_reactiva: dataExtra.energia_reactiva,
      //   Alquiler: dataExtra.alquiler_equipo,
      //   Impuestos: dataExtra.impuesto_electrico + (dataExtra.impuesto_electrico*dataExtra.iva),
      //   Otros: dataExtra.otros_1 || null + dataExtra.otros_2 || null,
      //   Total_pago_potencia: 0,
      //   Total_pago_energia: 0,
      //   Total_factura: 0,
      //   Total_anual_estimado:0,
      //   Compañia_actual: infoClienteState.clientData.comp_actual,
      //   Tarifa_actual: "No contemplada",
      //   P1_actual: rowsPower[0].precioPotencia ?? "No contemplada",
      //   P2_actual: rowsPower[1].precioPotencia ?? "No contemplada",
      //   P3_actual: rowsPower[2].precioPotencia ?? "No contemplada",
      //   P4_actual: 0,
      //   P5_actual: 0,
      //   P6_actual: 0,
      //   p1_actual: rowsEnergy[0].consumoFacturaActual ?? "No contemplada",
      //   p2_actual: rowsEnergy[1].consumoFacturaActual ?? "No contemplada",
      //   p3_actual: rowsEnergy[2].consumoFacturaActual ?? "No contemplada",
      //   p4_actual: 0,
      //   p5_actual: 0,
      //   p6_actual: 0,
      //   PM1_actual: rowsEnergy[0].precioMesFacturacion ?? "No contemplada",
      //   PM2_actual: rowsEnergy[1].precioMesFacturacion ?? "No contemplada",
      //   PM3_actual: rowsEnergy[2].precioMesFacturacion ?? "No contemplada",
      //   PM4_actual: 0,
      //   PM5_actual: 0,
      //   PM6_actual: 0,
      //   Energia_reactiva_actual: dataExtra.energia_reactiva,
      //   Alquiler_actual: dataExtra.alquiler_equipo,
      //   Impuestos_actual: dataExtra.impuesto_electrico + (dataExtra.impuesto_electrico*dataExtra.iva),
      //   Otros_actual: dataExtra.otros_1 || null + dataExtra.otros_2 || null,
      //   Total_pago_potencia_actual: 0,
      //   Total_pago_energia_actual: 0,
      //   Total_factura_actual: 0,
      //   Total_anual_estimado_actual: 0,
      // }),{
      //   headers: { 'Content-Type': 'application/json' }
      // }
      console.log(response.data)
      } catch (err) {
        console.error(err)
      } 
      }
    
    const handlePostData = async () => {
      const infoId = infoClienteState.clientData.info_id;
  
      const totalConsumoAnual = consumosAnuales.reduce(
        (acc, val) => acc + val,
        0
      );
  
      const ConsumoFacturaAnual = rowsEnergy.reduce((acumulador, row) => {
        const valorActual = Number(row.consumoFacturaActual) || 0;
        return acumulador + valorActual;
      }, 0);
  
      const TotalPagoFacturaEnergia = rowsEnergyTotales.reduce((acumulador, row) => {
        const valorActual = Number(row.totalPagoFactura) || 0;
        return acumulador + valorActual;
      }, 0);
      
      const TotalPagoAnualEnergia = rowsEnergyTotales.reduce((acumulador, row) => {
        const valorActual = Number(row.totalPagoFactura) || 0;
        return acumulador + valorActual;
      }, 0);
  
      
      // const totalPotencia = rowsPowerTotales[rowsPowerTotales.length - 1];
  
      const TotalPagoFacturaPotencia = rowsPowerTotales.reduce((acumulador, row) => {
        const valorActual = Number(row.totalPagoFactura) || 0;
        return acumulador + valorActual;
      }, 0);
  
      
      const TotalPagoPotenciaAnual = rowsPowerTotales.reduce((acumulador, row) => {
        const valorActual = Number(row.totalPagoAnual) || 0;
        return acumulador + valorActual;
      }, 0);
  
  
      const otrosAnual =
        ((parseFloat(dataExtra.otros_1) + parseFloat(dataExtra.otros_2)) /
          parseInt(dataExtra.dias_facturacion)) *
        365;
  
      const alquilerEquipoAnual =
        (parseFloat(dataExtra.alquiler_equipo) /
          parseInt(dataExtra.dias_facturacion)) *
        365;
  
      const ivaDecimal = parseFloat(dataExtra.iva) / 100;
  
      console.log(dataExtra.alquiler_equipo);
      console.log(alquilerEquipoAnual);
      console.log(otrosAnual);
      console.log(ivaDecimal);
  
      const importeTotalFactura =
        (parseFloat(TotalPagoFacturaEnergia) +
          parseFloat(TotalPagoFacturaPotencia) +
          parseFloat(dataExtra.energia_reactiva) +
          parseFloat(dataExtra.impuesto_electrico) +
          parseFloat(dataExtra.otros_1) +
          parseFloat(dataExtra.otros_2) +
          parseFloat(dataExtra.alquiler_equipo)) *
        (1 + ivaDecimal);
  
        console.log(importeTotalFactura)
  
      const totalAnualEstimado =
        (parseFloat(TotalPagoFacturaPotencia) +
          parseFloat(TotalPagoPotenciaAnual)) *
          1.0051127 +
        parseFloat(alquilerEquipoAnual) +
        parseFloat(otrosAnual) * (1 + parseInt(ivaDecimal));
  
        console.log(totalAnualEstimado)
  
      //CALCULO FACTURA ENERGIA
  
      const precioDescuentoEnergiaP1 =
        preciosData[0]?.P1 * (1 - parseFloat(rowsEnergy[0].descuento) / 100);
      const precioDescuentoEnergiaP2 =
        preciosData[0]?.P2 * (1 - parseFloat(rowsEnergy[1].descuento) / 100);
      const precioDescuentoEnergiaP3 =
        preciosData[0]?.P3 * (1 - parseFloat(rowsEnergy[2].descuento) / 100);
      
  
      const totPagoEnergiaFactP1 =
        parseFloat(rowsEnergy[0].consumoFacturaActual) * precioDescuentoEnergiaP1;
      const totPagoEnergiaFactP2 =
        parseFloat(rowsEnergy[1].consumoFacturaActual) * precioDescuentoEnergiaP2;
      const totPagoEnergiaFactP3 =
        parseFloat(rowsEnergy[2].consumoFacturaActual) * precioDescuentoEnergiaP3;
  
      const totConsumoFacturaEn =
        parseFloat(rowsEnergy[0].consumoFacturaActual) +
        parseFloat(rowsEnergy[1].consumoFacturaActual) +
        parseFloat(rowsEnergy[2].consumoFacturaActual);
      const totPagoEnergiaFact =
        totPagoEnergiaFactP1 + totPagoEnergiaFactP2 + totPagoEnergiaFactP3;
  
      //TOTAL PAGO ANUAL ENERGIA
      const totPagoEnergiaAnualP1 =
        consumosAnuales[0] *
        preciosData[0]?.PM1 *
        (1 - rowsEnergy[0].descuento / 100);
  
      const totPagoEnergiaAnualP2 =
        consumosAnuales[1] *
        preciosData[0]?.PM2 *
        (1 - rowsEnergy[1].descuento / 100);
      const totPagoEnergiaAnualP3 =
        consumosAnuales[2] *
        preciosData[0]?.PM3 *
        (1 - rowsEnergy[2].descuento / 100);
  
      console.log(totPagoEnergiaAnualP1);
      console.log(totPagoEnergiaAnualP2);
      console.log(totPagoEnergiaAnualP3);
  
      const totPagoEnergiaAnual =
        totPagoEnergiaAnualP1 + totPagoEnergiaAnualP2 + totPagoEnergiaAnualP3;
  
      //CALCULO FACTURA POTENCIA
  
      const precioDescuentoPotenciaP1 =
        preciosData[0]?.P1 * (1 - parseFloat(rowsPower[0].descuento) / 100);
      const precioDescuentoPotenciaP2 =
        preciosData[0]?.P2 * (1 - parseFloat(rowsPower[1].descuento) / 100);
      console.log(precioDescuentoPotenciaP1);
      console.log(precioDescuentoPotenciaP2);
  
      const totPagoPotenciaFactP1 =
        parseFloat(rowsPower[0].potenciaContratada) * precioDescuentoPotenciaP1;
  
      const totPagoPotenciaFactP2 =
        parseFloat(rowsPower[1].potenciaContratada) * precioDescuentoPotenciaP2;
      // TOTAL FACTURA POTENCIA
      const totConsumoFacturaPot =
        parseFloat(rowsPower[0].potenciaContratada) +
        parseFloat(rowsPower[1].potenciaContratada);
      const totPagoPotenciaFact =
        (totPagoPotenciaFactP1 + totPagoPotenciaFactP2) *
        parseFloat(dataExtra.dias_facturacion);
  
      // TOTAL FACTURA POTENCIA ANUAL
      const totPagoAnualPotencia = totConsumoFacturaPot * 365;
  
      // //AHORRO
      const otrosTotal =
        parseFloat(dataExtra.otros_1) + parseFloat(dataExtra.otros_2);
  
      const importeTotalFacturaProp =
        (totPagoEnergiaFact +
          totPagoPotenciaFact +
          parseFloat(dataExtra.energia_reactiva) +
          parseFloat(dataExtra.impuesto_electrico) +
          otrosTotal +
          parseFloat(dataExtra.alquiler_equipo)) *
        (1 + dataExtra.iva / 100);
  
      const totalAnualEstimadoProp =
        (totPagoEnergiaAnual + totPagoAnualPotencia) * 1.0051127 +
        (parseFloat(dataExtra.alquiler_equipo) /
          parseInt(dataExtra.dias_facturacion)) *
          365 +
        (otrosTotal / parseFloat(dataExtra.dias_facturacion)) *
          365 *
          (1 + parseFloat(dataExtra.iva) / 100);
  
      const ahorroFactura = importeTotalFactura - importeTotalFacturaProp;
      console.log(ahorroFactura);
      const ahorroAnual = totalAnualEstimado - totalAnualEstimadoProp;
      const porcentajeAhorroAnual = (ahorroAnual / totalAnualEstimado) * 100;
      const porcentajeAhorroFactura = (ahorroFactura / importeTotalFactura) * 100;
      setPorcentajeAnual(porcentajeAhorroAnual);
      setPorcentajeFactura(porcentajeAhorroFactura);
      setAhorroFacturaActual(ahorroFactura);
      setAhorroAnualState(ahorroAnual);
  
      const totalesClienteData = {
        info_id: infoId,
        t_con_anual: totalConsumoAnual,
        t_con_fact_actual: ConsumoFacturaAnual,
        t_pago_fact_energia: TotalPagoFacturaEnergia,
        t_pago_anual_energia: TotalPagoAnualEnergia,
        t_pago_fact_potencia: TotalPagoFacturaPotencia,
        t_pago_anual_potencia: TotalPagoPotenciaAnual,
        importe_total_factura: importeTotalFactura,
        total_anual_estimado: totalAnualEstimado,
      };
  
      const propuestaData = {
        info_id: infoId,
        franja: "P1",
        total_pago_fact_energia: totPagoEnergiaFactP1,
        total_pago_anual_energia: totPagoEnergiaAnualP1,
        total_pago_fact_potencia: totPagoPotenciaFactP1,
        total_pago_anual_potencia: 0.0,
      };
      const propuestaData2 = {
        info_id: infoId,
        franja: "P2",
        total_pago_fact_energia: totPagoEnergiaFactP2,
        total_pago_anual_energia: totPagoEnergiaAnualP2,
        total_pago_fact_potencia: totPagoPotenciaFactP2,
        total_pago_anual_potencia: totPagoAnualPotencia,
      };
      const propuestaData3 = {
        info_id: infoId,
        franja: "P3",
        total_pago_fact_energia: totPagoEnergiaFactP3,
        total_pago_anual_energia: totPagoEnergiaAnualP3,
        total_pago_fact_potencia: 0.0,
        total_pago_anual_potencia: 0.0,
      };
  
      const totalPropuestaData = {
        info_id: infoId,
        t_con_anual: totConsumoFacturaEn,
        t_con_fact_actual: totConsumoFacturaPot,
        t_pago_fact_energia: totPagoEnergiaFact,
        t_pago_anual_energia: totPagoEnergiaAnual,
        t_pago_fact_potencia: totPagoPotenciaFact,
        t_pago_anual_potencia: totPagoAnualPotencia,
        importe_total_factura: importeTotalFacturaProp,
        total_anual_estimado: totalAnualEstimadoProp,
        ahorro_fact_actual: ahorroFactura,
        ahorro_anual: ahorroAnual,
      };
  
  
      const postTotales = async (data) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/totales",
            data
          );
          console.log("Totales enviados:", response.data);
        } catch (error) {
          console.error("Error en envío de totales:", error);
        }
      };
  
      const enviarPropuestas = async (data) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/propuesta",data
          );
          console.log("Totales enviados:", response.data);
        } catch (error) {
          console.error("Error en envío de propuestas:", error);
          throw error;
        }
      };
  
      const postTotalPropuesta = async (data) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/totalpropuesta",
            data
          );
          console.log("Total propuesta enviado:", response.data);
        } catch (error) {
          console.error("Error en envío de total propuesta:", error);
        }
      };
  
  
      setShowCards(true);
      try {
        const resultadosTotales = await postTotales(totalesClienteData);
        const resultadosPropuestas = await enviarPropuestas(propuestaData);
        const resultadosPropuestas2 = await enviarPropuestas(propuestaData2);
        const resultadosPropuesta3 = await enviarPropuestas(propuestaData3);
  
        const resultadoTotalPropuesta = await postTotalPropuesta(
          totalPropuestaData
        );
  
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    };

  return (
    <>
      <section className="proposal-sct">
        <h5>Generar oferta para el cliente</h5>
        <form className="proposal-form">
          <select name="sistema" id="sistema" onChange={handleChange}>
            <option value="" selected disabled>
              Sistemas
            </option>
            {crearInputSistemas()}
          </select>
          <select name="metodo" id="metodo" onChange={handleChange}>
            <option value="" selected disabled>
              Métodos
            </option>
            {crearInputMetodos()}
          </select>
          <select name="compañia" id="compañia" onChange={handleChange}>
            <option value="" selected disabled>
              Compañías
            </option>
            {crearInputCompañias()}
          </select>
          <select name="tarifa" id="tarifa" onChange={handleChange}>
            <option value="" selected disabled>
              Tarifas
            </option>
            {crearInputTarifas()}
          </select>
          <select name="producto_cia" id="producto_cia" onChange={handleChange}>
            <option value="" selected disabled>
              Productos
            </option>
            {crearInputProductoCIA()}
          </select>
          <select name="mes_fact" id="mes_fact" onChange={handleChange}>
            <option value="" selected disabled>
              Mes Facturación
            </option>
            {crearInputMesFact()}
          </select>
          <select name="fee" id="fee" onChange={handleChange}>
            <option value="--" selected>
              Fee
            </option>
            {crearInputFEE()}
          </select>
        </form>
      </section>
      <section className="final-offer-nvg">
        <article className={showCards ? "final-offer" : "offscreen"}>
          <div className="ahorro-card">
            <h5>Ahorro Factura Actual</h5>
            <div className="info-ahorro">
              <span
                className={ahorroAnualState > 0 ? "ahorro" : "no-ahorro"}
                id="porcentaje"
              >
                {Math.floor(porcentajeFactura)}%
              </span>
              <span
                id="total"
                className={
                  ahorroAnualState > 0 ? "span-ahorro" : "span-no-ahorro"
                }
              >
                {ahorroFacturaActual.toFixed(2)} €
              </span>
            </div>
          </div>
          <div className="ahorro-card">
            <h5>Ahorro Anual</h5>
            <div className="info-ahorro">
              <span
                className={ahorroAnualState > 0 ? "ahorro" : "no-ahorro"}
                id="porcentaje"
              >
                {Math.floor(porcentajeAnual)}%
              </span>
              <span
                id="total"
                className={
                  ahorroAnualState > 0 ? "span-ahorro" : "span-no-ahorro"
                }
              >
                {ahorroAnualState.toFixed(2)} €
              </span>
            </div>
          </div>
        </article>
        <article className="navigation-sct">
          <Link to="/power">
            <button className="back-btn">Atrás</button>
          </Link>
            <button className="continue-btn" onClick={handlePostData}>Mostrar ofertas</button>
            <button className="pdf" onClick={handleDownloadPdf}><img className="pdf-icon" src={IconoPDF} alt="" /></button>
        </article>
      </section>
    </>
  );
};

export default Proposal;
