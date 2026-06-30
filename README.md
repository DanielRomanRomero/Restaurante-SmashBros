# Smash Bros Burger 🍔

Aplicación web para la gestión de reservas y carta digital del restaurante **Smash Bros Burger**.

## Características

### Parte pública
- Consulta de la carta del restaurante organizada por secciones (entrantes, hamburguesas, postres, etc.)
- Sistema de reservas con selección de fecha, franja horaria y comprobación de disponibilidad en tiempo real
- Cancelación de reservas propias
- Registro e inicio de sesión de clientes

### Panel de administración (rol `admin`)
- Listado completo de reservas
- Modificación y cancelación de reservas
- CRUD de secciones de la carta
- CRUD de platos (asignados a una sección)

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + React Router 7 |
| Estilos | Tailwind CSS 3 + CSS3 nativo |
| Build | Vite 8 |
| Backend / BD | Supabase (Auth + PostgreSQL) |

## Estructura del proyecto

```
src/
├── components/
│   ├── admin/        # Componentes del panel de administración
│   ├── layout/       # Cabecera, pie de página, estructura general
│   ├── menu/         # Carta y platos
│   ├── reservation/  # Formulario y gestión de reservas
│   └── ui/           # Componentes reutilizables (botones, modales, etc.)
├── context/          # Contextos de React (auth, etc.)
├── hooks/            # Custom hooks
├── lib/              # Cliente de Supabase y utilidades
└── pages/
    ├── admin/        # Páginas del panel de administración
    ├── auth/         # Login y registro
    ├── errors/       # Páginas de error (404, etc.)
    └── public/       # Páginas públicas (inicio, carta, reservas)
```

## Puesta en marcha

### Requisitos
- Node.js 18+
- Cuenta en [Supabase](https://supabase.com)

### Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/smash-bros-burger.git
cd smash-bros-burger

# 2. Instala las dependencias
npm install

# 3. Crea el archivo de variables de entorno
cp .env.example .env
```

### Variables de entorno

Crea un archivo `.env` en la raíz con las siguientes claves de tu proyecto de Supabase:

```env
VITE_SUPABASE_URL=https://<tu-proyecto>.supabase.co
VITE_SUPABASE_ANON_KEY=<tu-anon-key>
```

### Base de datos

Ejecuta los archivos SQL en tu proyecto de Supabase en este orden:

1. `supabase_schema.sql` — estructura de tablas y políticas RLS
2. `supabase_migration_alergenos.sql` — migración de alérgenos

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
npm run preview
```

## Roles de usuario

| Rol | Acceso |
|---|---|
| Sin cuenta | Carta y páginas públicas |
| `cliente` | Carta + crear y cancelar sus propias reservas |
| `admin` | Todo lo anterior + panel de administración completo |

> El rol `admin` se asigna manualmente desde Supabase directamente en la tabla de usuarios.
