import axios from "axios";

function TablaDueno({ duenios, obtenerDuenos, setDuenoEditado }) {
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este dueño?"))
      return;

    try {
      await axios.delete(`http://67.205.142.104:3000/api/dueno/${id}`);
      obtenerDuenos(); // Refresca la tabla
    } catch (error) {
      console.error("Error al eliminar dueño:", error);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          <h3 className="mb-0">Lista de Dueños</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-danger">
              <tr>
                <th>Nombre</th>
                <th>RUT</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {duenios.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    <div className="alert alert-info mb-0">
                      No hay dueños registrados
                    </div>
                  </td>
                </tr>
              ) : (
                duenios.map((dueno) => (
                  <tr key={dueno.id}>
                    <td>{dueno.nombre_completo}</td>
                    <td>{dueno.rut}</td>
                    <td>{dueno.telefono}</td>
                    <td>{dueno.correo}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => setDuenoEditado(dueno)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(dueno.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TablaDueno;
