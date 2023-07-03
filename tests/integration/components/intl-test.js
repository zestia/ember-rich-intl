import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | intl', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    this.assertHTML = () => {
      assert.strictEqual(
        this.element.innerHTML
          .trim()
          .replace(/<!---->/g, '')
          .replace(/\s+/g, ' '),
        this.output
      );
    };
  });

  test('block syntax', async function (assert) {
    assert.expect(1);

    this.input = 'Get <Link>support</Link>';
    this.output = 'Get <a href="https://capsulecrm.com/support">support</a>';

    await render(hbs`
      <Intl @string={{this.input}} as |intl|>
        <intl.Link as |string|>
          <a href="https://capsulecrm.com/support">{{string}}</a>
        </intl.Link>
      </Intl>
    `);

    this.assertHTML();
  });

  test('self closing syntax', async function (assert) {
    assert.expect(1);

    this.input = 'Hello <World />';
    this.output = 'Hello 🌎';

    await render(hbs`
      <Intl @string={{this.input}} as |intl|>
        <intl.World>🌎</intl.World>
      </Intl>
    `);

    this.assertHTML();
  });

  skip('nested block syntax not supported', async function (assert) {
    assert.expect(1);

    this.input = 'Visit <Link>the <Blink>destination</Blink></Link>';
    this.output = 'Visit destination';

    await render(hbs`
      <Intl @string={{this.input}} as |intl|>
        <intl.Link as |string|>
          {{string}}
        </intl.Link>
      </Intl>
    `);

    this.assertHTML();
  });

  test('nested self closing syntax not supported', async function (assert) {
    assert.expect(1);

    this.input = 'Visit <Link><Image /> destination</Link>';
    this.output = 'Visit &lt;Image /&gt; destination';

    await render(hbs`
      <Intl @string={{this.input}} as |intl|>
        <intl.Link as |string|>
          {{string}}
        </intl.Link>
      </Intl>
    `);

    this.assertHTML();
  });

  test('missing components', async function (assert) {
    assert.expect(1);

    this.input = 'Hello <World />';
    this.output = 'Hello ';

    await render(hbs`<Intl @string={{this.input}} />`);

    this.assertHTML();
  });
});
