import { Injectable } from '@angular/core';
import { I18nService } from 'src/app/shared/i18n/i18n.service';
import { KeyValuePair } from '../models/key-value-pair';


@Injectable()
export class EnumTranslatorService {

    constructor(private i18nService: I18nService) {
    }

    getEnumValues(enumType): KeyValuePair[] {
        let result: KeyValuePair[] = [];
        for (let value in enumType) {
            if (typeof enumType[value] === 'number') {
                let translatedName = this.i18nService.getTranslation(value);
                result.push(new KeyValuePair(translatedName, enumType[value]));
            }
        }
        return result;
    }


}
