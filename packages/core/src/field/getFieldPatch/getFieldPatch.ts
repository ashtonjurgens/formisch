import type { InternalFieldStore } from '../../types/index.ts';

/**
 * Returns the current patch of the field store. For arrays and objects,
 * recursively collects input from all children. Returns `null` or `undefined`
 * for nullish array/object inputs, or the primitive value for value fields.
 *
 * @param internalFieldStore The field store to get 'patch' from.
 *
 * @returns The field patch.
 */
// @__NO_SIDE_EFFECTS__
export function getFieldPatch(internalFieldStore: InternalFieldStore): unknown {
  // If the field store is not dirty, there is nothing to return
  if (!internalFieldStore.isDirty.value) return;

  // If field store is array, collect patch from children
  if (internalFieldStore.kind === 'array') {
    // If array input is not nullish, build array from children
    if (internalFieldStore.input.value) {
      // Create output array
      const value = [];

      // Collect input from each array item
      for (
        let index = 0;
        index < internalFieldStore.items.value.length;
        index++
      ) {
        const child = internalFieldStore.children[index];
        if (child.isDirty.value) {
          value.push(getFieldPatch(child));
        }
      }
      return value;
    }

    // Otherwise, return nullish input as-is
    return internalFieldStore.input.value;
  }

  // If field store is object, collect patch from children
  if (internalFieldStore.kind === 'object') {
    // If object input is not nullish, build object from children
    if (internalFieldStore.input.value) {
      // Create output object
      const value: Record<string, unknown> = {};

      // Collect input from each object property
      for (const key in internalFieldStore.children) {
        const child = internalFieldStore.children[key];

        // @haberdasher-app notice:
        //
        // Our patch must include:
        //
        // - dirty fields,
        // - id fields (for dirty entities),
        // - and the revision number (if anything is dirty).
        //
        // We have rules about how fields called "revision" and "id" can be
        // used, so the following code is safe.
        //
        // Hint: We know at this point the parent object is dirty (we checked
        // that in the first line). So both id and revision number must always
        // be included.
        if (child.isDirty.value) {
          value[key] = getFieldPatch(child);
        } else if (key === 'id' || key === 'revision') {
          // Hint: The value is not dirty, so using getFieldPatch won't work.
          // We need to assign the value directly.
          value[key] = child.input.value;
        }
      }
      return value;
    }

    // Otherwise, return nullish input as-is
    return internalFieldStore.input.value;
  }

  // Return primitive value input
  return internalFieldStore.input.value;
}
