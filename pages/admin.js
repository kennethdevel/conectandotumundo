import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Download, Upload, Package, ImageIcon,
  CheckCircle, AlertCircle, Settings, Edit3, X, Eye, Lock, LogOut,
} from 'lucide-react';
import productosBase from '../data/productos.json';

// Clave localStorage unificada — catálogo y admin usan la misma lista
const STORAGE_KEY = 'productos_catalogo';

// ── Clave de acceso (hash simple para no exponer la clave en texto plano) ──
const HASH_CLAVE = 'f34caa9d1e1950cef0eec2c3de102092'; // hash de la clave configurada

async function hashear(texto) {
  const buf  = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

function PantallaLogin({ onAcceso }) {
  const [clave,   setClave]   = useState('');
  const [error,   setError]   = useState(false);
  const [visible, setVisible] = useState(false);
  const [cargando,setCargando]= useState(false);

  const verificar = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(false);
    const hash = await hashear(clave);
    if (hash === HASH_CLAVE) {
      sessionStorage.setItem('admin_ok', '1');
      onAcceso();
    } else {
      setError(true);
      setClave('');
    }
    setCargando(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Icono */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center justify-center">
            <Lock className="w-8 h-8 text-teal-400" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-white text-center mb-1">Panel Admin</h1>
        <p className="text-gray-500 text-sm text-center mb-8">Ingresá tu clave para continuar</p>

        <form onSubmit={verificar} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-4">
          <div className="relative">
            <input
              type={visible ? 'text' : 'password'}
              placeholder="Contraseña"
              value={clave}
              onChange={(e) => { setClave(e.target.value); setError(false); }}
              className={`input-dark pr-10 ${error ? 'border-red-500 focus:border-red-500' : ''}`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-red-400 text-sm flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" /> Clave incorrecta. Intentá de nuevo.
            </motion.p>
          )}

          <button
            type="submit"
            disabled={!clave || cargando}
            className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200"
          >
            {cargando ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-gray-600 text-xs text-center mt-4">
          Acceso restringido · Solo administrador
        </p>
      </motion.div>
    </div>
  );
}

const CATEGORIAS = [
  'Laptops', 'Celulares', 'Monitores', 'Accesorios', 'Cámaras',
  'Redes', 'Audio', 'Tablets', 'Gaming', 'Impresoras',
  'Almacenamiento', 'Servicios', 'Smart Home', 'Otro',
];

const FORM_VACÍO = {
  nombre:      '',
  descripcion: '',
  precio:      '',
  categoria:   '',
  imagen:      '',
  colores:     '',
};

function Toast({ msg, tipo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl font-medium text-sm ${
        tipo === 'ok' ? 'bg-teal-600 text-white' : 'bg-red-600 text-white'
      }`}
    >
      {tipo === 'ok' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {msg}
    </motion.div>
  );
}

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false);
  const [productos,   setProductos]   = useState([]);
  const [form,        setForm]        = useState(FORM_VACÍO);
  const [preview,     setPreview]     = useState('');
  const [toast,       setToast]       = useState(null);
  const [editIndex,   setEditIndex]   = useState(null);
  const [verDetalle,  setVerDetalle]  = useState(null);
  const fileRef = useRef(null);

  /* ── Verificar sesión al cargar ── */
  useEffect(() => {
    if (sessionStorage.getItem('admin_ok') === '1') setAutenticado(true);
  }, []);

  const cerrarSesion = () => {
    sessionStorage.removeItem('admin_ok');
    setAutenticado(false);
  };

  /* ── Carga inicial: si no hay lista unificada, inicializa con el catálogo base ── */
  useEffect(() => {
    if (!autenticado) return;
    try {
      const guardados = localStorage.getItem(STORAGE_KEY);
      if (guardados) {
        setProductos(JSON.parse(guardados));
      } else {
        // Primera vez: copia el catálogo base a localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(productosBase));
        setProductos(productosBase);
      }
    } catch {
      setProductos(productosBase);
    }
  }, [autenticado]);

  /* ── Pantalla de login si no está autenticado ── */
  if (!autenticado) return <PantallaLogin onAcceso={() => setAutenticado(true)} />;

  /* ── Toast ── */
  const mostrarToast = (msg, tipo = 'ok') => {
    setToast({ msg, tipo });
    setTimeout(() => setToast(null), 3000);
  };

  /* ── Imagen desde archivo ── */
  const handleArchivo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      mostrarToast('La imagen no debe superar 4 MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, imagen: ev.target.result }));
      setPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  /* ── Imagen desde URL ── */
  const handleURL = (e) => {
    const url = e.target.value;
    setForm((f) => ({ ...f, imagen: url }));
    setPreview(url);
  };

  /* ── Cargar form para editar ── */
  const iniciarEdicion = (p, index) => {
    setForm({
      nombre:      p.nombre,
      descripcion: p.descripcion || '',
      precio:      p.precio,
      categoria:   p.categoria,
      imagen:      p.imagen || '',
      colores:     p.colores ? p.colores.join(', ') : '',
    });
    setPreview(p.imagen || '');
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Guardar / actualizar ── */
  const guardar = () => {
    if (!form.nombre.trim() || !form.precio.trim() || !form.categoria) {
      mostrarToast('Nombre, precio y categoría son obligatorios', 'error');
      return;
    }

    const nuevo = {
      nombre:      form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio:      form.precio.trim(),
      categoria:   form.categoria,
      imagen:      form.imagen.trim(),
      ...(form.colores.trim()
        ? { colores: form.colores.split(',').map((c) => c.trim()).filter(Boolean) }
        : {}),
    };

    let actualizados;
    if (editIndex !== null) {
      actualizados = [...productos];
      actualizados[editIndex] = nuevo;
      mostrarToast('Producto actualizado ✓');
    } else {
      actualizados = [...productos, nuevo];
      mostrarToast('Producto guardado ✓');
    }

    setProductos(actualizados);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
    setForm(FORM_VACÍO);
    setPreview('');
    setEditIndex(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  /* ── Cancelar edición ── */
  const cancelarEdicion = () => {
    setForm(FORM_VACÍO);
    setPreview('');
    setEditIndex(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  /* ── Eliminar ── */
  const eliminar = (index) => {
    if (!confirm('¿Eliminás este producto del catálogo?')) return;
    const nuevos = productos.filter((_, i) => i !== index);
    setProductos(nuevos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevos));
    mostrarToast('Producto eliminado');
  };

  /* ── Exportar JSON ── */
  const exportarJSON = () => {
    if (productos.length === 0) {
      mostrarToast('No hay productos para exportar', 'error');
      return;
    }
    const blob = new Blob([JSON.stringify(productos, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'catalogo_productos.json';
    a.click();
    URL.revokeObjectURL(url);
    mostrarToast('JSON exportado ✓');
  };

  /* ── Restaurar catálogo original ── */
  const restaurarOriginal = () => {
    if (!confirm('¿Restaurar el catálogo original? Se perderán los cambios que no hayas exportado.')) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productosBase));
    setProductos(productosBase);
    mostrarToast('Catálogo restaurado al original ✓');
  };

  /* ── Imagen helper ── */
  const imgSrc = (img) => {
    if (!img) return '/logoMejorado.png';
    const t = img.trim();
    if (t.startsWith('data:') || t.startsWith('http')) return t;
    return `/${t}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 pb-28">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} tipo={toast.tipo} />}
      </AnimatePresence>

      {/* Modal de detalle */}
      <AnimatePresence>
        {verDetalle && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setVerDetalle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-sm w-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-bold text-lg leading-tight pr-4">{verDetalle.nombre}</h3>
                <button onClick={() => setVerDetalle(null)} className="text-gray-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="w-full h-48 bg-gray-900 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <img src={imgSrc(verDetalle.imagen)} alt={verDetalle.nombre}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => { e.target.src = '/logoMejorado.png'; }} />
              </div>
              <p className="text-teal-400 font-bold text-2xl mb-2">{verDetalle.precio}</p>
              <p className="text-gray-400 text-sm mb-2">{verDetalle.descripcion}</p>
              <span className="badge text-xs">{verDetalle.categoria}</span>
              {verDetalle.colores && (
                <p className="text-gray-500 text-xs mt-2">Colores: {verDetalle.colores.join(', ')}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Settings className="w-5 h-5 text-teal-400" />
              <span className="text-teal-400 text-sm font-medium uppercase tracking-wider">Panel de administración</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              Gestión de <span className="text-teal-400">Productos</span>
            </h1>
            <p className="text-gray-400 mt-1">
              {productos.length} producto(s) agregado(s) por vos
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={exportarJSON}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl transition-all text-sm font-medium"
            >
              <Download className="w-4 h-4" /> Exportar
            </button>
            <button
              onClick={restaurarOriginal}
              title="Restaurar catálogo original"
              className="flex items-center gap-2 bg-gray-700 hover:bg-amber-600 text-gray-400 hover:text-white px-4 py-2.5 rounded-xl transition-all text-sm font-medium"
            >
              <Upload className="w-4 h-4" /> Restaurar
            </button>
            <button
              onClick={cerrarSesion}
              title="Cerrar sesión"
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-4 py-2.5 rounded-xl transition-all text-sm font-medium"
            >
              <LogOut className="w-4 h-4" /> Salir
            </button>
          </div>
        </div>

        {/* ─── Formulario ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-10"
        >
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            {editIndex !== null ? (
              <><Edit3 className="w-5 h-5 text-teal-400" /> Editando producto #{editIndex + 1}</>
            ) : (
              <><Plus className="w-5 h-5 text-teal-400" /> Agregar nuevo producto</>
            )}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-xs mb-1.5 uppercase tracking-wide">Nombre del producto *</label>
              <input
                placeholder="ej: Laptop Lenovo IdeaPad 5 15.6 i5 16GB 512GB"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="input-dark"
              />
            </div>

            {/* Precio */}
            <div>
              <label className="block text-gray-400 text-xs mb-1.5 uppercase tracking-wide">Precio *</label>
              <input
                placeholder="ej: ₡350,000"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
                className="input-dark"
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-gray-400 text-xs mb-1.5 uppercase tracking-wide">Categoría *</label>
              <select
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                className="input-dark cursor-pointer"
              >
                <option value="">Seleccioná una categoría</option>
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c} className="bg-gray-800">{c}</option>
                ))}
              </select>
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-xs mb-1.5 uppercase tracking-wide">Descripción</label>
              <textarea
                placeholder="Describí las características principales del producto..."
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                rows={3}
                className="input-dark resize-none"
              />
            </div>

            {/* Colores */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-xs mb-1.5 uppercase tracking-wide">
                Colores disponibles <span className="normal-case text-gray-600">(separados por coma, opcional)</span>
              </label>
              <input
                placeholder="ej: Negro, Blanco, Azul, Plata"
                value={form.colores}
                onChange={(e) => setForm({ ...form, colores: e.target.value })}
                className="input-dark"
              />
            </div>

            {/* Imagen */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">Imagen del producto</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Upload */}
                <label className="cursor-pointer group">
                  <div className="border-2 border-dashed border-gray-600 group-hover:border-teal-500 rounded-2xl p-6 text-center transition-all duration-200 h-full flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-gray-700 group-hover:bg-teal-500/10 rounded-xl flex items-center justify-center transition-colors">
                      <Upload className="w-6 h-6 text-gray-500 group-hover:text-teal-400 transition-colors" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">Subir foto desde tu computadora</p>
                    <p className="text-gray-600 text-xs">JPG, PNG, WEBP · Máx 4 MB</p>
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleArchivo}
                    className="hidden"
                  />
                </label>

                {/* Preview o URL */}
                <div className="flex flex-col gap-3">
                  <div className="flex-1 h-32 bg-gray-900 rounded-2xl border border-gray-700 flex items-center justify-center overflow-hidden">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Vista previa"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => { e.target.src = '/logoMejorado.png'; }}
                      />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 text-gray-700 mx-auto mb-1" />
                        <p className="text-gray-600 text-xs">Vista previa</p>
                      </div>
                    )}
                  </div>

                  <input
                    placeholder="O pegá una URL de imagen (https://...)"
                    value={form.imagen.startsWith('data:') ? '' : form.imagen}
                    onChange={handleURL}
                    className="input-dark text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botones del form */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={guardar}
              className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/25"
            >
              {editIndex !== null ? <><Edit3 className="w-4 h-4" /> Actualizar producto</> : <><Plus className="w-4 h-4" /> Guardar producto</>}
            </button>
            {editIndex !== null && (
              <button
                onClick={cancelarEdicion}
                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-gray-300 px-5 py-3 rounded-xl transition"
              >
                <X className="w-4 h-4" /> Cancelar
              </button>
            )}
          </div>
        </motion.div>

        {/* ─── Lista de productos ─── */}
        <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-teal-400" />
          Productos guardados
          {productos.length > 0 && (
            <span className="ml-1 bg-teal-500/15 text-teal-400 text-xs px-2 py-0.5 rounded-full border border-teal-500/20">
              {productos.length}
            </span>
          )}
        </h2>

        {productos.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/50 border border-dashed border-gray-700 rounded-2xl">
            <Package className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No hay productos guardados todavía.</p>
            <p className="text-gray-600 text-sm mt-1">Completá el formulario de arriba para agregar el primero.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {productos.map((p, i) => (
                <motion.div
                  key={`${p.nombre}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center gap-4 hover:border-gray-600 transition"
                >
                  {/* Miniatura */}
                  <div
                    className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-teal-500/50 transition"
                    onClick={() => setVerDetalle(p)}
                  >
                    <img
                      src={imgSrc(p.imagen)}
                      alt={p.nombre}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => { e.target.src = '/logoMejorado.png'; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{p.nombre}</p>
                    <p className="text-teal-400 text-sm font-bold">{p.precio}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-500 text-xs bg-gray-700 px-2 py-0.5 rounded-full">{p.categoria}</span>
                      {p.colores && (
                        <span className="text-gray-500 text-xs">{p.colores.length} color(es)</span>
                      )}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setVerDetalle(p)}
                      title="Ver detalle"
                      className="p-2 text-gray-500 hover:text-teal-400 hover:bg-gray-700 rounded-lg transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => iniciarEdicion(p, i)}
                      title="Editar"
                      className="p-2 text-gray-500 hover:text-yellow-400 hover:bg-gray-700 rounded-lg transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => eliminar(i)}
                      title="Eliminar"
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-700 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Aviso de persistencia */}
        <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs">
            💡 Los productos se guardan en este navegador. Usá <strong className="text-gray-400">Exportar JSON</strong> para hacer una copia de seguridad o para compartirlos con el equipo.
          </p>
        </div>
      </div>
    </div>
  );
}
