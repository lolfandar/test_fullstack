import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {Project} from '../model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:8080/application';
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<User> {
    const url = this.baseUrl + '/login';
    return this.http.post<User>(url, { username, password }, this.httpOptions);
  }

  register(username: string, password: string, email: string): Observable<User> {
    const url = this.baseUrl + '/register';
    return this.http.post<User>(url, { username, password, email }, this.httpOptions);
  }

  /**
   * TODO Implémenter les requêtes pour la sauvegarde et le chargement des projets
   * -> Il faut s'inspirer des fonctions ci-dessus
   */
  saveProject(name: string, amount: number, description: string, ownerUsername: string): Observable<Project> {
     const url = this.baseUrl + '/saveProject';
     return this.http.post<Project>(url, { name, amount, description, ownerUsername }, this.httpOptions);
   }
  getProjects(ownerUsername: string): Observable<Array<Project>> {
    const url = this.baseUrl  + '/getProjects?ownerUsername=' + ownerUsername;
    return this.http.get<Array<Project>>(url, this.httpOptions);
  }

}
