const {resolve} = require("path")
const webpack = require("webpack")
const debug = require("debug")("app:config:webpack")

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

debug("Creating configuration.")
const webpackConfig = {
  name: "client",
  target: "web",
  resolve: {
    modules: [resolve("./src"), resolve("./node_modules")],
    alias: {
      "react-native": "react-native-web",
      "react-router-native": "react-router-dom",
      "styled-components/native": "styled-components",
    },
    extensions: [".web.js", ".js"],
  },
  module: {},
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = "./src/index.js"

const reactExternal = {
  root: "React",
  commonjs2: "react",
  commonjs: "react",
  amd: "react",
}

const reduxExternal = {
  root: "Redux",
  commonjs2: "redux",
  commonjs: "redux",
  amd: "redux",
}

const reactReduxExternal = {
  root: "ReactRedux",
  commonjs2: "react-redux",
  commonjs: "react-redux",
  amd: "react-redux",
}

const reactNativeWebExternal = {
  root: "ReactNativeWeb",
  commonjs2: "react-native-web",
  commonjs: "react-native-web",
  amd: "react-native-web",
}

const styledComponentsExternal = {
  root: "StyledComponents",
  commonjs2: "styled-components",
  commonjs: "styled-components",
  amd: "styled-components",
}

const reactRouterDomExternal = {
  root: "ReactRouterDom",
  commonjs2: "react-router-dom",
  commonjs: "react-router-dom",
  amd: "react-router-dom",
}

const reduxFormExternal = {
  root: "ReduxForm",
  commonjs2: "redux-form",
  commonjs: "redux-form",
  amd: "redux-form",
}

const jsUtilsExternal = {
  root: "@petal/js-utils",
  commonjs2: "@petal/js-utils",
  commonjs: "@petal/js-utils",
  amd: "@petal/js-utils",
}

const reactSelectExternal = {
  root: "ReactSelect",
  commonjs2: "react-select",
  commonjs: "react-select",
  amd: "react-select",
}

webpackConfig.externals = {
  react: reactExternal,
  redux: reduxExternal,
  "react-redux": reactReduxExternal,
  "react-native-web": reactNativeWebExternal,
  "styled-components": styledComponentsExternal,
  "react-router-dom": reactRouterDomExternal,
  "redux-form": reduxFormExternal,
  "react-select": reactSelectExternal,
  "@petal/js-utils": jsUtilsExternal,
}

const env = process.env.NODE_ENV

webpackConfig.entry = []

webpackConfig.entry.push(APP_ENTRY)

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  library: "components",
  libraryTarget: "umd",
}

// ------------------------------------
// Rules
// ------------------------------------
// JavaScript
//
webpackConfig.module.rules = [
  {
    test: /\.woff(\?.*)?$/,
    use: [
      {
        loader: "url-loader",
        options: {
          prefix: "fonts/&name=[path][name].[ext]",
          limit: 10000,
          mimetype: "application/font-woff",
        },
      },
    ],
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: [
      {
        loader: "url-loader",
        options: {
          prefix: "fonts/&name=[path][name].[ext]",
          limit: 10000,
          mimetype: "application/font-woff2",
        },
      },
    ],
  },
  {
    test: /\.otf(\?.*)?$/,
    use: [
      {
        loader: "file-loader",
        options: {
          prefix: "fonts/&name=[path][name].[ext]",
          limit: 10000,
          mimetype: "application/opentype",
        },
      },
    ],
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: [
      {
        loader: "url-loader",
        options: {
          prefix: "fonts/&name=[path][name].[ext]",
          limit: 10000,
          mimetype: "application/octet-stream",
        },
      },
    ],
  },
  {
    test: /\.eot(\?.*)?$/,
    use: [
      {
        loader: "file-loader",
        options: {
          prefix: "fonts/&name=[path][name].[ext]",
        },
      },
    ],
  },
  {
    test: /\.svg(\?.*)?$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/svg+xml",
        },
      },
    ],
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    ],
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        babelrc: true,
      },
    },
  },
]

webpackConfig.plugins = []

if (env === "production") {
  webpackConfig.plugins.push(
    new UglifyJsPlugin({
      sourceMap: true,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
  )
}

module.exports = webpackConfig
