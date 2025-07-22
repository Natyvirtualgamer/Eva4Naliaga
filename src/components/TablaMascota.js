import axios from "axios";

function TablaMascota({
  mascotas,
  duenos,
  obtenerMascotas,
  setMascotaEditada,
}) {
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Quieres eliminar esta mascota?")) return;

    try {
      await axios.delete(`http://67.205.142.104:3000/api/mascota/${id}`);
      obtenerMascotas();
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
    }
  };

  const obtenerNombreDueno = (id_dueno) => {
    const dueno = duenos.find((d) => d.id === id_dueno);
    return dueno ? dueno.nombre_completo : "Desconocido";
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          <h3 className="mb-0">Lista de Mascotas</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-danger">
              <tr>
                <th>Nombre</th>
                <th>Tipo Animal</th>
                <th>Edad</th>
                <th>Raza</th>
                <th>Dueño</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mascotas.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="alert alert-info mb-0">
                      No hay mascotas registradas
                    </div>
                  </td>
                </tr>
              ) : (
                mascotas.map((mascota) => (
                  <tr key={mascota.id}>
                    <td>{mascota.nombre_mascota}</td>
                    <td>{mascota.tipo_animal}</td>
                    <td>{mascota.edad}</td>
                    <td>{mascota.raza}</td>
                    <td>{obtenerNombreDueno(mascota.id_dueno)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => setMascotaEditada(mascota)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(mascota.id)}
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

export default TablaMascota;
