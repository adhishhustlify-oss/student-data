import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme: { extend: { colors: { bg:'#0B0F19',surface:'#111827',card:'#1F2937',primary:'#3B82F6',secondary:'#6366F1',highlight:'#22D3EE' } } }, plugins: [] } satisfies Config;
