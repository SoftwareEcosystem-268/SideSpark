const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const backendDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(backendDir, '..')
const pnpmStoreDir = path.join(repoRoot, 'node_modules', '.pnpm')

function resolveFromBackend(specifier) {
  return require.resolve(specifier, { paths: [backendDir] })
}

function findEngineFile(enginesDir, matcher) {
  return fs.readdirSync(enginesDir).find(matcher)
}

function findEnginesDir() {
  if (!fs.existsSync(pnpmStoreDir)) {
    return null
  }

  const prismaEnginesPackageDir = fs
    .readdirSync(pnpmStoreDir)
    .find((entry) => entry.startsWith('@prisma+engines@'))

  if (!prismaEnginesPackageDir) {
    return null
  }

  const enginesDir = path.join(
    pnpmStoreDir,
    prismaEnginesPackageDir,
    'node_modules',
    '@prisma',
    'engines',
  )

  return fs.existsSync(enginesDir) ? enginesDir : null
}

function applyOfflineEngineOverrides(env) {
  const enginesDir = findEnginesDir()
  if (!enginesDir) {
    return {
      ...env,
      PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING:
        env.PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING || '1',
    }
  }

  const schemaEngine = findEngineFile(enginesDir, (file) => file.startsWith('schema-engine-'))
  const queryEngineLibrary = findEngineFile(
    enginesDir,
    (file) =>
      /^(libquery_engine|query_engine)-.*\.(so\.node|dylib\.node|dll\.node)$/.test(file),
  )

  return {
    ...env,
    PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING:
      env.PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING || '1',
    ...(schemaEngine && !env.PRISMA_SCHEMA_ENGINE_BINARY
      ? { PRISMA_SCHEMA_ENGINE_BINARY: path.join(enginesDir, schemaEngine) }
      : {}),
    ...(queryEngineLibrary && !env.PRISMA_QUERY_ENGINE_LIBRARY
      ? { PRISMA_QUERY_ENGINE_LIBRARY: path.join(enginesDir, queryEngineLibrary) }
      : {}),
  }
}

const prismaCli = resolveFromBackend('prisma/build/index.js')
const result = spawnSync(process.execPath, [prismaCli, 'generate'], {
  cwd: backendDir,
  env: applyOfflineEngineOverrides(process.env),
  stdio: 'inherit',
})

if (result.error) {
  throw result.error
}

process.exit(result.status ?? 1)
