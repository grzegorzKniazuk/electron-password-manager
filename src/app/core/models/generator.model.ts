import {GeneratorSettings} from '../interfaces/generator-settings';
import * as generator from '../../../../node_modules/generate-password';

export class Generator {

  private generatorSettings: GeneratorSettings = JSON.parse(window.localStorage.getItem('generator-settings'));

  protected generateNewPassword(): string {
    return generator.generate({
      length: +this.generatorSettings.length,
      numbers: this.generatorSettings.numbers,
      symbols: this.generatorSettings.symbols,
      uppercase: this.generatorSettings.uppercase,
      excludeSimilarCharacters: this.generatorSettings.excludeSimilarCharacters,
      exclude: this.generatorSettings.exclude,
      strict: this.generatorSettings.strict,
    });
  }
}
