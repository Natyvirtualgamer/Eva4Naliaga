import axios from "axios";

function TablaReserva({
  reservas,
  obtenerReservas,
  setReservaEditada,
  mascotas,
  veterinarios,
}) {
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Quieres eliminar esta reserva?")) return;

    try {
      await axios.delete(
        `http://67.205.142.104:3000/api/reserva_procedimiento/${id}`
      );
      obtenerReservas();
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    }
  };

  // Función para mostrar nombre mascota por id
  const nombreMascota = (id) => {
    const m = mascotas.find((m) => m.id === id);
    return m ? m.nombre_mascota : "Desconocida";
  };

  // Función para mostrar nombre veterinario por id
  const nombreVeterinario = (id) => {
    const v = veterinarios.find((v) => v.id === id);
    return v ? v.nombre_completo : "Desconocido";
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          <h3 className="mb-0">Lista de Reservas</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-danger">
              <tr>
                <th>Mascota</th>
                <th>Veterinario</th>
                <th>Procedimiento</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="alert alert-info mb-0">
                      No hay reservas registradas
                    </div>
                  </td>
                </tr>
              ) : (
                reservas.map((r) => (
                  <tr key={r.id}>
                    <td>{nombreMascota(r.id_mascota)}</td>
                    <td>{nombreVeterinario(r.id_veterinario)}</td>
                    <td>{r.tipo_procedimiento}</td>
                    <td>{r.fecha.split('T')[0]}</td>
                    <td>{r.hora}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => setReservaEditada(r)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(r.id)}
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

export default TablaReserva;
