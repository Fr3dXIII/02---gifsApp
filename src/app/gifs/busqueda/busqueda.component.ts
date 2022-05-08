import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs.service';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{
  
  @ViewChild("txtBuscar") txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){}

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;

    //--- Envia el valor y a gifService para que lo guarde ------------------------
    this.gifsService.buscarGifs(valor);

    //Borrar Input Buscar
    this.txtBuscar.nativeElement.value = '';
  }


}
