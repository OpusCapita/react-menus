import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/index.js',
  plugins: [
    url(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ], 'react' ],
      plugins: [ 'transform-class-properties', 'external-helpers' ]
    }),
    cjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/react.js': ['Component', 'PropTypes']
      }
    }),
    resolve({
      jsnext: true,
      main: true
    })
  ],
  targets: [
    {
      dest: pkg.main,
      format: 'cjs',
      sourceMap: true
    }
  ]
};
