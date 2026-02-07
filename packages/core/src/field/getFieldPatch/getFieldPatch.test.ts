import * as v from 'valibot';
import { describe, expect, test } from 'vitest';
import type {
  InternalArrayStore,
  InternalObjectStore,
} from '../../types/field.ts';
import { createTestStore } from '../../vitest/index.ts';
import { getFieldPatch } from './getFieldPatch.ts';

describe('getFieldPatch', () => {
  describe('value fields', () => {
    test('should return string value when dirty', () => {
      const store = createTestStore(v.object({ name: v.string() }), {
        initialInput: { name: 'John' },
      });
      store.children.name.isDirty.value = true;
      expect(getFieldPatch(store.children.name)).toBe('John');
    });

    test('should not return string value when clean', () => {
      const store = createTestStore(v.object({ name: v.string() }), {
        initialInput: { name: 'John' },
      });
      expect(getFieldPatch(store.children.name)).toBeUndefined();
    });

    test('should return number value when dirty', () => {
      const store = createTestStore(v.object({ age: v.number() }), {
        initialInput: { age: 25 },
      });
      store.children.age.isDirty.value = true;
      expect(getFieldPatch(store.children.age)).toBe(25);
    });

    test('should not return number value when clean', () => {
      const store = createTestStore(v.object({ age: v.number() }), {
        initialInput: { age: 25 },
      });
      expect(getFieldPatch(store.children.age)).toBeUndefined();
    });
  });

  describe('id and revision fields', () => {
    test('should include revision field when parent dirty', () => {
      const store = createTestStore(
        v.object({ revision: v.number(), name: v.string() }),
        {
          initialInput: { revision: 1, name: 'John' },
        }
      );
      store.isDirty.value = true;
      expect(getFieldPatch(store)).toStrictEqual({ revision: 1 });
    });

    test('should not include revision field when parent clean', () => {
      const store = createTestStore(
        v.object({ revision: v.number(), name: v.string() }),
        {
          initialInput: { revision: 1, name: 'John' },
        }
      );
      expect(getFieldPatch(store)).toBeUndefined();
    });

    test('should include id field when parent dirty', () => {
      const store = createTestStore(
        v.object({ id: v.string(), name: v.string() }),
        {
          initialInput: { id: '123', name: 'John' },
        }
      );
      store.isDirty.value = true;
      expect(getFieldPatch(store)).toStrictEqual({ id: '123' });
    });

    test('should not include id field when parent clean', () => {
      const store = createTestStore(
        v.object({ id: v.string(), name: v.string() }),
        {
          initialInput: { id: '123', name: 'John' },
        }
      );
      expect(getFieldPatch(store)).toBeUndefined();
    });
  });

  describe('object fields', () => {
    test('should collect input from all dirty children', () => {
      const store = createTestStore(
        v.object({ id: v.string(), name: v.string(), age: v.number() }),
        { initialInput: { id: '123', name: 'John', age: 25 } }
      );
      store.isDirty.value = true;
      store.children.name.isDirty.value = true;
      expect(getFieldPatch(store)).toStrictEqual({ id: '123', name: 'John' });
    });

    test('should return null for nullish object input when dirty', () => {
      const store = createTestStore(
        v.object({ user: v.nullish(v.object({ name: v.string() })) }),
        { initialInput: { user: null } }
      );
      store.isDirty.value = true;
      store.children.user.isDirty.value = true;
      expect(getFieldPatch(store.children.user)).toBeNull();
    });

    test('should return undefined for undefined object input when dirty', () => {
      const store = createTestStore(
        v.object({ user: v.nullish(v.object({ name: v.string() })) }),
        { initialInput: { user: undefined } }
      );
      store.isDirty.value = true;
      store.children.user.isDirty.value = true;
      expect(getFieldPatch(store.children.user)).toBeUndefined();
    });
  });

  describe('array fields', () => {
    test('should collect input from dirty all items', () => {
      const store = createTestStore(v.object({ items: v.array(v.string()) }), {
        initialInput: { items: ['a', 'b', 'c'] },
      });
      store.isDirty.value = true;
      store.children.items.isDirty.value = true;
      (store.children.items as InternalArrayStore).children[0].isDirty.value =
        true;
      (store.children.items as InternalArrayStore).children[2].isDirty.value =
        true;
      expect(getFieldPatch(store.children.items)).toStrictEqual(['a', 'c']);
    });

    test('should return empty array for empty array input when dirty', () => {
      const store = createTestStore(v.object({ items: v.array(v.string()) }), {
        initialInput: { items: [] },
      });
      store.isDirty.value = true;
      store.children.items.isDirty.value = true;
      expect(getFieldPatch(store.children.items)).toStrictEqual([]);
    });

    test('should return null for nullish array input when dirty', () => {
      const store = createTestStore(
        v.object({ items: v.nullish(v.array(v.string())) }),
        { initialInput: { items: null } }
      );
      store.isDirty.value = true;
      store.children.items.isDirty.value = true;
      expect(getFieldPatch(store.children.items)).toBeNull();
    });
  });

  describe('nested structures', () => {
    test('should collect deeply nested dirty input', () => {
      const store = createTestStore(
        v.object({
          id: v.string(),
          revision: v.number(),
          users: v.array(
            v.object({ id: v.string(), name: v.string(), age: v.number() })
          ),
        }),
        {
          initialInput: {
            id: '123',
            revision: 1,
            users: [
              { id: '456', name: 'John', age: 25 },
              { id: '789', name: 'Jane', age: 30 },
            ],
          },
        }
      );
      store.isDirty.value = true;
      store.children.users.isDirty.value = true;
      const jane = (store.children.users as InternalArrayStore)
        .children[1] as InternalObjectStore;
      jane.isDirty.value = true;
      jane.children.name.isDirty.value = true;
      expect(getFieldPatch(store)).toStrictEqual({
        id: '123',
        revision: 1,
        users: [{ id: '789', name: 'Jane' }],
      });
    });
  });
});
