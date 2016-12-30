/**
 * Created by alexandrosfilios on 30/12/16.
 */
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Takes a term and a dictionary and creates the link to that term.
 * Usage:
 *  {{'example term' | dictionaryLink : 'WORD_REFERENCE'}}
 */

@Pipe({ name: 'dictionaryLink' })
export class DictionaryLinkPipe implements PipeTransform {
    transform(term: string, dictionary: string): string {
        switch(dictionary) {
            case 'WORD_REFERENCE':
                return this.createLink('http://www.wordreference.com/fren/', term);
            case 'THE_FREE_DICTIONARY':
                return this.createLink('http://fr.thefreedictionary.com/', term);
        }
        return '';
    }
    private createLink(baseLink: string, term: string): string {
        return baseLink + term.split(' ').join('+');
    }
}