# Building an immersive creative website from scratch without frameworks

## By Luis Henrique Bizarro

### steps

[video here](https://www.awwwards.com/academy/course/building-an-immersive-creative-website-from-scratch-without-frameworks/lectures/010628d6-95e6-4329-87bf-17915878bece)

1. npm init to create package.json
2. implement Webpack
   1. create the files:
      - webpack.config.build.js
      - webpack.config.js
      - webpack.config.development.js
   2. set up package.json like this:
   ```json
   {
     "name": "floema",
     "version": "1.0.0",
     "description": "Building an immersive creative website from scratch without frameworks",
     "main": "index.js",
     "scripts": {
       "build": "webpack -p --progress --config webpack.config.build.js",
       "development": "webpack-dev-server --progress --condfig webpack.config.development.js",
       "start": "npm run development"
     },
     "author": "Gawema",
     "license": "ISC"
   }
   ```
   3. npm install webpack webpack-cli webpack-dev-server webpack-merge --save-dev
   4. config webpack:
      - entry
      - resolve
      - plugins
      - module
      - optimization
3. setup editorconfig
4. setup eslint
5. setup standard JS
