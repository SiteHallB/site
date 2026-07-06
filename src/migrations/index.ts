import * as migration_20260706_205915_initial from './20260706_205915_initial';

export const migrations = [
  {
    up: migration_20260706_205915_initial.up,
    down: migration_20260706_205915_initial.down,
    name: '20260706_205915_initial'
  },
];
