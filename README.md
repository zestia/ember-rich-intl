# ember-i18n-component

Addon that provides a `<I18n>` component to help with putting more complex content inside of translation strings.


## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above


## Installation

```
ember install ember-i18n-component
```


## Usage

```hbs
<I18n
  @string='Visit our <:link>support documentation</:link> or read our <:online-guide>online guide</:online-guide>.'
  as |Message|
>
  <Message>
    <:link as |string|>
      <a href="https://capsulecrm.com">{{string}}</a>
    </:link>

    <:online-guide as |string|><a href="https://capsulecrm.com/guide">{{string}}</a></:online-guide>
  </Message>
</I18n>
```

or without content:

```hbs
<I18n
  @string='Task for <:party></:party>'
  as |Message|
>
  <Message>
    <:party>
      <span class="tooltipper">
        <a href="party/123">
          Burger King
        </a>
      </span>
    </:party>
  </Message>
</I18n>
```

Expected to be used like:

```hbs
<I18n @string={{t "my-translation-key"}} as |Message|>
</I18n>
```

so we get intellisense.


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
