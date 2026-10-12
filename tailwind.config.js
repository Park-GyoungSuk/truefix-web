/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ★ src 폴더 하위의 모든 컴포넌트를 스캔하도록 지정
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}