import { Injectable } from '@angular/core';
import { initialize, LDClient, LDFlagChangeset, LDFlagSet, LDFlagValue, LDSingleKindContext } from 'launchdarkly-js-client-sdk';
import { ldConfig } from './environments/environment';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaunchDarklyService {

  private _flagsChange$: BehaviorSubject<LDFlagSet> = new BehaviorSubject<LDFlagSet>({});
  private lddClient:any;

  constructor() {
    this.initLD('Sandy','JhonDoe')
   }

  initLD(fullName: string, userId: string):void {

    const ldUser = {
      kind:'user',
      name: fullName,
      key: userId,
    };
    const clientSideId = ldConfig.clientSideID;

    const ldClient: LDClient = initialize(clientSideId, ldUser);
    this.lddClient = ldClient;

    ldClient.on('ready', () => {  
        this._flagsChange$.next(ldClient.allFlags());
    });

    ldClient.on('change', () => {
       this._flagsChange$.next(ldClient.allFlags());
    });

    ldClient.on('initialized', () => {
      console.log('SDK successfully initialized!');
    });
    ldClient.on('failed', () => {
      console.log('SDK failed to initialize');
    });


  }

  getVariation(ldKey:string) {
    return this.lddClient.variation(ldKey, false);
  }

  flagsChange$() {
    return this._flagsChange$
      .asObservable()
      .pipe(filter((flags: LDFlagSet) => flags !== null))
      .pipe(distinctUntilChanged());
  }

  queryFlag(flagId: string): Observable<LDFlagValue> {
    return this._flagsChange$.pipe(map(flags => { 
      if (flags && flags.hasOwnProperty(flagId)) {
        return this.extractFlagValue(flags[flagId]);
      } else {
        throwError(`${flagId} flag doesn't exist`);
      }
    }));
  }

  extractFlagValue(flag: LDFlagValue | LDFlagChangeset) {
    if (typeof flag === 'object' && flag.hasOwnProperty('current')) {
      return flag.current; // handling LDFlagChangeset
    } else {
      return flag;
    }
  }
}
