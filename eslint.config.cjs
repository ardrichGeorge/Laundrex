const eslintPluginReact = require('eslint-plugin-react');
const babelParser = require('@babel/eslint-parser');

module.exports = [
    // 🔹 Frontend: React
    {
        files: ['client/**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: babelParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                requireConfigFile: false,
                babelOptions: {
                    plugins: ['@babel/plugin-syntax-jsx']
                }
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly'
            }
        },
        plugins: {
            react: eslintPluginReact
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'react/prop-types': 'off'
        }
    },

    // 🔸 Backend: Node.js
    {
        files: ['server/**/*.js', '*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                process: 'readonly',
                module: 'writable',
                require: 'writable',
                console: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off'
        }
    }
];
