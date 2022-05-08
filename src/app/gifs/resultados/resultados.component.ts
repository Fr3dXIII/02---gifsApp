import { Component, OnInit } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent  {

  get ListarResultados(){
    return this.gifService.resultados;
  }

  constructor(private gifService:GifsService) { }

  
}