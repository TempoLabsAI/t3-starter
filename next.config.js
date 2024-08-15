/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  transpilePackages: ["geist"],
};

if (process.env.NEXT_PUBLIC_TEMPO) {
  config["experimental"] = {
    swcPlugins: [[require.resolve("tempo-devtools/swc"), {}]]
  }
}

export default config;
