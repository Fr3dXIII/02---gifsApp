import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string  = '5eGAjlOFtj2HgebcirfRZgg75qYT7xHe';  
  private serviceURL  : string  = 'https://api.giphy.com/v1/gifs';

  private _historial:string[] = [];

  public resultados:Gif [] = [];
  public ultimaQuery : string = '';

  constructor(private http : HttpClient) {
    
    //-- Retorna el local store, si no encuantra nada, coloca un array vacio.
    /*
    if(localStorage.getItem('historial')){
      this._historial =JSON.parse( localStorage.getItem('historial')! );
    }
    */
    this._historial = JSON.parse( localStorage.getItem('historial')!) || [] ;

    this.ultimaQuery = localStorage.getItem('ultimoResultado') || '' ;
    this.buscarGifs(this.ultimaQuery);
    
  }

  get historial() {
    //if (this._historial.values === ''){ return; }    
    return [...this._historial];
  }

  buscarGifs(query:string){

    query = query.trim().toLowerCase();

    //--- Si la query no esta en el array lo incluyo para no duplicar -------
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
    }

    //--- Controlamos que solo guarde 10 items ------------------------
    this._historial = this._historial.splice(0,10);
    console.log(this._historial);


    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit','10')
        .set('q', query);

    
    this.http.get<SearchGIFResponse>(`${ this.serviceURL }/search`,{ params })
        .subscribe( ( resp ) => {
          console.log( resp.data );
          this.resultados = resp.data;

          //--- Guarda un JSON en el local store del navegador ------------------------
          localStorage.setItem('historial', JSON.stringify(this._historial));


          //--- Guardar ultimo resultado ---------------------------------------------
          localStorage.setItem('ultimoResultado', query);

        })    

  }//END BUSCARgIFS

}//end class
