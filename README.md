# Bootstrap 4, Webpack, and Sass Starter

This is to help jump start a Bootstrap 4, Webpack, Sass project.

### Prerequisites

You will need updated versions of Node and NPM to get started.

### Building

```
npm run build
```

Will compile scss and js with sourcemaps and copy from "src" to "dist." Images in assets will be optimized. Note: Depending on how many images you have it may take awhile on first run. demo.html example to make sure things look right.

```
npm run start
```

Will launch browsersync and watch changes in scss and js in the "src" dirctory, and html files in the root directory.

```
npm run production
```

Will minify all the files and remove sourcemaps and copy to the "dist" directory.

## Built With

* [Bootstrap](https://getbootstrap.com/) - Front-end framework
* [Webpack](https://webpack.js.org/) - Asset bundling