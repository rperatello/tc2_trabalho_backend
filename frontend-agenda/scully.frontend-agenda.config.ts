import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "frontend-agenda",
  outDir: './dist/static',
  puppeteerLaunchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox'] },
  routes: {
  }
};
