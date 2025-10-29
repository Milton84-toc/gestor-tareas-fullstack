# Fullstack Vue + Express + MySQL (Corregido CJS)

## Backend
```bash
cd backend
cp .env.example .env   # edita credenciales
npm install
npm run dev            # http://localhost:4000/api
# (opcional) npm run seed
```

## Frontend
```bash
cd frontend
npm install
npm run serve          # http://localhost:8080
```

Para apuntar a otra API, define `VUE_APP_API_URL` al construir, o edita `src/services/api.js`.
