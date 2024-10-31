import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LecturaService {
  private baseUrl = environment.mylectura;
  private promocionDiario = '/bmg_books/promocion_diaria';
  private bmgbookid = '/bmg_books/book';
  private bmgBooksClassification =
    '/bmg_books/classifications/books/A/language/Español'; // Nueva propiedad
  private filterclasificacionIdioma = '/bmg_books/classifications/books';
  private Searchtituloidioma = '/bmg_books/search_by_language_and_title';

  private PrefixFilterClasificacionIdioma = '/bmg_books/classifications/prefix';

  private sendEmailContactoMayorista = '/bmg_books/send_email';


  private nombreCategoriaSource = new BehaviorSubject<string>(''); // Valor inicial
  currentNombreCategoria = this.nombreCategoriaSource.asObservable();

  constructor(private http: HttpClient) {}

  changeNombreCategoria(nombre: string) {
    this.nombreCategoriaSource.next(nombre);
  }

  getPromocionDiario(
    idioma: string,
    itemsPerPage: number,
    currentPage: number
  ): Observable<any> {
    return this.http.get(
      this.baseUrl +
        this.promocionDiario +
        '?idioma=' +
        idioma +
        '&limit=' +
        itemsPerPage +
        '&offset=' +
        currentPage
    );
  }

  getbmgbookid(idarti: string): Observable<any> {
    return this.http.get(this.baseUrl + this.bmgbookid + '/' + idarti);
  }

  getBooksClassification(): Observable<any> {
    // Nuevo método
    return this.http.get(
      this.baseUrl + this.bmgBooksClassification + '?limit=100&offset=0'
    );
  }
  getfilterclasificacionIdioma(
    idioma: string,
    clasificacion: string
  ): Observable<any> {
    // Nuevo método
    return this.http.get(
      this.baseUrl +
        this.filterclasificacionIdioma +
        '/' +
        clasificacion +
        '/language/' +
        idioma +
        '?limit=100&offset=0'
    );
  }
  getSearchtituloidioma(
    idioma: string,
    titulo: string,
    itemsPerPage: number,
    currentPage: number
  ): Observable<any> {
    // Nuevo método
    return this.http.get(
      this.baseUrl +
        this.Searchtituloidioma +
        '?idioma=' +
        idioma +
        '&titulo=' +
        titulo +
        '&limit=' +
        itemsPerPage +
        '&offset=' +
        currentPage
    );
  }

  getPrefixFilterClasificacionIdioma(
    idioma: string,
    clasificacion: string,
    itemsPerPage: number,
    currentPage: number
  ): Observable<any> {
    // Nuevo método
    return this.http.get(
      this.baseUrl +
        this.PrefixFilterClasificacionIdioma +
        '/' +
        clasificacion +
        '/language/' +
        idioma +
        '?limit=' +
        itemsPerPage +
        '&offset=' +
        currentPage
    );
  }


  postSendEmailContactMayorista(
    emailData:
    { dni_ruc: string;
      name: string;
      email: string;
      message: string }
    ): Observable<any> {
    return this.http.post(
      this.baseUrl +
      this.sendEmailContactoMayorista,
      emailData);
  }
}
