import { useState, useEffect } from "react";
import axios from "axios";

function FormReserva({
  obtenerReservas,
  reservaEditada,
  setReservaEditada,
  mascotas,
  veterinarios,
}) {
  const [form, setForm] = useState({
    id_mascota: "",
    id_veterinario: "",
    tipo_procedimiento: "",
    fecha: "",
    hora: "",
  });

  useEffect(() => {
    if (reservaEditada) {
      setForm(reservaEditada);
    }
  }, [reservaEditada]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.id_mascota ||
      !form.id_veterinario ||
      !form.tipo_procedimiento ||
      !form.fecha ||
      !form.hora
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (reservaEditada) {
        await axios.put(
          `http://67.205.142.104:3000/api/reserva_procedimiento/${form.id}`,
          form
        );
        setReservaEditada(null);
      } else {
        await axios.post(
          "http://67.205.142.104:3000/api/reserva_procedimiento",
          form
        );
      }

      setForm({
        id_mascota: "",
        id_veterinario: "",
        tipo_procedimiento: "",
        fecha: "",
        hora: "",
      });
      obtenerReservas();
    } catch (error) {
      console.error("Error al guardar reserva:", error);
    }
  };

  return (
    <div className="container md-1">
      <h3 className="text-center mb-3">
        {reservaEditada ? "Editar Reserva" : "Nueva Reserva"}
      </h3>
      <form
        onSubmit={handleSubmit}
        className="row g-2 justify-content-center align-items-end"
      >
        <div className="col-md-2">
          <label className="form-label">Mascota:</label>
          <select
            className="form-select"
            name="id_mascota"
            value={form.id_mascota}
            onChange={handleChange}
          >
            <option value="">-- Seleccione mascota --</option>
            {mascotas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre_mascota}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label">Veterinario:</label>
          <select
            className="form-select"
            name="id_veterinario"
            value={form.id_veterinario}
            onChange={handleChange}
          >
            <option value="">-- Seleccione veterinario --</option>
            {veterinarios.map((v) => (
              <option key={v.id} value={v.id}>
                {v.nombre_completo}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            type="text"
            name="tipo_procedimiento"
            placeholder="Tipo de procedimiento"
            value={form.tipo_procedimiento}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <button
            type="submit"
            className={`btn ${reservaEditada ? "btn-warning" : "btn-primary"}`}
          >
            {reservaEditada ? "Actualizar" : "Registrar"}
          </button>
        </div>
        {reservaEditada && (
          <button
            type="button"
            onClick={() => {
              setForm({
                id_mascota: "",
                id_veterinario: "",
                tipo_procedimiento: "",
                fecha: "",
                hora: "",
              });
              setReservaEditada(null);
            }}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default FormReserva;
