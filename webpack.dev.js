const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const port = 3000;
let publicUrl = `ws://localhost:${port}/ws`;

//only for github
if (process.env.GITPOD_WORKSPACE_URL) {
  const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
  publicUrl = `wss://${port}-${host}/ws`;
}

//only for codespaces
if (process.env.CODESPACE_NAME) {
  publicUrl = `wss://${process.env.CODESPACE_NAME}-${port}.app.github.dev/ws`;
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port,
    hot: true,
    allowedHosts: "all",
    historyApiFallback: true,
    static: [ // <--- ¡Cambiamos a un array para servir múltiples directorios!
      {
        directory: path.resolve(__dirname, "dist"),
      },
      {
        // Agregamos la carpeta 'public' para que el servidor también sirva su contenido
        directory: path.resolve(__dirname, "public"),
        // Esto hace que el contenido de 'public' sea accesible en la raíz del servidor (/)
        publicPath: '/',
        serveIndex: true,
        watch: true, // Para que observe los cambios
      },
    ],
    client: {
      webSocketURL: publicUrl
    },
  },
  plugins: [
    // new FriendlyErrorsWebpackPlugin(),
    // new ErrorOverlayPlugin(),
    // new PrettierPlugin({
    //     parser: "babylon",
    //     printWidth: 120,             // Specify the length of line that the printer will wrap on.
    //     tabWidth: 4,                // Specify the number of spaces per indentation-level.
    //     useTabs: true,              // Indent lines with tabs instead of spaces.
    //     bracketSpacing: true,
    //     extensions: [ ".js", ".jsx" ],
    //     jsxBracketSameLine: true,
    //     semi: true,                 // Print semicolons at the ends of statements.
    //     encoding: 'utf-8'           // Which encoding scheme to use on files
    // }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
