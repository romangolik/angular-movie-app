import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class HttpDataParserService {
  parseParams(data: Params = {}): HttpParams {
    let params = new HttpParams();
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[ key ]) && data[ key ].length) {
        for (const item of data[ key ]) {
          params = params.append(key, String(item));
        }
      } else if (data[ key ] && !Array.isArray(data[ key ])) {
        params = params.append(key, String(data[ key ]));
      }
    });
    return params;
  }

  parseObjectToFormData(data: Record<string, unknown>): FormData {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (String(data[ key ]) !== '' && data[ key ]) {
        formData.set(key, String(data[ key ]));
      }
    });
    return formData;
  }
}
