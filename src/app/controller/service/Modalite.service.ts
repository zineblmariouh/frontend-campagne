import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ModaliteVo} from '../model/Modalite.model';


@Injectable({
  providedIn: 'root'
})
export class ModaliteService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/modalite/';
        })
    }
     private _modalites: Array<ModaliteVo> ;
     private _selectedModalite: ModaliteVo;
     private _modaliteSelections: Array<ModaliteVo>;
     private _createModaliteDialog: boolean;
     private _editModaliteDialog: boolean;
     private _viewModaliteDialog: boolean;
     public editModalite$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchModalite:ModaliteVo ;

    // methods
    public archiver(modalite: ModaliteVo): Observable<ModaliteVo> {
        return this.http.put<ModaliteVo>(this.API + 'archiver/' ,modalite);
    }
    public desarchiver(modalite: ModaliteVo): Observable<ModaliteVo> {
    return this.http.put<ModaliteVo>(this.API + 'desarchiver/' ,modalite);
    }

    public findAll(){
     return this.http.get<Array<ModaliteVo>>(this.API);
    }

    public save(): Observable<ModaliteVo> {
           return this.http.post<ModaliteVo>(this.API, {...this.selectedModalite,dateCreation: moment(this.selectedModalite.dateCreation).format("YYYY-MM-DD")});
    }

    delete(modalite: ModaliteVo) {
         return this.http.delete<number>(this.API + 'id/' + modalite.id);
    }


    public edit(): Observable<ModaliteVo> {
        return this.http.put<ModaliteVo>(this.API, this.selectedModalite);
    }


     public findByCriteria(modalite:ModaliteVo):Observable<Array<ModaliteVo>>{
           return this.http.post<Array<ModaliteVo>>(this.API +'search', modalite);
    }

   public findByIdWithAssociatedList(modalite:ModaliteVo):Observable<ModaliteVo>{
         return this.http.get<ModaliteVo>(this.API + 'detail/id/' +modalite.id);
    }

    // getters and setters


    get modalites(): Array<ModaliteVo> {
    if(this._modalites==null){
    this._modalites=new Array<ModaliteVo>();
    }
return this._modalites;
       }

    set modalites(value: Array<ModaliteVo>) {
        this._modalites = value;
       }

    get selectedModalite(): ModaliteVo {
    if(this._selectedModalite==null){
    this._selectedModalite=new ModaliteVo();
    }
           return this._selectedModalite;
       }

    set selectedModalite(value: ModaliteVo) {
        this._selectedModalite = value;
       }

    get modaliteSelections(): Array<ModaliteVo> {
    if(this._modaliteSelections==null){
    this._modaliteSelections=new Array<ModaliteVo>();
    }
        return this._modaliteSelections;
       }


    set modaliteSelections(value: Array<ModaliteVo>) {
        this._modaliteSelections = value;
       }

    get createModaliteDialog(): boolean {
        return this._createModaliteDialog;
       }

    set createModaliteDialog(value: boolean) {
        this._createModaliteDialog = value;
       }

    get editModaliteDialog(): boolean {
        return this._editModaliteDialog;
       }

    set editModaliteDialog(value: boolean) {
        this._editModaliteDialog = value;
       }

    get viewModaliteDialog(): boolean {
        return this._viewModaliteDialog;
       }

    set viewModaliteDialog(value: boolean) {
        this._viewModaliteDialog = value;
       }

     get searchModalite(): ModaliteVo {
     if(this._searchModalite==null){
    this._searchModalite=new ModaliteVo();
    }
        return this._searchModalite;
    }

    set searchModalite(value: ModaliteVo) {
        this._searchModalite = value;
       }

}
