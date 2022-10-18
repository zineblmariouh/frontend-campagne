import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnjeuxIrdEncadrementDoctorantVo} from '../model/EnjeuxIrdEncadrementDoctorant.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';
import {EncadrementDoctorantVo} from '../model/EncadrementDoctorant.model';


@Injectable({
  providedIn: 'root'
})
export class EnjeuxIrdEncadrementDoctorantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enjeuxIrdEncadrementDoctorant/';
        })
    }
     private _enjeuxIrdEncadrementDoctorants: Array<EnjeuxIrdEncadrementDoctorantVo> ;
     private _selectedEnjeuxIrdEncadrementDoctorant: EnjeuxIrdEncadrementDoctorantVo;
     private _enjeuxIrdEncadrementDoctorantSelections: Array<EnjeuxIrdEncadrementDoctorantVo>;
     private _createEnjeuxIrdEncadrementDoctorantDialog: boolean;
     private _editEnjeuxIrdEncadrementDoctorantDialog: boolean;
     private _viewEnjeuxIrdEncadrementDoctorantDialog: boolean;
     public editEnjeuxIrdEncadrementDoctorant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnjeuxIrdEncadrementDoctorant:EnjeuxIrdEncadrementDoctorantVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EnjeuxIrdEncadrementDoctorantVo>>(this.API);
    }

    public save(): Observable<EnjeuxIrdEncadrementDoctorantVo> {
         return this.http.post<EnjeuxIrdEncadrementDoctorantVo>(this.API, this.selectedEnjeuxIrdEncadrementDoctorant);
    }

    delete(enjeuxIrdEncadrementDoctorant: EnjeuxIrdEncadrementDoctorantVo) {
         return this.http.delete<number>(this.API + 'id/' + enjeuxIrdEncadrementDoctorant.id);
    }


    public edit(): Observable<EnjeuxIrdEncadrementDoctorantVo> {
        return this.http.put<EnjeuxIrdEncadrementDoctorantVo>(this.API, this.selectedEnjeuxIrdEncadrementDoctorant);
    }


     public findByCriteria(enjeuxIrdEncadrementDoctorant:EnjeuxIrdEncadrementDoctorantVo):Observable<Array<EnjeuxIrdEncadrementDoctorantVo>>{
           return this.http.post<Array<EnjeuxIrdEncadrementDoctorantVo>>(this.API +'search', enjeuxIrdEncadrementDoctorant);
    }

   public findByIdWithAssociatedList(enjeuxIrdEncadrementDoctorant:EnjeuxIrdEncadrementDoctorantVo):Observable<EnjeuxIrdEncadrementDoctorantVo>{
         return this.http.get<EnjeuxIrdEncadrementDoctorantVo>(this.API + 'detail/id/' +enjeuxIrdEncadrementDoctorant.id);
    }

    // getters and setters


    get enjeuxIrdEncadrementDoctorants(): Array<EnjeuxIrdEncadrementDoctorantVo> {
    if(this._enjeuxIrdEncadrementDoctorants==null){
    this._enjeuxIrdEncadrementDoctorants=new Array<EnjeuxIrdEncadrementDoctorantVo>();
    }
return this._enjeuxIrdEncadrementDoctorants;
       }

    set enjeuxIrdEncadrementDoctorants(value: Array<EnjeuxIrdEncadrementDoctorantVo>) {
        this._enjeuxIrdEncadrementDoctorants = value;
       }

    get selectedEnjeuxIrdEncadrementDoctorant(): EnjeuxIrdEncadrementDoctorantVo {
    if(this._selectedEnjeuxIrdEncadrementDoctorant==null){
    this._selectedEnjeuxIrdEncadrementDoctorant=new EnjeuxIrdEncadrementDoctorantVo();
    }
           return this._selectedEnjeuxIrdEncadrementDoctorant;
       }

    set selectedEnjeuxIrdEncadrementDoctorant(value: EnjeuxIrdEncadrementDoctorantVo) {
        this._selectedEnjeuxIrdEncadrementDoctorant = value;
       }

    get enjeuxIrdEncadrementDoctorantSelections(): Array<EnjeuxIrdEncadrementDoctorantVo> {
    if(this._enjeuxIrdEncadrementDoctorantSelections==null){
    this._enjeuxIrdEncadrementDoctorantSelections=new Array<EnjeuxIrdEncadrementDoctorantVo>();
    }
        return this._enjeuxIrdEncadrementDoctorantSelections;
       }


    set enjeuxIrdEncadrementDoctorantSelections(value: Array<EnjeuxIrdEncadrementDoctorantVo>) {
        this._enjeuxIrdEncadrementDoctorantSelections = value;
       }

    get createEnjeuxIrdEncadrementDoctorantDialog(): boolean {
        return this._createEnjeuxIrdEncadrementDoctorantDialog;
       }

    set createEnjeuxIrdEncadrementDoctorantDialog(value: boolean) {
        this._createEnjeuxIrdEncadrementDoctorantDialog = value;
       }

    get editEnjeuxIrdEncadrementDoctorantDialog(): boolean {
        return this._editEnjeuxIrdEncadrementDoctorantDialog;
       }

    set editEnjeuxIrdEncadrementDoctorantDialog(value: boolean) {
        this._editEnjeuxIrdEncadrementDoctorantDialog = value;
       }

    get viewEnjeuxIrdEncadrementDoctorantDialog(): boolean {
        return this._viewEnjeuxIrdEncadrementDoctorantDialog;
       }

    set viewEnjeuxIrdEncadrementDoctorantDialog(value: boolean) {
        this._viewEnjeuxIrdEncadrementDoctorantDialog = value;
       }

     get searchEnjeuxIrdEncadrementDoctorant(): EnjeuxIrdEncadrementDoctorantVo {
     if(this._searchEnjeuxIrdEncadrementDoctorant==null){
    this._searchEnjeuxIrdEncadrementDoctorant=new EnjeuxIrdEncadrementDoctorantVo();
    }
        return this._searchEnjeuxIrdEncadrementDoctorant;
    }

    set searchEnjeuxIrdEncadrementDoctorant(value: EnjeuxIrdEncadrementDoctorantVo) {
        this._searchEnjeuxIrdEncadrementDoctorant = value;
       }

}
