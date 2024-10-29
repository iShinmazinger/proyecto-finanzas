import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserViewService {
    private apiUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) {}

    registerUser(user: any): Observable<any> {
        return this.http.post(this.apiUrl, user);
    }

    setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    updateUser(user: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${user.id}`, user);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}