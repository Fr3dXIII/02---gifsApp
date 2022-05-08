import { Component } from '@angular/core';
import { GifsService } from '../../gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
  
})
export class SidebarComponent  {

  get listaHistorial(){
    return this.gifService.historial;
  }

  constructor(private gifService : GifsService) { }


  buscar(item:string){
    console.log(item);
    this.gifService.buscarGifs(item);    
  }

}
