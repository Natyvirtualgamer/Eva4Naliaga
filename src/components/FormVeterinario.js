import { useState, useEffect } from 'react';
import axios from 'axios';

function FormVeterinario({ obtenerVeterinarios, veterinarioEditado, setVeterinarioEditado }) {
  const [form, setForm] = useState({
    nombre_completo: '',
    especialidad: '',
    telefono: ''
  });

  useEffect(() => {
    if (veterinarioEditado) {
      setForm(veterinarioEditado);
    }
  }, [veterinarioEditado]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre_completo || !form.especialidad || !form.telefono) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      if (veterinarioEditado) {
        await axios.put(`http://67.205.142.104:3000/api/veterinario/${form.id}`, form);
        setVeterinarioEditado(null);
      } else {
        await axios.post('http://67.205.142.104:3000/api/veterinario', form);
      }

      setForm({
        nombre_completo: '',
        especialidad: '',
        telefono: ''
      });
      obtenerVeterinarios();
    } catch (error) {
      console.error('Error al guardar veterinario:', error);
    }
  };

  return (
    <div className="container mt-6">
      <h3 className="text-center mb-4">{veterinarioEditado ? 'Editar Veterinario' : 'Nuevo Veterinario'}</h3>
      <form onSubmit={handleSubmit} className="row g-2 justify-content-center align-items-end">
        <div className="col-md-3">
          <input
            name="nombre_completo"
            value={form.nombre_completo}
            onChange={handleChange}
            placeholder="Nombre Completo"
            className="form-control"
          />
        </div>
        <div className="col-md-2 d-grid">
          <input
            name="especialidad"
            value={form.especialidad}
            onChange={handleChange}
            placeholder="Especialidad"
            className="form-control"
          />
        </div>
        <div className="col-md-2 d-grid">
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="form-control"
          />
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-primary me-2">
            {veterinarioEditado ? 'Actualizar' : 'Registrar'}
          </button>
          {veterinarioEditado && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setForm({
                  nombre_completo: '',
                  especialidad: '',
                  telefono: ''
                });
                setVeterinarioEditado(null);
              }}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormVeterinario;
