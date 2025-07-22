import { useState, useEffect } from 'react';

import axios from 'axios';

function FormDueno({ obtenerDuenos, duenoEditado, setDuenoEditado }) {
  const [form, setForm] = useState({
    nombre_completo: '',
    rut: '',
    telefono: '',
    correo: ''
  });

  useEffect(() => {
    if (duenoEditado) {
      setForm(duenoEditado); // Rellena el form si se está editando
    }
  }, [duenoEditado]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre_completo || !form.rut || !form.telefono || !form.correo) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (duenoEditado) {
        await axios.put(`http://67.205.142.104:3000/api/dueno/${form.id}`, form);
      } else {
        await axios.post("http://67.205.142.104:3000/api/dueno", form);
      }

      setForm({ nombre_completo: '', rut: '', telefono: '', correo: '' });
      setDuenoEditado(null);
      obtenerDuenos(); // Recargar tabla
    } catch (error) {
      console.error("Error al guardar dueño", error);
    }
  };

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">{duenoEditado ? "Editar Dueño" : "Ingrese Nuevo Dueño"}</h3>
      <form onSubmit={handleSubmit} className="row g-2 justify-content-center align-items-end">
        <div className="col-md-2">
          <label className="form-label"></label>
          <input
            className="form-control"
            name="nombre_completo"
            value={form.nombre_completo}
            onChange={handleChange}
            placeholder="Nombre completo"
            required
          />
        </div>
        <div className="col-md-2">
          <label className="form-label"></label>
          <input
            className="form-control"
            name="rut"
            value={form.rut}
            onChange={handleChange}
            placeholder="RUT"
            required
          />
        </div>
        <div className="col-md-2">
          <label className="form-label"></label>
          <input
            className="form-control"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label"></label>
          <input
            className="form-control"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            placeholder="Correo"
            required
          />
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className={`btn ${duenoEditado ? 'btn-warning' : 'btn-primary'}`}>
            {duenoEditado ? "Actualizar" : "Registrar"}
          </button>
        </div>
        {duenoEditado && (
          <div className="col-md-1 d-grid">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setForm({ nombre_completo: '', rut: '', telefono: '', correo: '' });
                setDuenoEditado(null);
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default FormDueno;
