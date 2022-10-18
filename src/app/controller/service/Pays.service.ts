import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class PaysService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/pays/';
        })
    }
     private _payss: Array<PaysVo> ;
     private _selectedPays: PaysVo;
     private _paysSelections: Array<PaysVo>;
     private _createPaysDialog: boolean;
     private _editPaysDialog: boolean;
     private _viewPaysDialog: boolean;
     public editPays$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPays:PaysVo ;

    // methods
    public archiver(pays: PaysVo): Observable<PaysVo> {
        return this.http.put<PaysVo>(this.API + 'archiver/' ,pays);
    }
    public desarchiver(pays: PaysVo): Observable<PaysVo> {
    return this.http.put<PaysVo>(this.API + 'desarchiver/' ,pays);
    }

    public findAll(){
     return this.http.get<Array<PaysVo>>(this.API);
    }

    public save(): Observable<PaysVo> {
           return this.http.post<PaysVo>(this.API, {...this.selectedPays,dateCreation: moment(this.selectedPays.dateCreation).format("YYYY-MM-DD")});
    }

    delete(pays: PaysVo) {
         return this.http.delete<number>(this.API + 'id/' + pays.id);
    }


    public edit(): Observable<PaysVo> {
        return this.http.put<PaysVo>(this.API, this.selectedPays);
    }


     public findByCriteria(pays:PaysVo):Observable<Array<PaysVo>>{
           return this.http.post<Array<PaysVo>>(this.API +'search', pays);
    }

   public findByIdWithAssociatedList(pays:PaysVo):Observable<PaysVo>{
         return this.http.get<PaysVo>(this.API + 'detail/id/' +pays.id);
    }

    // getters and setters


    get payss(): Array<PaysVo> {
    if(this._payss==null){
    this._payss=new Array<PaysVo>();
    }
return this._payss;
       }

    set payss(value: Array<PaysVo>) {
        this._payss = value;
       }

    get selectedPays(): PaysVo {
    if(this._selectedPays==null){
    this._selectedPays=new PaysVo();
    }
           return this._selectedPays;
       }

    set selectedPays(value: PaysVo) {
        this._selectedPays = value;
       }

    get paysSelections(): Array<PaysVo> {
    if(this._paysSelections==null){
    this._paysSelections=new Array<PaysVo>();
    }
        return this._paysSelections;
       }


    set paysSelections(value: Array<PaysVo>) {
        this._paysSelections = value;
       }

    get createPaysDialog(): boolean {
        return this._createPaysDialog;
       }

    set createPaysDialog(value: boolean) {
        this._createPaysDialog = value;
       }

    get editPaysDialog(): boolean {
        return this._editPaysDialog;
       }

    set editPaysDialog(value: boolean) {
        this._editPaysDialog = value;
       }

    get viewPaysDialog(): boolean {
        return this._viewPaysDialog;
       }

    set viewPaysDialog(value: boolean) {
        this._viewPaysDialog = value;
       }

     get searchPays(): PaysVo {
     if(this._searchPays==null){
    this._searchPays=new PaysVo();
    }
        return this._searchPays;
    }

    set searchPays(value: PaysVo) {
        this._searchPays = value;
       }

}
