/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/tic-tac-toe',
        destination: '/tic-tac-toe/singleplayer',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/readme',
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ['en', 'cs', 'ru', 'es', 'cat'],
    defaultLocale: 'en',
  },
  eslint: {
    dirs: ['src'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
            svgo: true,
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },
};
