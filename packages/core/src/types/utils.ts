/**
 * Checks if a type is `any`.
 */
export type IsAny<Type> = 0 extends 1 & Type ? true : false;

/**
 * Checks if a type is `never`.
 */
export type IsNever<Type> = [Type] extends [never] ? true : false;

/**
 * Constructs a type that is maybe a promise.
 */
export type MaybePromise<TValue> = TValue | Promise<TValue>;

/**
 * Makes all properties deeply optional.
 */
export type DeepPartial<TValue> = TValue extends
  | Record<PropertyKey, unknown>
  | readonly unknown[]
  ? { [Key in keyof TValue]?: DeepPartial<TValue[Key]> | undefined }
  : TValue | undefined;

/**
 * Makes all value properties optional.
 *
 * Hint: For dynamic arrays, only plain objects and nested arrays have their
 * values made optional. Primitives and class instances are kept as-is to avoid
 * types like `(string | undefined)[]`.
 */
export type PartialValues<TValue> = TValue extends readonly (infer TItem)[]
  ? number extends TValue['length']
    ? // Hint: `infer TItem` is a naked type parameter that distributes the
      // conditional over each union member individually. `TValue[number]`
      // would not distribute, causing unions like `string | { id: number }`
      // to fail the object and array check as a whole and skip recursion
      // entirely, leaving object members like `{ id: number }` unchanged.
      (TItem extends Record<PropertyKey, unknown> | readonly unknown[]
        ? { [Key in keyof TItem]: PartialValues<TItem[Key]> }
        : TItem)[]
    : // For tuples, recurse into each position making values optional
      { [Key in keyof TValue]: PartialValues<TValue[Key]> }
  : // For objects, recurse into each property making values optional
    TValue extends Record<PropertyKey, unknown>
    ? { [Key in keyof TValue]: PartialValues<TValue[Key]> }
    : // For primitives, make the value itself optional
      TValue | undefined;
