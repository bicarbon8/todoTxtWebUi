const webpack = require("webpack");
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  }, 
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes (please adjust)
        name: "todoTxtWebUi",
        filename: "remoteEntry.js",
        exposes: {
            './Module': './src/app/todo-txt-web-ui/todo-txt-web-ui.module.ts',
        },        
        
        shared: share({
          "@angular/core": { singleton: true }, 
          "@angular/common": { singleton: true }, 
          "@angular/common/http": { singleton: true }, 
          "@angular/router": { singleton: true },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
