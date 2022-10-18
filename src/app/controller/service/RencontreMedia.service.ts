import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RencontreMediaVo} from '../model/RencontreMedia.model';
import {RencontreMediaPeriodeVo} from '../model/RencontreMediaPeriode.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {PaysRencontreMediaVo} from '../model/PaysRencontreMedia.model';
import {RencontreMediaDisciplineScientifiqueVo} from '../model/RencontreMediaDisciplineScientifique.model';
import {RencontreMediaEnjeuxIrdVo} from '../model/RencontreMediaEnjeuxIrd.model';
import {TypePubliqueRencontreMediaVo} from '../model/TypePubliqueRencontreMedia.model';
import {FormatRencontreVo} from '../model/FormatRencontre.model';
import {CultureScientifiqueVo} from '../model/CultureScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class RencontreMediaService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rencontreMedia/';
        })
    }
     private _rencontreMedias: Array<RencontreMediaVo> ;
     private _selectedRencontreMedia: RencontreMediaVo;
     private _rencontreMediaSelections: Array<RencontreMediaVo>;
     private _createRencontreMediaDialog: boolean;
     private _editRencontreMediaDialog: boolean;
     private _viewRencontreMediaDialog: boolean;
     public editRencontreMedia$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRencontreMedia:RencontreMediaVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RencontreMediaVo>>(this.API);
    }

    public save(): Observable<RencontreMediaVo> {
         return this.http.post<RencontreMediaVo>(this.API, this.selectedRencontreMedia);
    }

    delete(rencontreMedia: RencontreMediaVo) {
         return this.http.delete<number>(this.API + 'id/' + rencontreMedia.id);
    }


    public edit(): Observable<RencontreMediaVo> {
        return this.http.put<RencontreMediaVo>(this.API, this.selectedRencontreMedia);
    }


     public findByCriteria(rencontreMedia:RencontreMediaVo):Observable<Array<RencontreMediaVo>>{
           return this.http.post<Array<RencontreMediaVo>>(this.API +'search', rencontreMedia);
    }

   public findByIdWithAssociatedList(rencontreMedia:RencontreMediaVo):Observable<RencontreMediaVo>{
         return this.http.get<RencontreMediaVo>(this.API + 'detail/id/' +rencontreMedia.id);
    }

    // getters and setters


    get rencontreMedias(): Array<RencontreMediaVo> {
    if(this._rencontreMedias==null){
    this._rencontreMedias=new Array<RencontreMediaVo>();
    }
return this._rencontreMedias;
       }

    set rencontreMedias(value: Array<RencontreMediaVo>) {
        this._rencontreMedias = value;
       }

    get selectedRencontreMedia(): RencontreMediaVo {
    if(this._selectedRencontreMedia==null){
    this._selectedRencontreMedia=new RencontreMediaVo();
    }
           return this._selectedRencontreMedia;
       }

    set selectedRencontreMedia(value: RencontreMediaVo) {
        this._selectedRencontreMedia = value;
       }

    get rencontreMediaSelections(): Array<RencontreMediaVo> {
    if(this._rencontreMediaSelections==null){
    this._rencontreMediaSelections=new Array<RencontreMediaVo>();
    }
        return this._rencontreMediaSelections;
       }


    set rencontreMediaSelections(value: Array<RencontreMediaVo>) {
        this._rencontreMediaSelections = value;
       }

    get createRencontreMediaDialog(): boolean {
        return this._createRencontreMediaDialog;
       }

    set createRencontreMediaDialog(value: boolean) {
        this._createRencontreMediaDialog = value;
       }

    get editRencontreMediaDialog(): boolean {
        return this._editRencontreMediaDialog;
       }

    set editRencontreMediaDialog(value: boolean) {
        this._editRencontreMediaDialog = value;
       }

    get viewRencontreMediaDialog(): boolean {
        return this._viewRencontreMediaDialog;
       }

    set viewRencontreMediaDialog(value: boolean) {
        this._viewRencontreMediaDialog = value;
       }

     get searchRencontreMedia(): RencontreMediaVo {
     if(this._searchRencontreMedia==null){
    this._searchRencontreMedia=new RencontreMediaVo();
    }
        return this._searchRencontreMedia;
    }

    set searchRencontreMedia(value: RencontreMediaVo) {
        this._searchRencontreMedia = value;
       }

}
