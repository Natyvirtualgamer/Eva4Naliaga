import axios from 'axios';

function TablaVeterinario({ veterinarios, obtenerVeterinarios, setVeterinarioEditado }) {
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Quieres eliminar este veterinario?')) return;

    try {
      await axios.delete(`http://67.205.142.104:3000/api/veterinario/${id}`);
      obtenerVeterinarios();
    } catch (error) {
      console.error('Error al eliminar veterinario:', error);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          <h3 className="mb-0">Lista de Veterinarios</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-danger">
              <tr>
                <th>Nombre</th>
                <th>Especialidad</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {veterinarios.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="alert alert-info mb-0">
                      No hay veterinarios registrados
                    </div>
                  </td>
                </tr>
              ) : (
                veterinarios.map((vet) => (
                  <tr key={vet.id}>
                    <td>{vet.nombre_completo}</td>
                    <td>{vet.especialidad}</td>
                    <td>{vet.telefono}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => setVeterinarioEditado(vet)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(vet.id)}
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

export default TablaVeterinario;
