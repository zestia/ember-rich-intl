import Component from '@glimmer/component';
import Part from '@zestia/ember-rich-intl/components/part';

export default class IntlComponent extends Component {
  Part = Part;

  api = (name, Component) => {
    return {
      [name]: Component
    };
  };

  get parts() {
    const regex = /(<[\w:'-]+>.*?<\/[\w:'-]+>|<[\w:'-]+ ?\/>)/g;

    return this.args.string.split(regex).map((part) => {
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
}
