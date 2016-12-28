/**
 * Created by alexandrosfilios on 28/12/16.
 */
import { Injectable } from '@angular/core';


@Injectable()
export class LoggerService {
    constructor() {}
    
    info(...params): void {
        console.info(params);
    }
    error(...params): void {
        console.error(params);
    }
}