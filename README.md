# ToDo (quasar-todo)

ToDo app

## Install the dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
```

### Format the files

```bash
yarn format
```

### Build the app for production

```bash
quasar build
```

and then copy /dist/spa to docs because github pages will be deployed from docs

### Building for android

Only once, to set up

```bash
quasar mode add cordova
cd src-cordova
cordova platform add android
cordova requirements
```

and finally to build in debug mode

```bash
cordova build -m android -d
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
