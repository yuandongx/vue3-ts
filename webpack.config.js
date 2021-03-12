// webpack.config.js

module.exports = {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
       options: {
         lessOptions: {
           modifyVars: {
             'primary-color': '#1a915f',
             'link-color': '#1a915f',
             'border-radius-base': '2px',
           },
           javascriptEnabled: true,
         }
       },
      }],
      // ...other rules
    }],
    // ...other config
  }