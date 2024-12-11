/** @type {import('next').NextConfig} */

const env = process.env.NEXT_PUBLIC_ENV || 'production';

let outputDir;

if (env === 'production') {
    outputDir = 'out-prod';
} else if (env === 'staging') {
    outputDir = 'out-stage';
} else {
    outputDir = 'out-dev';
}

const nextConfig = {
    "output": 'export',
    distDir: outputDir,
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ultrapro-info-images.s3.amazonaws.com',
                pathname: '/**',
            },
        ],

        unoptimized: true,
    },
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    
}

module.exports = nextConfig
