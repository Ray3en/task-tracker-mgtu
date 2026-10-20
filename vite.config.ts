import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');

//   return {
//     plugins: [react()],
//     server: {
//       host: '0.0.0.0',
//       port: Number(env.VITE_PORT),
//       strictPort: true,
//     },
//   };
// });