import createNextIntlPlugin from 'next-intl/plugin';

// Wrap the Next.js configuration with next-intl to support i18n routing.
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  experimental: {
    serverActions: {
      // Allow server actions to be invoked from localhost and Vercel deployments.
      allowedOrigins: ['localhost', '*.vercel.app']
    }
  }
};

export default withNextIntl(nextConfig);