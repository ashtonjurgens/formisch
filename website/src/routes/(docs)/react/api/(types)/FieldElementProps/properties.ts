import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  FieldElementProps: {
    type: {
      type: 'object',
      entries: [
        {
          key: 'name',
          value: 'string',
        },
        {
          key: 'autoFocus',
          value: 'boolean',
        },
        {
          key: 'ref',
          value: {
            type: 'function',
            params: [
              {
                name: 'element',
                type: {
                  type: 'union',
                  options: [
                    {
                      type: 'custom',
                      name: 'FieldElement',
                      href: '/core/api/FieldElement/',
                    },
                    'null',
                  ],
                },
              },
            ],
            return: 'void',
          },
        },
        {
          key: 'onFocus',
          value: {
            type: 'custom',
            name: 'FocusEventHandler',
            generics: [
              {
                type: 'custom',
                name: 'FieldElement',
                href: '/core/api/FieldElement/',
              },
            ],
          },
        },
        {
          key: 'onChange',
          value: {
            type: 'custom',
            name: 'ChangeEventHandler',
            generics: [
              {
                type: 'custom',
                name: 'FieldElement',
                href: '/core/api/FieldElement/',
              },
            ],
          },
        },
        {
          key: 'onBlur',
          value: {
            type: 'custom',
            name: 'FocusEventHandler',
            generics: [
              {
                type: 'custom',
                name: 'FieldElement',
                href: '/core/api/FieldElement/',
              },
            ],
          },
        },
      ],
    },
  },
  name: {
    type: 'string',
  },
  autoFocus: {
    type: 'boolean',
  },
  ref: {
    type: {
      type: 'function',
      params: [
        {
          name: 'element',
          type: {
            type: 'union',
            options: [
              {
                type: 'custom',
                name: 'FieldElement',
                href: '/core/api/FieldElement/',
              },
              'null',
            ],
          },
        },
      ],
      return: 'void',
    },
  },
  onFocus: {
    type: {
      type: 'custom',
      name: 'FocusEventHandler',
      generics: [
        {
          type: 'custom',
          name: 'FieldElement',
          href: '/core/api/FieldElement/',
        },
      ],
    },
  },
  onChange: {
    type: {
      type: 'custom',
      name: 'ChangeEventHandler',
      generics: [
        {
          type: 'custom',
          name: 'FieldElement',
          href: '/core/api/FieldElement/',
        },
      ],
    },
  },
  onBlur: {
    type: {
      type: 'custom',
      name: 'FocusEventHandler',
      generics: [
        {
          type: 'custom',
          name: 'FieldElement',
          href: '/core/api/FieldElement/',
        },
      ],
    },
  },
};
