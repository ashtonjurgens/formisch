import * as v from 'valibot';
import { describe, expect, test } from 'vitest';
import { createTestStore } from '../vitest/index.ts';
import { getPatch } from './getPatch.ts';

describe('getPatch', () => {
  test('should return full form patch when no path provided', () => {
    const store = createTestStore(
      v.object({
        id: v.string(),
        revision: v.number(),
        name: v.string(),
        age: v.number(),
        birthday: v.date(),
      }),
      {
        initialInput: {
          id: '123',
          revision: 1,
          name: 'John',
          age: 30,
          birthday: new Date(),
        },
      }
    );

    store.isDirty.value = true;
    store.children.name.isDirty.value = true;
    store.children.age.isDirty.value = true;

    const result = getPatch(store);

    expect(result).toEqual({
      id: '123',
      revision: 1,
      name: 'John',
      age: 30,
    });
  });

  test('should return field patch', () => {
    const store = createTestStore(v.object({ name: v.string() }), {
      initialInput: { name: 'John' },
    });

    store.isDirty.value = true;
    store.children.name.isDirty.value = true;

    const result = getPatch(store, { path: ['name'] });

    expect(result).toBe('John');
  });

  test('should return nested field patch', () => {
    const store = createTestStore(
      v.object({ user: v.object({ email: v.string() }) }),
      { initialInput: { user: { email: 'test@example.com' } } }
    );

    store.isDirty.value = true;
    store.children.user.isDirty.value = true;
    // @ts-expect-error
    store.children.user.children.email.isDirty.value = true;

    const result = getPatch(store, { path: ['user', 'email'] });

    expect(result).toBe('test@example.com');
  });

  test('should return array item patch', () => {
    const store = createTestStore(v.object({ items: v.array(v.string()) }), {
      initialInput: { items: ['a', 'b', 'c'] },
    });

    store.isDirty.value = true;
    store.children.items.isDirty.value = true;
    // @ts-expect-error
    store.children.items.children[1].isDirty.value = true;

    const result = getPatch(store, { path: ['items', 1] });

    expect(result).toBe('b');
  });

  test('should return full array patch', () => {
    const store = createTestStore(v.object({ items: v.array(v.string()) }), {
      initialInput: { items: ['a', 'b', 'c'] },
    });

    store.isDirty.value = true;
    store.children.items.isDirty.value = true;
    // @ts-expect-error
    store.children.items.children[0].isDirty.value = true;
    // @ts-expect-error
    store.children.items.children[2].isDirty.value = true;

    const result = getPatch(store, { path: ['items'] });

    expect(result).toEqual(['a', 'c']);
  });

  test('should return nested object within array', () => {
    const store = createTestStore(
      v.object({ users: v.array(v.object({ name: v.string() })) }),
      { initialInput: { users: [{ name: 'John' }, { name: 'Jane' }] } }
    );

    store.isDirty.value = true;
    store.children.users.isDirty.value = true;
    // @ts-expect-error
    store.children.users.children[0].isDirty.value = true;
    // @ts-expect-error
    store.children.users.children[0].children.name.isDirty.value = true;

    const result = getPatch(store, { path: ['users', 0, 'name'] });

    expect(result).toBe('John');
  });

  test('should return undefined for uninitialized field', () => {
    const store = createTestStore(v.object({ name: v.optional(v.string()) }));

    store.isDirty.value = true;
    store.children.name.isDirty.value = true;

    const result = getPatch(store, { path: ['name'] });

    expect(result).toBeUndefined();
  });
});
