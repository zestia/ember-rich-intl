import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const Part = setComponentTemplate(precompileTemplate("{{yield @string}}", {
  strictMode: true
}), templateOnly());
const api = (name, Component) => {
  return {
    [name]: Component
  };
};
class IntlComponent extends Component {
  get parts() {
    const regex = /(<[\w:'-]+>.*?<\/[\w:'-]+>|<[\w:'-]+ ?\/>)/g;
    return this.args.string.split(regex).map(part => {
      const matches = part.match(regex);
      if (matches !== null) {
        const name = part.match(/<([\w:'-]+)\s?\/?>/)[1];
        let string = '';
        const matches = part.match(/<[\w:'-]+>(.*?)<\/[\w:'-]+>/);
        if (matches !== null) {
          string = matches[1];
        }
        return {
          string,
          name
        };
      }
      return part;
    });
  }
  static {
    setComponentTemplate(precompileTemplate("{{~#each this.parts as |part|~}}\n  {{~#if part.name~}}\n    {{~yield (api part.name (component Part string=part.string))~}}\n  {{~else~}}\n    {{~part~}}\n  {{~/if~}}\n{{~/each~}}", {
      strictMode: true,
      scope: () => ({
        api,
        Part
      })
    }), this);
  }
}

export { IntlComponent as default };
//# sourceMappingURL=intl.js.map
