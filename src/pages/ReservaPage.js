import { useState, useEffect } from "react";
import axios from "axios";
import FormReserva from "../components/FormReserva";
import TablaReserva from "../components/TablaReserva";

function ReservaPage() {
  const [reservas, setReservas] = useState([]);
  const [reservaEditada, setReservaEditada] = useState(null);

  // Para selects, cargamos mascotas y veterinarios
  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);

  const obtenerReservas = async () => {
    try {
      const res = await axios.get(
        "http://67.205.142.104:3000/api/reserva_procedimiento"
      );
      setReservas(res.data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  const obtenerMascotas = async () => {
    try {
      const res = await axios.get("http://67.205.142.104:3000/api/mascota");
      setMascotas(res.data);
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
    }
  };

  const obtenerVeterinarios = async () => {
    try {
      const res = await axios.get("http://67.205.142.104:3000/api/veterinario");
      setVeterinarios(res.data);
    } catch (error) {
      console.error("Error al obtener veterinarios:", error);
    }
  };

  useEffect(() => {
    obtenerReservas();
    obtenerMascotas();
    obtenerVeterinarios();
  }, []);

  return (
    <div className="container my-4">
        <FormReserva
        obtenerReservas={obtenerReservas}
        reservaEditada={reservaEditada}
        setReservaEditada={setReservaEditada}
        mascotas={mascotas}
        veterinarios={veterinarios}
      />
      <TablaReserva
        reservas={reservas}
        obtenerReservas={obtenerReservas}
        setReservaEditada={setReservaEditada}
        mascotas={mascotas}
        veterinarios={veterinarios}
      />
    </div>
  );
}

export default ReservaPage;
