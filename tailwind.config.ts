import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink:'#14213d', mint:'#20b486', canvas:'#f5f7fb' }, boxShadow: { soft:'0 12px 40px rgba(20,33,61,.07)' } } }, plugins: [] };
export default config;
