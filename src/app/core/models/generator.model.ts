import {GeneratorSettings} from '../interfaces/generator-settings';
import * as generator from '../../../../node_modules/generate-password';

export abstract class Generator {

  private generatorSettings: GeneratorSettings = JSON.parse(window.localStorage.getItem('generator-settings'));

  protected generateNewPassword(): string {
    if (this.generatorSettings) {
      return generator.generate({
        length: +this.generatorSettings.length,
        numbers: this.generatorSettings.numbers,
        symbols: this.generatorSettings.symbols,
        uppercase: this.generatorSettings.uppercase,
        excludeSimilarCharacters: this.generatorSettings.excludeSimilarCharacters,
        exclude: this.generatorSettings.exclude,
        strict: this.generatorSettings.strict,
      });
    } else {
      return generator.generate({
        length: 10,
        numbers: true,
        symbols: false,
        uppercase: true,
        excludeSimilarCharacters: false,
        exclude: '',
        strict: false,
      });
    }
  }
}
