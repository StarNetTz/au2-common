import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const esmDist = 'dist/esm/index.mjs';
const cjsDist = 'dist/cjs/index.cjs';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: esmDist,
            format: 'es',
            sourcemap: true,
        },
        {
            file: cjsDist,
            format: 'cjs',
            sourcemap: true,
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json'
        }),
        terser({
            mangle: false
        })
    ]
};