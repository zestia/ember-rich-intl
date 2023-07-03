# @zestia/ember-rich-intl

This Ember addon works in conjunction with [ember-intl](https://github.com/ember-intl/ember-intl). It swaps [ICU message syntax](https://formatjs.io/docs/core-concepts/icu-syntax/#rich-text-formatting) for components, allowing for dynamic content within translated strings.

**Important note:** We recommend limiting usage of components in translation strings. The majority of the time, its possible to reword the string, or reconsider the design instead.

## Installation

```
ember install @zestia/ember-rich-intl
```

## Demo

https://zestia.github.io/ember-rich-intl

## Example

```hbs
<Intl @string='View <More>more</More>' as |intl|>
  <intl.More as |string|>
    <button type='button {{on "click" this.viewMore}}'>
      {{string}}
    </button>
  </intl.More>
</Intl>
```

## `Intl`

### Arguments

#### `@string`

Required. The text within which to find parts.

### API

When a token is found, and a component is rendered in its place, that component will will yield:

#### `string`

Optional. The matched part
