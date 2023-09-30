import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user'
import { UserInfoFavClicked } from './UserInfoFavClicked';
import { ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$:Observable<User[]> = this._users.asObservable();

  constructor(
    private router:Router,
    private toast:ToastController
  ) {}

  ngOnInit(): void {
  
    var users:User[] = [
      {id: 1, nombre:"Juan A.", apellidos:"garcía gómez", edad:46, fav:true},
      {id: 2, nombre:"Alejandro", apellidos:"garcía gómez", edad:45, fav:true},
      {id: 3, nombre:"juan", apellidos:"garcía Valencia", edad:4, fav:false},
      {id: 4, nombre:"María del Mar", apellidos:"Valencia Valencia", edad:46, fav:true},
      {id: 5, nombre:"Lydia", apellidos:"garcía Robles", edad:11, fav:false}
    ];
    this._users.next(users);
  }

  public onFavClicked(user:User, event:UserInfoFavClicked){
    //recibimos en user el usuario asociado a la tarjeta
    //recibimos en event un objeto del tipo UserInfoFavClicked que tiene una propiedad fav que indica si hay que añadir o eliminar de la lista de favoritos
    //creamos una copia del array actual de usuarios
    const users = [...this._users.value];
    //buscamos el índice del usuario para modificar su propiedad fav
    var index = users.findIndex((_user)=>_user.id == user.id);
    if(index!==-1)
      //actualizamos la propiedad fav con el valor que hemos recibido por el evento
      users[index].fav = event.fav??false; //en el caso de que fav sea undefined devolvemos falso.
    //notificamos un nuevo array de usuarios para que se renderice en la plantilla
    this._users.next([...users]);
    //Notificamos con un Toast que se ha pulsado
    const options:ToastOptions = {
      message:`User ${event.fav?'added':'removed'} ${event.fav?'to':'from'} favourites`, //mensaje del toast
      duration:1000, // 1 segundo
      position:'bottom', // el toast se situa en la parte inferior
      color:'danger', // color del toast
      cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
    };
    //creamos el toast y lo presentamos (es una promesa por eso el then)
    this.toast.create(options).then(toast=>toast.present());
  }
}
