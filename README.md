This is a demo project generated using ionic template. The command is as
follow:

`ionic start skygear-ionic tabs`

### Running the demo

Install `iconic` and `cordava` dependencies.

```bash
$ sudo npm install -g ionic cordova
$ sudo npm install -g ios-deploy --unsafe-perm=true
```

Then, to run it at browser

```bash
$ npm install
$ npm run ionic:serve
```

The browser should open automatically and you can try to add an Skygear record


To run it at iOS device (Assuming you have Xcode properly installed)

```bash
$ ionic cordova platform add ios
$ cd platforms/ios/cordova/ && npm install ios-sim && cd ../../../
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

