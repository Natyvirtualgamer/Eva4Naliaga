import { useEffect, useState } from "react";
import axios from "axios";
import FormDueno from "../components/FormDueno";
import TablaDueno from "../components/TablaDueno";

//pagina de dueños, donde se importa el formulario y la tabla con los datos de la api, se repite el mismo proceso para la pagina de mascotas, veterinario y reserva


function DuenoPage() {
  const [duenos, setDuenos] = useState([]);
  const [duenoEditado, setDuenoEditado] = useState(null);

  const obtenerDuenos = async () => {
    try {
      const respuesta = await axios.get("http://67.205.142.104:3000/api/dueno");
      setDuenos(respuesta.data);
    } catch (error) {
      console.error("Error al obtener los dueños", error);
    }
  };

  useEffect(() => {
    obtenerDuenos();
  }, []);

  return (
    <div className="container my-4">
      
      <FormDueno
        obtenerDuenos={obtenerDuenos}
        duenoEditado={duenoEditado}
        setDuenoEditado={setDuenoEditado}
      />

      <TablaDueno
        duenios={duenos}
        obtenerDuenos={obtenerDuenos}
        setDuenoEditado={setDuenoEditado}
      />
    </div>
  );
}

export default DuenoPage;
