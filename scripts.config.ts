import { DenonConfig } from 'https://deno.land/x/denon@2.5.0/mod.ts'

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: 'deno run src/main.ts',
      desc: 'Starting scrapper',
      importMap: './importmap.json',
      allow: ['net', 'read', 'write', 'env'],
      unstable: true
    },
    test: {
      cmd: 'deno test',
      desc: 'Performing unit test',
      importMap: './importmap.json',
      allow: ['net', 'read', 'write'],
      unstable: true
    }
  },
  watcher: {
    interval: 0,
    paths: [''],
    exts: ['ts'],
    skip: ['**/.git/**', '**/logs/**', '**/example/**', '**/.vscode/***']
  }
}

export default config
