import { useState, useEffect } from "react";
import axios from "axios";
import FormMascota from "../components/FormMascota";
import TablaMascota from "../components/TablaMascota";

function MascotaPage() {
  const [mascotas, setMascotas] = useState([]);
  const [duenos, setDuenos] = useState([]);
  const [mascotaEditada, setMascotaEditada] = useState(null);

  const obtenerMascotas = async () => {
    try {
      const res = await axios.get("http://67.205.142.104:3000/api/mascota");
      setMascotas(res.data);
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
    }
  };

  const obtenerDuenos = async () => {
    try {
      const res = await axios.get("http://67.205.142.104:3000/api/dueno");
      setDuenos(res.data);
    } catch (error) {
      console.error("Error al obtener dueños:", error);
    }
  };

  useEffect(() => {
    obtenerMascotas();
    obtenerDuenos();
  }, []);

  return (
    <div className="container my-4">
        <FormMascota
        obtenerMascotas={obtenerMascotas}
        mascotaEditada={mascotaEditada}
        setMascotaEditada={setMascotaEditada}
        duenos={duenos}
      />
      <TablaMascota
        mascotas={mascotas}
        duenos={duenos}
        obtenerMascotas={obtenerMascotas}
        setMascotaEditada={setMascotaEditada}
      />
    </div>
  );
}

export default MascotaPage;
