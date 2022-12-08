import { DenonConfig } from 'https://deno.land/x/denon@2.5.0/mod.ts'

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: 'deno run src/main.ts',
      desc: 'Starting deno',
      importMap: './importmap.json',
      allow: ['net', 'read', 'write', 'env'],
      unstable: true,
      watch: true
    },
    test_verbose: {
      cmd: 'deno  test',
      desc: 'Performing unit test',
      importMap: './importmap.json',
      allow: ['net', 'read', 'write', 'env'],
      unstable: true,
      watch: true
    },
    test: {
      cmd: 'deno  test --quiet',
      desc: 'Performing unit test',
      importMap: './importmap.json',
      allow: ['net', 'read', 'write', 'env'],
      unstable: true,
      watch: true
    }
  },
  watcher: {
    interval: 0,
    exts: ['ts'],
    skip: ['.git/*', '.vscode/*']
  }
}

export default config
