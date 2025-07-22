import { useState, useEffect } from 'react';
import axios from 'axios';

function FormMascota({ obtenerMascotas, mascotaEditada, setMascotaEditada, duenos }) {
  const [form, setForm] = useState({
    nombre_mascota: '',
    tipo_animal: '',
    edad: '',
    raza: '',
    id_dueno: ''
  });

  useEffect(() => {
    if (mascotaEditada) {
      setForm(mascotaEditada);
    }
  }, [mascotaEditada]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre_mascota || !form.tipo_animal || !form.edad || !form.raza || !form.id_dueno) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      if (mascotaEditada) {
        await axios.put(`http://67.205.142.104:3000/api/mascota/${form.id}`, form);
        setMascotaEditada(null);
      } else {
        await axios.post('http://67.205.142.104:3000/api/mascota', form);
      }

      setForm({
        nombre_mascota: '',
        tipo_animal: '',
        edad: '',
        raza: '',
        id_dueno: ''
      });
      obtenerMascotas();
    } catch (error) {
      console.error('Error al guardar mascota:', error);
    }
  };

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">{mascotaEditada ? 'Editar Mascota' : 'Nueva Mascota'}</h3>
      <form onSubmit={handleSubmit} className="row g-2 justify-content-center align-items-end">
        <div className="col-md-2">
          <label className="form-label"></label>
          <input
            className="form-control"
            name="nombre_mascota"
            value={form.nombre_mascota}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </div>

        <div className="col-md-2">
          <label className="form-label"></label>
          <select
            className="form-select"
            name="tipo_animal"
            value={form.tipo_animal}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione tipo</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="col-md-1">
          <label className="form-label"></label>
          <input
            type="number"
            name="edad"
            value={form.edad}
            onChange={handleChange}
            className="form-control"
            placeholder="Edad"
            min="0"
            required
          />
        </div>

        <div className="col-md-2">
          <label className="form-label"></label>
          <input
            name="raza"
            value={form.raza}
            onChange={handleChange}
            className="form-control"
            placeholder="Raza"
            required
          />
        </div>

        <div className="col-md-2 d-grid">
          <label className="form-label"></label>
          <select
            className="form-select"
            name="id_dueno"
            value={form.id_dueno}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione dueño</option>
            {duenos.map(dueno => (
              <option key={dueno.id} value={dueno.id}>
                {dueno.nombre_completo}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md d-grid">
          <button type="submit" className={`btn ${mascotaEditada ? 'btn-warning' : 'btn-primary'}`}>
            {mascotaEditada ? 'Actualizar' : 'Registrar'}
          </button>
        </div>

        {mascotaEditada && (
          <div className="col-md-1 d-grid">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setForm({
                  nombre_mascota: '',
                  tipo_animal: '',
                  edad: '',
                  raza: '',
                  id_dueno: ''
                });
                setMascotaEditada(null);
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

export default FormMascota;
