import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorage } from './token-storage';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
    export class AuthInterceptor implements HttpInterceptor{

        constructor(private token: TokenStorage) {}

        intercept(request: HttpRequest<any>, next: HttpHandler){

            let authRequest = request;
            const token = this.token.getToken();

            if(token != null){
                authRequest = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
            }
            return next.handle(authRequest);
        }
    }

    export const httpInterceptorProvider = [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ];