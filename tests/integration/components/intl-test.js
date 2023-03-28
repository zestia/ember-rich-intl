import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | intl', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.string = `
      Hello, this is a <Button>test string</Button> that can be
      <Link>translated</Link> into multiple languages.
      Inside it there are tokens <Icon />, which are swapped for
      components allowing for dynamic content.
    `;
  });

  test('it works', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Intl @string={{this.string}} as |intl|>
        <intl.Button as |string|>
          <button type="button">{{string}}</button>
        </intl.Button>
        <intl.Link as |string|>
          <a href="https://capsulecrm.com">{{string}}</a>
        </intl.Link>
        <intl.Icon>
          <img src="icon.png" alt="Icon" />
        </intl.Icon>
      </Intl>
    `);

    assert.strictEqual(
      this.element.innerHTML.trim(),
      'Hello, this is a \n' +
        '        \n' +
        '          <button type="button">test string</button>\n' +
        '        \n' +
        '        <!---->\n' +
        '        <!---->\n' +
        '       that can be\n' +
        '      \n' +
        '        <!---->\n' +
        '        \n' +
        '          <a href="https://capsulecrm.com">translated</a>\n' +
        '        \n' +
        '        <!---->\n' +
        '       into multiple languages.\n' +
        '      Inside it there are tokens \n' +
        '        <!---->\n' +
        '        <!---->\n' +
        '        \n' +
        '          <img src="icon.png" alt="Icon">\n' +
        '        \n' +
        '      , which are swapped for\n' +
        '      components allowing for dynamic content.'
    );
  });
});
