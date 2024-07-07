module.exports = {
    // ... other configuration options
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
              },
            },
          ],
        },
        // ... other loaders
      ],
    },
    // ... other configuration options
  };
  