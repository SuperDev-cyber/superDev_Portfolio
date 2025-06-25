/** @type {import('next').NextConfig} */


const isGithubPages = process.env.DEPLOY_TARGET === 'GH_PAGES';

const nextConfig = {
    output: 'export',
    // images: {
    //     unoptimized: true, // ✅ disables Image Optimization API
    // },
    // assetPrefix: isGithubPages ? '/myportfolio/' : '',
    // basePath: isGithubPages ? '/myportfolio' : '',
    // trailingSlash: true
};

export default nextConfig;
