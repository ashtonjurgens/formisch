import type { Path } from '../types/path';

/** An immutable, map-like collection of engine configurations by their paths, for easy access. */
export interface EngineConfig {
  get(path: Path): EnginePathConfig;
  has(path: Path): boolean;
}

/**
 * Engine configuration for a specific path. It provides defaults so that it
 * can be used more easily.
 *
 * @param path The path this configuration applies to. (default: `[]`)
 * @param transform Function to transform input values. (default: `(input) => input`)
 * @param equals Function to compare two values for equality. (default: strict equality `===`)
 */
export class EnginePathConfig {
  path: Path[];
  constructor(config: Partial<EnginePathConfig>) {
    this.path = config.path ?? [];
    if (config.transform) {
      this.transform = config.transform;
    }
    if (config.equals) {
      this.equals = config.equals;
    }
  }
  transform(input: unknown): unknown {
    return input;
  }
  equals(a: unknown, b: unknown): boolean {
    return a === b;
  }
}

/**
 * Creates a new `EngineConfig` from an array of partial `EnginePathConfig` objects.
 *
 * @param config An array of partial `EnginePathConfig` objects.
 *
 * @returns an `EngineConfig` for accessing configurations by path. All path configurations have default values, if not provided.
 *
 * @example
 * ```ts
 * const engineConfig = createEngineConfig([
 *   {
 *      path: ['user', 'birthdate'],
 *      transform: (input) => new Date(input as string),
 *      equals: (a, b) => (a as Date).getTime() === (b as Date).getTime(),
 *   },
 *   // Other path configurations...
 * ]);
 *
 * engineConfig.get(['user', 'birthdate']); // Returns the EnginePathConfig for ['user', 'birthdate']
 * ```
 */
export const createEngineConfig = (
  config: Partial<EnginePathConfig>[] = []
): EngineConfig => {
  const configsByPaths = new Map<string, EnginePathConfig>();
  config.forEach((cfg) =>
    configsByPaths.set(JSON.stringify(cfg.path), new EnginePathConfig(cfg))
  );
  const defaultConfig = new EnginePathConfig({});
  return {
    get(path: Path) {
      return configsByPaths.get(JSON.stringify(path)) ?? defaultConfig;
    },
    has(path: Path) {
      return configsByPaths.has(JSON.stringify(path));
    },
  };
};
