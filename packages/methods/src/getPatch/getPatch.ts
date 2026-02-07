import {
  type BaseFormStore,
  getFieldPatch,
  getFieldStore,
  INTERNAL,
  type PartialValues,
  type PathValue,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/core';
import type * as v from 'valibot';

/**
 * Get form patch config interface.
 */
export interface GetFormPatchConfig {
  /**
   * The path to a field. Leave undefined to get the entire form patch.
   */
  readonly path?: undefined;
}

/**
 * Get field patch config interface.
 */
export interface GetFieldPatchConfig<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
> {
  /**
   * The path to the field to retrieve patch from.
   */
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
}

/**
 * Retrieves the current patch of a specific field or the entire form.
 * Returns a partial object as not all fields may have been edited.
 *
 * @param form The form store to retrieve patch from.
 *
 * @returns The 'patch' of the form or the specified field.
 */
export function getPatch<TSchema extends Schema>(
  form: BaseFormStore<TSchema>
): PartialValues<v.InferInput<TSchema>>;

/**
 * Retrieves the current patch of a specific field or the entire form.
 * Returns a partial object as not all fields may have been edited.
 *
 * @param form The form store to retrieve patch from.
 * @param config The get patch configuration.
 *
 * @returns The 'patch' of the form or the specified field.
 */
export function getPatch<
  TSchema extends Schema,
  TFieldPath extends RequiredPath | undefined = undefined,
>(
  form: BaseFormStore<TSchema>,
  config: TFieldPath extends RequiredPath
    ? GetFieldPatchConfig<TSchema, TFieldPath>
    : GetFormPatchConfig
): PartialValues<
  TFieldPath extends RequiredPath
    ? PathValue<v.InferInput<TSchema>, TFieldPath>
    : v.InferInput<TSchema>
>;

// @__NO_SIDE_EFFECTS__
export function getPatch(
  form: BaseFormStore,
  config?: GetFormPatchConfig | GetFieldPatchConfig<Schema, RequiredPath>
): unknown {
  return getFieldPatch(
    config?.path ? getFieldStore(form[INTERNAL], config.path) : form[INTERNAL]
  );
}
