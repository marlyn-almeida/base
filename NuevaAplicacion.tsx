// creado por Marlyn Almeida el 21/08/2025
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AplicativoForm, insertarAplicativo } from '../../types/Aplicaciones';

const NuevaAplicacion: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<AplicativoForm>({
    nombreCorto: '',
    nombreCompleto: '',
    descripcion: '',
    enlace: '',
    criticidadId: 0,
    observaciones: '',
    registro: new Date().toISOString().split('T')[0],
    fechaAdquisicion: '',
    fechaImplementacion: '',
    proveedor: '',
    version: '',
    anioCreacion: new Date().getFullYear(),
    numeroUsuarios: 0,
    administradorUsuario: '',
    valorEstimado: 0,
    transaccionesMensuales: 0,
    fechaActualizacion: '',
    sla: '',
    rutaDocTecnico: '',
    tiempoReinicio: '',
    horaReinicio: '',
    activo: true,
    soporteVigente: true,
    https: true,
    areaRequirente: '',
    subarea: '',
    proceso: '',
    tipoCriticidadId: 0,
    herramientaId: 0,
    tipoAccesoId: 0,
    tipoAplicativoId: 0,
    fuenteDatosId: 0,
    estadoId: 0,
    interfazId: 0,
    fuenteId: 0,
    descripcionTecnicaId: 0,
    contextoFuncionalId: 0
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'criticidadId' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const id = await insertarAplicativo(formData);
      if (id) {
        navigate(`/aplicaciones/${'apl-' + id}/detalle`);
      } else {
        alert('Error al guardar la aplicación');
      }
    } catch (error) {
      console.error('Error al guardar aplicación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Agregar Nueva Aplicación</h1>
        <p className="text-gray-600">Registrar una aplicación nueva en el sistema</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Identificación */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Identificación</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Corto *</label>
              <input
                type="text"
                name="nombreCorto"
                value={formData.nombreCorto}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
              <input
                type="text"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows={3}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Técnica */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Información Técnica</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Enlace</label>
              <input
                type="url"
                name="enlace"
                value={formData.enlace}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Versión</label>
              <input
                type="text"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Criticidad */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Criticidad</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nivel *</label>
            <select
              name="criticidadId"
              value={formData.criticidadId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value={0}>Seleccionar...</option>
              <option value={1}>Alta</option>
              <option value={2}>Media</option>
              <option value={3}>Baja</option>
            </select>
          </div>
        </div>

        {/* Observaciones */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Observaciones</h3>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Información adicional relevante..."
          />
        </div>
        {/* Fechas y Auditoría */} 
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Fechas y Auditoría</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Adquisición</label>
              <input
                type="date"
                name="fechaAdquisicion"
                value={formData.fechaAdquisicion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Implementación</label>
              <input
                type="date"
                name="fechaImplementacion"
                value={formData.fechaImplementacion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Actualización</label>
              <input
                type="date"
                name="fechaActualizacion"
                value={formData.fechaActualizacion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Año de Creación</label>
              <input
                type="number"
                name="anioCreacion"
                value={formData.anioCreacion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Usuarios y Operación */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Usuarios y Operación</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número de Usuarios</label>
              <input
                type="number"
                name="numeroUsuarios"
                value={formData.numeroUsuarios}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Administrador</label>
              <input
                type="text"
                name="administradorUsuario"
                value={formData.administradorUsuario}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valor Estimado</label>
              <input
                type="number"
                name="valorEstimado"
                value={formData.valorEstimado}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transacciones Mensuales</label>
              <input
                type="number"
                name="transaccionesMensuales"
                value={formData.transaccionesMensuales}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Seguridad y SLA */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Seguridad y SLA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SLA</label>
              <input
                type="text"
                name="sla"
                value={formData.sla}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ruta Doc. Técnica</label>
              <input
                type="text"
                name="rutaDocTecnico"
                value={formData.rutaDocTecnico}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tiempo Reinicio</label>
              <input
                type="text"
                name="tiempoReinicio"
                value={formData.tiempoReinicio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hora Reinicio</label>
              <input
                type="text"
                name="horaReinicio"
                value={formData.horaReinicio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

          {/* Catálogos Relacionales */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Metadatos Técnicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo de Criticidad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Criticidad</label>
                <select
                  name="tipoCriticidadId"
                  value={formData.tipoCriticidadId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value={0}>Seleccionar...</option>
                  <option value={1}>Operativa</option>
                  <option value={2}>Estratégica</option>
                  <option value={3}>Regulatoria</option>
                </select>
              </div>

              {/* Herramienta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Herramienta</label>
                <select
                  name="herramientaId"
                  value={formData.herramientaId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value={0}>Seleccionar...</option>
                  <option value={1}>Power BI</option>
                  <option value={2}>SAP</option>
                  <option value={3}>Oracle</option>
                </select>
              </div>

              {/* Tipo de Acceso */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Acceso</label>
                <select
                  name="tipoAccesoId"
                  value={formData.tipoAccesoId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value={0}>Seleccionar...</option>
                  <option value={1}>Web</option>
                  <option value={2}>Desktop</option>
                  <option value={3}>Mobile</option>
                </select>
              </div>

              {/* Tipo de Aplicativo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Aplicativo</label>
                <select
                  name="tipoAplicativoId"
                  value={formData.tipoAplicativoId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value={0}>Seleccionar...</option>
                  <option value={1}>Interno</option>
                  <option value={2}>Externo</option>
                  <option value={3}>Mixto</option>
                </select>
              </div>

              {/* Fuente de Datos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuente de Datos</label>
                <select
                  name="fuenteDatosId"
                  value={formData.fuenteDatosId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value={0}>Seleccionar...</option>
                  <option value={1}>SQL Server</option>
                  <option value={2}>PostgreSQL</option>
                  <option value={3}>MongoDB</option>
                </select>
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  name="estadoId"
                  value={formData.estadoId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value={0}>Seleccionar...</option>
                  <option value={1}>Activo</option>
                  <option value={2}>En mantenimiento</option>
                  <option value={3}>Descontinuado</option>
                </select>
              </div>

              {/* Interfaz */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interfaz</label>
                <select
                  name="interfazId"
                  value={formData.interfazId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value={0}>Seleccionar...</option>
                  <option value={1}>REST</option>
                  <option value={2}>SOAP</option>
                  <option value={3}>GraphQL</option>
                </select>
              </div>

              {/* Fuente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuente</label>
                <select
                  name="fuenteId"
                  value={formData.fuenteId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value={0}>Seleccionar...</option>
                  <option value={1}>Interna</option>
                  <option value={2}>Externa</option>
                </select>
              </div>

              {/* Descripción Técnica */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción Técnica</label>
                <select
                  name="descripcionTecnicaId"
                  value={formData.descripcionTecnicaId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value={0}>Seleccionar...</option>
                  <option value={1}>Frontend</option>
                  <option value={2}>Backend</option>
                  <option value={3}>Fullstack</option>
                </select>
              </div>

              {/* Contexto Funcional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contexto Funcional</label>
                <select
                  name="contextoFuncionalId"
                  value={formData.contextoFuncionalId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value={0}>Seleccionar...</option>
                  <option value={1}>Financiero</option>
                  <option value={2}>Operativo</option>
                  <option value={3}>Legal</option>
                </select>
              </div>
            </div>
          </div>


        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/aplicaciones')}
            className="px-6 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50"
          >
            {isLoading ? 'Guardando...' : 'Guardar Aplicación'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevaAplicacion;
