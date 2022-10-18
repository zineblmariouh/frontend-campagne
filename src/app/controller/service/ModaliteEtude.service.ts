import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ModaliteEtudeVo} from '../model/ModaliteEtude.model';


@Injectable({
  providedIn: 'root'
})
export class ModaliteEtudeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/modaliteEtude/';
        })
    }
     private _modaliteEtudes: Array<ModaliteEtudeVo> ;
     private _selectedModaliteEtude: ModaliteEtudeVo;
     private _modaliteEtudeSelections: Array<ModaliteEtudeVo>;
     private _createModaliteEtudeDialog: boolean;
     private _editModaliteEtudeDialog: boolean;
     private _viewModaliteEtudeDialog: boolean;
     public editModaliteEtude$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchModaliteEtude:ModaliteEtudeVo ;

    // methods
    public archiver(modaliteEtude: ModaliteEtudeVo): Observable<ModaliteEtudeVo> {
        return this.http.put<ModaliteEtudeVo>(this.API + 'archiver/' ,modaliteEtude);
    }
    public desarchiver(modaliteEtude: ModaliteEtudeVo): Observable<ModaliteEtudeVo> {
    return this.http.put<ModaliteEtudeVo>(this.API + 'desarchiver/' ,modaliteEtude);
    }

    public findAll(){
     return this.http.get<Array<ModaliteEtudeVo>>(this.API);
    }

    public save(): Observable<ModaliteEtudeVo> {
           return this.http.post<ModaliteEtudeVo>(this.API, {...this.selectedModaliteEtude,dateCreation: moment(this.selectedModaliteEtude.dateCreation).format("YYYY-MM-DD")});
    }

    delete(modaliteEtude: ModaliteEtudeVo) {
         return this.http.delete<number>(this.API + 'id/' + modaliteEtude.id);
    }


    public edit(): Observable<ModaliteEtudeVo> {
        return this.http.put<ModaliteEtudeVo>(this.API, this.selectedModaliteEtude);
    }


     public findByCriteria(modaliteEtude:ModaliteEtudeVo):Observable<Array<ModaliteEtudeVo>>{
           return this.http.post<Array<ModaliteEtudeVo>>(this.API +'search', modaliteEtude);
    }

   public findByIdWithAssociatedList(modaliteEtude:ModaliteEtudeVo):Observable<ModaliteEtudeVo>{
         return this.http.get<ModaliteEtudeVo>(this.API + 'detail/id/' +modaliteEtude.id);
    }

    // getters and setters


    get modaliteEtudes(): Array<ModaliteEtudeVo> {
    if(this._modaliteEtudes==null){
    this._modaliteEtudes=new Array<ModaliteEtudeVo>();
    }
return this._modaliteEtudes;
       }

    set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this._modaliteEtudes = value;
       }

    get selectedModaliteEtude(): ModaliteEtudeVo {
    if(this._selectedModaliteEtude==null){
    this._selectedModaliteEtude=new ModaliteEtudeVo();
    }
           return this._selectedModaliteEtude;
       }

    set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this._selectedModaliteEtude = value;
       }

    get modaliteEtudeSelections(): Array<ModaliteEtudeVo> {
    if(this._modaliteEtudeSelections==null){
    this._modaliteEtudeSelections=new Array<ModaliteEtudeVo>();
    }
        return this._modaliteEtudeSelections;
       }


    set modaliteEtudeSelections(value: Array<ModaliteEtudeVo>) {
        this._modaliteEtudeSelections = value;
       }

    get createModaliteEtudeDialog(): boolean {
        return this._createModaliteEtudeDialog;
       }

    set createModaliteEtudeDialog(value: boolean) {
        this._createModaliteEtudeDialog = value;
       }

    get editModaliteEtudeDialog(): boolean {
        return this._editModaliteEtudeDialog;
       }

    set editModaliteEtudeDialog(value: boolean) {
        this._editModaliteEtudeDialog = value;
       }

    get viewModaliteEtudeDialog(): boolean {
        return this._viewModaliteEtudeDialog;
       }

    set viewModaliteEtudeDialog(value: boolean) {
        this._viewModaliteEtudeDialog = value;
       }

     get searchModaliteEtude(): ModaliteEtudeVo {
     if(this._searchModaliteEtude==null){
    this._searchModaliteEtude=new ModaliteEtudeVo();
    }
        return this._searchModaliteEtude;
    }

    set searchModaliteEtude(value: ModaliteEtudeVo) {
        this._searchModaliteEtude = value;
       }

}
