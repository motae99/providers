module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        alias: {
          assets: './src/assets',
          img: './src/assets/img',
          lottie: './src/assets/lottie',
          components: './src/components',
          navigation: './src/navigation',
          constants: './src/constants',
          context: './src/context',
          reducers: './src/reducers',
          stacks: './src/stacks',
          auth: './src/stacks/auth',
          social: './src/stacks/social',
          styles: './src/styles',
          utils: './src/utils',
        },
      },
    },
  },
};
