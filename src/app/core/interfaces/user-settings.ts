import {GeneratorSettings} from './generator-settings';

export interface UserSettings extends GeneratorSettings {
  autostart: boolean;
  minimalizeToTray: boolean;
}
