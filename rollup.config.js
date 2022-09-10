import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import svelte from 'rollup-plugin-svelte'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import pkg from './package.json'
import sapperEnv from 'sapper-environment'

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const dedupe = importee => importee === 'svelte' || importee.startsWith('svelte/')
const onwarn = (warning, onwarnfn) =>
    (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
    (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
    onwarnfn(warning);

const postcssOptions = () => ({
    extensions: ['.scss', '.sass'],
    extract: false,
    minimize: true,
    use: [
        [
            'sass',
            {
                includePaths: [
                    './src/theme',
                    './node_modules',
                    // This is only needed because we're using a local module. :-/
                    // Normally, you would not need this line.
                    path.resolve(__dirname, '..', 'node_modules'),
                ],
            },
        ],
    ],
})

export default {
    client: {
        input: config.client.input(),
        output: config.client.output(),
        preserveEntrySignatures: false,
        plugins: [
            replace({
                ...sapperEnv(),
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            svelte({
                dev,
                hydratable: true,
                emitCss: true,
            }),
            resolve({
                browser: true,
                dedupe,
                preferBuiltins:false,
            }),
            postcss(postcssOptions()),
            commonjs({
                namedExports: {
                    '@signumjs/core': [
                        'Address',
                        'LedgerClientFactory'
                    ],
                    '@signumjs/crypto': [
                        'generateMasterKeys',
                        'getAccountIdFromPublicKey',
                        'generateSignedTransactionBytes',
                        'verifySignature',
                        'generateSignature'
                    ],
                    '@signumjs/contracts': [
                        'ContractDataView',
                        'calculateMinimumCreationFee'
                    ],
                    '@signumjs/util': [
                        'createDeeplink',
                        'Amount',
                        'FeeQuantPlanck'
                    ],
                    '@signumjs/wallets': [
                        'GenericExtensionWallet'
                    ],
                },
            }),
            json(),
            legacy && babel({
                extensions: ['.js', '.mjs', '.html', '.svelte'],
                runtimeHelpers: true,
                exclude: ['node_modules/@babel/**'],
                presets: [
                    ['@babel/preset-env', {
                        targets: '> 0.25%, not dead',
                    }],
                ],
                plugins: [
                    '@babel/plugin-syntax-dynamic-import',
                    ['@babel/plugin-transform-runtime', {
                        useESModules: true,
                    }],
                ],
            }),

            !dev && terser({
                module: true,
            }),
        ],

        onwarn,
    },

    server: {
        input: config.server.input(),
        output: config.server.output(),
        plugins: [
            replace({
                'process.browser': false,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            svelte({
                generate: 'ssr',
                dev,
            }),
            resolve({
                dedupe,
            }),
            commonjs(),
            postcss(postcssOptions()),
        ],
        external: Object.keys(pkg.dependencies).concat(
            require('module').builtinModules || Object.keys(process.binding('natives')),
        ),

        onwarn,
    },

    serviceworker: {
        input: config.serviceworker.input(),
        output: config.serviceworker.output(),
        plugins: [
            resolve(),
            replace({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            commonjs(),
            json(),
            !dev && terser(),
        ],

        onwarn,
    },
}
