import { module, test, assert } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, getRootElement } from '@ember/test-helpers';
import Intl from '@zestia/ember-rich-intl/components/intl';

module('Integration | Component | intl', function (hooks) {
  setupRenderingTest(hooks);

  let input;
  let output;

  const assertHTML = () => {
    assert.strictEqual(
      getRootElement()
        .innerHTML.trim()
        .replace(/<!---->/g, '')
        .replace(/\s+/g, ' '),
      output
    );
  };

  test('block syntax', async function (assert) {
    assert.expect(1);

    input = 'Get <Link>support</Link>';
    output = 'Get <a href="https://capsulecrm.com/support">support</a>';

    await render(<template>
      <Intl @string={{input}} as |intl|>
        <intl.Link as |string|>
          <a href="https://capsulecrm.com/support">{{string}}</a>
        </intl.Link>
      </Intl>
    </template>);

    assertHTML();
  });

  test('self closing syntax', async function (assert) {
    assert.expect(1);

    input = 'Hello <World />';
    output = 'Hello 🌎';

    await render(<template>
      <Intl @string={{input}} as |intl|>
        <intl.World>🌎</intl.World>
      </Intl>
    </template>);

    assertHTML();
  });

  test('missing components', async function (assert) {
    assert.expect(1);

    input = 'Hello <World />';
    output = 'Hello ';

    await render(<template><Intl @string={{input}} /></template>);

    assertHTML();
  });

  module('not supported', function () {
    test('nested block syntax', async function (assert) {
      assert.expect(1);

      input = 'Visit <Link>the <Blink>destination</Blink></Link>';
      output =
        'Visit <a href="#">the &lt;Blink&gt;destination</a> &lt;/Link&gt;';

      await render(<template>
        <Intl @string={{input}} as |intl|>
          <intl.Link as |string|>
            <a href="#">{{string}}</a>
          </intl.Link>
        </Intl>
      </template>);

      assertHTML();
    });

    test('nested self closing syntax', async function (assert) {
      assert.expect(1);

      input = 'Visit <Link><Image /> destination</Link>';
      output = 'Visit <a href="#">&lt;Image /&gt; destination</a>';

      await render(<template>
        <Intl @string={{input}} as |intl|>
          <intl.Link as |string|>
            <a href="#">{{string}}</a>
          </intl.Link>
        </Intl>
      </template>);

      assertHTML();
    });

    test('mixed with HTML', async function (assert) {
      assert.expect(1);

      input = '<Image /> <em>really</em> interesting';
      output = '<img> interesting';

      await render(<template>
        {{! template-lint-disable require-valid-alt-text }}
        <Intl @string={{input}} as |intl|>
          <intl.Image>
            <img />
          </intl.Image>
        </Intl>
      </template>);

      assertHTML();
    });
  });
});
