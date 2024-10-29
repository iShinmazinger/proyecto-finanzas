import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) {}

    signInUser(credentials: any): Observable<any> {
        return this.http.get<any[]>(this.apiUrl, {
            params: {
                email: credentials.email,
                contrasena: credentials.contrasena
            }
        }).pipe(
            map(users => users.length > 0 ? users[0] : null)
        );
    }
}