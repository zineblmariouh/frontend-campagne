import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaysRencontreMediaVo} from '../model/PaysRencontreMedia.model';
import {RencontreMediaVo} from '../model/RencontreMedia.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class PaysRencontreMediaService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paysRencontreMedia/';
        })
    }
     private _paysRencontreMedias: Array<PaysRencontreMediaVo> ;
     private _selectedPaysRencontreMedia: PaysRencontreMediaVo;
     private _paysRencontreMediaSelections: Array<PaysRencontreMediaVo>;
     private _createPaysRencontreMediaDialog: boolean;
     private _editPaysRencontreMediaDialog: boolean;
     private _viewPaysRencontreMediaDialog: boolean;
     public editPaysRencontreMedia$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaysRencontreMedia:PaysRencontreMediaVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PaysRencontreMediaVo>>(this.API);
    }

    public save(): Observable<PaysRencontreMediaVo> {
         return this.http.post<PaysRencontreMediaVo>(this.API, this.selectedPaysRencontreMedia);
    }

    delete(paysRencontreMedia: PaysRencontreMediaVo) {
         return this.http.delete<number>(this.API + 'id/' + paysRencontreMedia.id);
    }


    public edit(): Observable<PaysRencontreMediaVo> {
        return this.http.put<PaysRencontreMediaVo>(this.API, this.selectedPaysRencontreMedia);
    }


     public findByCriteria(paysRencontreMedia:PaysRencontreMediaVo):Observable<Array<PaysRencontreMediaVo>>{
           return this.http.post<Array<PaysRencontreMediaVo>>(this.API +'search', paysRencontreMedia);
    }

   public findByIdWithAssociatedList(paysRencontreMedia:PaysRencontreMediaVo):Observable<PaysRencontreMediaVo>{
         return this.http.get<PaysRencontreMediaVo>(this.API + 'detail/id/' +paysRencontreMedia.id);
    }

    // getters and setters


    get paysRencontreMedias(): Array<PaysRencontreMediaVo> {
    if(this._paysRencontreMedias==null){
    this._paysRencontreMedias=new Array<PaysRencontreMediaVo>();
    }
return this._paysRencontreMedias;
       }

    set paysRencontreMedias(value: Array<PaysRencontreMediaVo>) {
        this._paysRencontreMedias = value;
       }

    get selectedPaysRencontreMedia(): PaysRencontreMediaVo {
    if(this._selectedPaysRencontreMedia==null){
    this._selectedPaysRencontreMedia=new PaysRencontreMediaVo();
    }
           return this._selectedPaysRencontreMedia;
       }

    set selectedPaysRencontreMedia(value: PaysRencontreMediaVo) {
        this._selectedPaysRencontreMedia = value;
       }

    get paysRencontreMediaSelections(): Array<PaysRencontreMediaVo> {
    if(this._paysRencontreMediaSelections==null){
    this._paysRencontreMediaSelections=new Array<PaysRencontreMediaVo>();
    }
        return this._paysRencontreMediaSelections;
       }


    set paysRencontreMediaSelections(value: Array<PaysRencontreMediaVo>) {
        this._paysRencontreMediaSelections = value;
       }

    get createPaysRencontreMediaDialog(): boolean {
        return this._createPaysRencontreMediaDialog;
       }

    set createPaysRencontreMediaDialog(value: boolean) {
        this._createPaysRencontreMediaDialog = value;
       }

    get editPaysRencontreMediaDialog(): boolean {
        return this._editPaysRencontreMediaDialog;
       }

    set editPaysRencontreMediaDialog(value: boolean) {
        this._editPaysRencontreMediaDialog = value;
       }

    get viewPaysRencontreMediaDialog(): boolean {
        return this._viewPaysRencontreMediaDialog;
       }

    set viewPaysRencontreMediaDialog(value: boolean) {
        this._viewPaysRencontreMediaDialog = value;
       }

     get searchPaysRencontreMedia(): PaysRencontreMediaVo {
     if(this._searchPaysRencontreMedia==null){
    this._searchPaysRencontreMedia=new PaysRencontreMediaVo();
    }
        return this._searchPaysRencontreMedia;
    }

    set searchPaysRencontreMedia(value: PaysRencontreMediaVo) {
        this._searchPaysRencontreMedia = value;
       }

}
