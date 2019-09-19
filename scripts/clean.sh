#!/usr/bin/env bash

clean() {
  rm -rf *.tsbuildinfo
  rm -rf packages/**/*.tsbuildinfo
  rm -rf packages/**/lib

  # following files are created when we mess up with tsconfig and somehow remove outDir
  rm -rf packages/*/src/**/*.js
  rm -rf packages/*/src/**/*.map
  rm -rf packages/*/src/**/*.d.ts
}

clean
