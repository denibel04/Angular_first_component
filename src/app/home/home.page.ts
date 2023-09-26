import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users = [
    {
      nombre : 'Denisa',
      apellidos : 'Belean',
      edad : 18
    },

    {
      nombre : 'Myawchis',
      apellidos: 'owo',
      edad: 94589
    },
    {
      nombre : 'Myawchis',
      apellidos: 'owo',
      edad: 94589
    }

  ]
  constructor() {}

}
