import { useState, useEffect } from "react";
import axios from "axios";
import FormVeterinario from "../components/FormVeterinario";
import TablaVeterinario from "../components/TablaVeterinario";

function VeterinarioPage() {
  const [veterinarios, setVeterinarios] = useState([]);
  const [veterinarioEditado, setVeterinarioEditado] = useState(null);

  const obtenerVeterinarios = async () => {
    try {
      const res = await axios.get("http://67.205.142.104:3000/api/veterinario");
      setVeterinarios(res.data);
    } catch (error) {
      console.error("Error al obtener veterinarios:", error);
    }
  };

  useEffect(() => {
    obtenerVeterinarios();
  }, []);

  return (
    <div className="container my-4">
      
      <FormVeterinario
        obtenerVeterinarios={obtenerVeterinarios}
        veterinarioEditado={veterinarioEditado}
        setVeterinarioEditado={setVeterinarioEditado}
      />
      <TablaVeterinario
        veterinarios={veterinarios}
        obtenerVeterinarios={obtenerVeterinarios}
        setVeterinarioEditado={setVeterinarioEditado}
      />
    </div>
  );
}

export default VeterinarioPage;
