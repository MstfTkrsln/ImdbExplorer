import { Injectable, EventEmitter } from '@angular/core';
import { I18nService } from 'src/app/shared/i18n/i18n.service';
import { KeyValuePair } from '../models/key-value-pair';


@Injectable()
export class EnumTranslatorService {
    onReady: EventEmitter<number> = new EventEmitter();

    constructor(private i18nService: I18nService) {
        this.i18nService.subscribe(() => {
            this.onReady.emit();
        },
            err => console.log(err));
    }

    getEnumValues(enumType, sortByName: boolean = false): KeyValuePair[] {
        let result: KeyValuePair[] = [];
        for (let value in enumType) {
            if (value.startsWith('_'))
                continue;

            if (typeof enumType[value] === 'number') {
                let translatedName = this.i18nService.getTranslation(value);
                result.push(new KeyValuePair(translatedName, enumType[value]));
            }
        }
        if (sortByName)
            result.sort((a, b) => a.Value.localeCompare(b.Value));
            //result.sort((a, b) => (a.Value > b.Value) ? 1 : ((b.Value > a.Value) ? -1 : 0));
        return result;
    }

}
