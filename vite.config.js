import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// ★ 기존 'tailwindcss' 대신 새로 설치한 '@tailwindcss/postcss'를 불러옵니다.
import tailwindcss from '@tailwindcss/postcss' 
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      // ★ 플러그인을 적용할 때 괄호()를 붙여 함수 형태로 실행해 줍니다.
      plugins: [tailwindcss(), autoprefixer()], 
    },
  },
})