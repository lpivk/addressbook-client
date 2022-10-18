import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react(), pluginRewriteAll()],
});
