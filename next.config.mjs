import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);

const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Required for bip39
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    };

    return config;
  },
};

export default nextConfig;
