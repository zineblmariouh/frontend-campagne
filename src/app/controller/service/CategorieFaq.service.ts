import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CategorieFaqVo} from '../model/CategorieFaq.model';


@Injectable({
  providedIn: 'root'
})
export class CategorieFaqService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/categorieFaq/';
        })
    }
     private _categorieFaqs: Array<CategorieFaqVo> ;
     private _selectedCategorieFaq: CategorieFaqVo;
     private _categorieFaqSelections: Array<CategorieFaqVo>;
     private _createCategorieFaqDialog: boolean;
     private _editCategorieFaqDialog: boolean;
     private _viewCategorieFaqDialog: boolean;
     public editCategorieFaq$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCategorieFaq:CategorieFaqVo ;

    // methods
    public archiver(categorieFaq: CategorieFaqVo): Observable<CategorieFaqVo> {
        return this.http.put<CategorieFaqVo>(this.API + 'archiver/' ,categorieFaq);
    }
    public desarchiver(categorieFaq: CategorieFaqVo): Observable<CategorieFaqVo> {
    return this.http.put<CategorieFaqVo>(this.API + 'desarchiver/' ,categorieFaq);
    }

    public findAll(){
     return this.http.get<Array<CategorieFaqVo>>(this.API);
    }

    public save(): Observable<CategorieFaqVo> {
           return this.http.post<CategorieFaqVo>(this.API, {...this.selectedCategorieFaq,dateCreation: moment(this.selectedCategorieFaq.dateCreation).format("YYYY-MM-DD")});
    }

    delete(categorieFaq: CategorieFaqVo) {
         return this.http.delete<number>(this.API + 'id/' + categorieFaq.id);
    }


    public edit(): Observable<CategorieFaqVo> {
        return this.http.put<CategorieFaqVo>(this.API, this.selectedCategorieFaq);
    }


     public findByCriteria(categorieFaq:CategorieFaqVo):Observable<Array<CategorieFaqVo>>{
           return this.http.post<Array<CategorieFaqVo>>(this.API +'search', categorieFaq);
    }

   public findByIdWithAssociatedList(categorieFaq:CategorieFaqVo):Observable<CategorieFaqVo>{
         return this.http.get<CategorieFaqVo>(this.API + 'detail/id/' +categorieFaq.id);
    }

    // getters and setters


    get categorieFaqs(): Array<CategorieFaqVo> {
    if(this._categorieFaqs==null){
    this._categorieFaqs=new Array<CategorieFaqVo>();
    }
return this._categorieFaqs;
       }

    set categorieFaqs(value: Array<CategorieFaqVo>) {
        this._categorieFaqs = value;
       }

    get selectedCategorieFaq(): CategorieFaqVo {
    if(this._selectedCategorieFaq==null){
    this._selectedCategorieFaq=new CategorieFaqVo();
    }
           return this._selectedCategorieFaq;
       }

    set selectedCategorieFaq(value: CategorieFaqVo) {
        this._selectedCategorieFaq = value;
       }

    get categorieFaqSelections(): Array<CategorieFaqVo> {
    if(this._categorieFaqSelections==null){
    this._categorieFaqSelections=new Array<CategorieFaqVo>();
    }
        return this._categorieFaqSelections;
       }


    set categorieFaqSelections(value: Array<CategorieFaqVo>) {
        this._categorieFaqSelections = value;
       }

    get createCategorieFaqDialog(): boolean {
        return this._createCategorieFaqDialog;
       }

    set createCategorieFaqDialog(value: boolean) {
        this._createCategorieFaqDialog = value;
       }

    get editCategorieFaqDialog(): boolean {
        return this._editCategorieFaqDialog;
       }

    set editCategorieFaqDialog(value: boolean) {
        this._editCategorieFaqDialog = value;
       }

    get viewCategorieFaqDialog(): boolean {
        return this._viewCategorieFaqDialog;
       }

    set viewCategorieFaqDialog(value: boolean) {
        this._viewCategorieFaqDialog = value;
       }

     get searchCategorieFaq(): CategorieFaqVo {
     if(this._searchCategorieFaq==null){
    this._searchCategorieFaq=new CategorieFaqVo();
    }
        return this._searchCategorieFaq;
    }

    set searchCategorieFaq(value: CategorieFaqVo) {
        this._searchCategorieFaq = value;
       }

}
