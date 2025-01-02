
# prerequisites

- You need to have npx installed
- You need to have Node 20 installed

# use recent node
nvm use 20

# install build dependencies
npx expo install expo-av react react-dom react-native react-native-web
npx expo install @expo/webpack-config@^19.0.0

# install platform dependencies (only when using larger third-party packages, otherwise do not use it)
cd ios
pod install

# run it
npx expo start (then press i or w)

# build it
...
