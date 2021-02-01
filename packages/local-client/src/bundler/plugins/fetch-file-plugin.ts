import esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import axios from 'axios';

const filecache = localforage.createInstance({
  name: 'filecache',
});

export const fetchFilePlugin = (inputCode: string | undefined) => {
  return {
    name: 'fetch-file-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await filecache.getItem<esbuild.OnLoadResult>(
          args.path,
        );
        if (cachedResult) {
          return cachedResult;
        }
      });
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escapedCSS = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
              const style = document.createElement('style');
              style.innerText = '${escapedCSS}';
              document.head.appendChild(style);
            `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await filecache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await filecache.setItem(args.path, result);
        return result;
      });
    },
  };
};
