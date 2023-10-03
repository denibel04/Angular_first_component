import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from "./home/user";

export class UserNotFoundException extends Error {
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$:Observable<User[]> = this._users.asObservable();

  constructor() { }

  public getAll():Observable<User[]> {
    return new Observable(observer => {
      var users:User[] = [
        {id: 1, nombre:"Juan A.", apellidos:"garcía gómez", edad:46, fav:true},
        {id: 2, nombre:"Alejandro", apellidos:"garcía gómez", edad:45, fav:true},
        {id: 3, nombre:"juan", apellidos:"garcía Valencia", edad:4, fav:false},
        {id: 4, nombre:"María del Mar", apellidos:"Valencia Valencia", edad:46, fav:true},
        {id: 5, nombre:"Lydia", apellidos:"garcía Robles", edad:11, fav:false}
      ];
      setTimeout (()=> {
        this._users.next(users);
        observer.next(users);
        observer.complete();  
      }, 1000);
    })
  }

  public getUser(id:number):Observable<User> {
    return new Observable(observer =>{
      setTimeout(() => {
        var user = this._users.value.find(user=>user.id==id);
        if (user) {
          observer.next(user);
        } else {
          observer.error(new UserNotFoundException());
        }
        observer.complete();
      }, 1000)
    })
  }

  public updateUser(user:User):Observable<User> {
    return new Observable(observer => {
      setTimeout(() => {
        var _users = [...this._users.value];
        var index = _users.findIndex(_user=>_user.id==user.id);
        if (index<0) {
          observer.error(new UserNotFoundException());
        } else {
          _users[index]=user;
          observer.next(user);
          this._users.next(_users);
        }
        observer.complete();
      }, 1000);
    })
  }

   public deleteUser(user:User):Observable<User>{
    return new Observable(observer=>{
      setTimeout(() => {
        var _users = [...this._users.value];
        var index = _users.findIndex(u=>u.id==user.id);
        if(index<0)
          observer.error(new UserNotFoundException());
        else{
          _users = [..._users.slice(0,index),..._users.slice(index+1)];
          this._users.next(_users);
          observer.next(user);
        }
        observer.complete();
      }, 500);
      
    });
  }

  public deleteAll():Observable<void>{
    return new Observable(observer=>{
      setTimeout(() => {
        this._users.next([]);
        observer.next();
        observer.complete();  
      }, 1000);
    });
  }
}
