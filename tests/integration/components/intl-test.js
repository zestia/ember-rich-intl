import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | intl', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    assert.expect(1);

    this.input =
      'Hello, this is a <Button>test string</Button> that can be ' +
      '<Link>translated</Link> into multiple languages. ' +
      'Inside it there are tokens <Icon /> which are swapped for ' +
      'components allowing for dynamic content.';

    this.output =
      'Hello, this is a <button type="button">test string</button> that can be ' +
      '<a href="https://capsulecrm.com">translated</a> into multiple languages. ' +
      'Inside it there are tokens <img src="icon.png" alt="Icon"> which are swapped for ' +
      'components allowing for dynamic content.';

    await render(hbs`
      <Intl @string={{this.input}} as |intl|>
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
      this.element.innerHTML
        .trim()
        .replace(/<!---->/g, '')
        .replace(/\s+/g, ' '),
      this.output
    );
  });

  test('it handles self closing tags without a space (regression)', async function (assert) {
    assert.expect(1);

    this.input =
      'This is a test <Icon/> with self closing tags that do not have a space between the name and the closing tag.';

    this.output =
      'This is a test <img src="icon.png" alt="Icon"> with self closing tags that do not have a space between the name and the closing tag.';

    await render(hbs`
      <Intl @string={{this.input}} as |intl|>
        <intl.Icon>
          <img src="icon.png" alt="Icon" />
        </intl.Icon>
      </Intl>
    `);

    assert.strictEqual(
      this.element.innerHTML
        .trim()
        .replace(/<!---->/g, '')
        .replace(/\s+/g, ' '),
      this.output
    );
  });
});
