const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
  devServer: {
    host: "localhost", //启动服务器域名
    port: "3000", //启动服务器端口号
    open: true, //是否自动打开浏览器
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      //可以自定义属性
      title: "app",
      //模板：以index.html文件创建新的html文件
      //新的html文件特点：1.结构和原来一致 2.自动引入打包输出的资源
      template: path.resolve(__dirname, "index.html"),
      inject: "head",
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 根据运行环境判断使用那个 loader
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        //排除node_modules下的文件，其他文件都处理
        // exclude:/node_modules/

        //只处理src下的文件，其他文件不处理
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(process.cwd(), "tsconfig.json"),
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    usedExports: true, //开启tree shaking
  },
  mode: "development",
};
