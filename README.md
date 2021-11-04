# Bootstrap 5, Webpack 5, and Sass Starter

This is to help jump start a Bootstrap 5 project.

### Prerequisites

Tested with Node 16.8+ and NPM 7.21+

### Building

```
npm run dev
```

Will compile scss and js with sourcemaps and copy from "src" to "dist." demo.html example to make sure things look right.

```
npm run start
```

Will launch browsersync and watch changes in scss and js in the "src" dirctory, and html files in the root directory.

```
npm run build
```

Will minify all the files and remove sourcemaps and copy to the "dist" directory. Images in assets will be optimized. Note: Depending on how many images you have it may take awhile on first run. Delete the .cache file to rerun all images.

## Built With

* [Bootstrap](https://getbootstrap.com/) - Front-end framework
* [HTML5 Boilerplate](https://html5boilerplate.com/) - Template Kickstart
* [Webpack](https://webpack.js.org/) - Asset bundling
