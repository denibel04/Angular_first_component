import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInfoFavClicked } from '../UserInfoFavClicked';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user?: {
    id: number;
    nombre: string;
    apellidos: string;
    edad: number;
    fav:boolean;
  }

  @Output() onFavClicked: EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();

  constructor() {} 

  ngOnInit() {}

  onFavClick(event:any){
    this.onFavClicked.emit({
      fav:!(this.user?.fav??false) //devolvemos el estado contrario al que tenemos
    });
    event.stopPropagation();
    event.preventDefault();
}

}
