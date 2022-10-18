import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EncadrementDoctorantVo} from '../model/EncadrementDoctorant.model';
import {FinancementDoctorantVo} from '../model/FinancementDoctorant.model';
import {EnjeuxIrdEncadrementDoctorantVo} from '../model/EnjeuxIrdEncadrementDoctorant.model';
import {DisciplineScientifiqueEncadrementDoctorantVo} from '../model/DisciplineScientifiqueEncadrementDoctorant.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {CommunauteSavoirEncadrementDoctorantVo} from '../model/CommunauteSavoirEncadrementDoctorant.model';
import {EncadrementVo} from '../model/Encadrement.model';
import {DoctorantVo} from '../model/Doctorant.model';
import {ResponsabiliteEncadrementDoctorantVo} from '../model/ResponsabiliteEncadrementDoctorant.model';
import {EtablissementVo} from '../model/Etablissement.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class EncadrementDoctorantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/encadrementDoctorant/';
        })
    }
     private _encadrementDoctorants: Array<EncadrementDoctorantVo> ;
     private _selectedEncadrementDoctorant: EncadrementDoctorantVo;
     private _encadrementDoctorantSelections: Array<EncadrementDoctorantVo>;
     private _createEncadrementDoctorantDialog: boolean;
     private _editEncadrementDoctorantDialog: boolean;
     private _viewEncadrementDoctorantDialog: boolean;
     public editEncadrementDoctorant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEncadrementDoctorant:EncadrementDoctorantVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EncadrementDoctorantVo>>(this.API);
    }

    public save(): Observable<EncadrementDoctorantVo> {
           return this.http.post<EncadrementDoctorantVo>(this.API, {...this.selectedEncadrementDoctorant,datePrevuSoutenanceThese: moment(this.selectedEncadrementDoctorant.datePrevuSoutenanceThese).format("YYYY-MM-DD")});
    }

    delete(encadrementDoctorant: EncadrementDoctorantVo) {
         return this.http.delete<number>(this.API + 'id/' + encadrementDoctorant.id);
    }


    public edit(): Observable<EncadrementDoctorantVo> {
        return this.http.put<EncadrementDoctorantVo>(this.API, this.selectedEncadrementDoctorant);
    }


     public findByCriteria(encadrementDoctorant:EncadrementDoctorantVo):Observable<Array<EncadrementDoctorantVo>>{
           return this.http.post<Array<EncadrementDoctorantVo>>(this.API +'search', encadrementDoctorant);
    }

   public findByIdWithAssociatedList(encadrementDoctorant:EncadrementDoctorantVo):Observable<EncadrementDoctorantVo>{
         return this.http.get<EncadrementDoctorantVo>(this.API + 'detail/id/' +encadrementDoctorant.id);
    }

    // getters and setters


    get encadrementDoctorants(): Array<EncadrementDoctorantVo> {
    if(this._encadrementDoctorants==null){
    this._encadrementDoctorants=new Array<EncadrementDoctorantVo>();
    }
return this._encadrementDoctorants;
       }

    set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this._encadrementDoctorants = value;
       }

    get selectedEncadrementDoctorant(): EncadrementDoctorantVo {
    if(this._selectedEncadrementDoctorant==null){
    this._selectedEncadrementDoctorant=new EncadrementDoctorantVo();
    }
           return this._selectedEncadrementDoctorant;
       }

    set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this._selectedEncadrementDoctorant = value;
       }

    get encadrementDoctorantSelections(): Array<EncadrementDoctorantVo> {
    if(this._encadrementDoctorantSelections==null){
    this._encadrementDoctorantSelections=new Array<EncadrementDoctorantVo>();
    }
        return this._encadrementDoctorantSelections;
       }


    set encadrementDoctorantSelections(value: Array<EncadrementDoctorantVo>) {
        this._encadrementDoctorantSelections = value;
       }

    get createEncadrementDoctorantDialog(): boolean {
        return this._createEncadrementDoctorantDialog;
       }

    set createEncadrementDoctorantDialog(value: boolean) {
        this._createEncadrementDoctorantDialog = value;
       }

    get editEncadrementDoctorantDialog(): boolean {
        return this._editEncadrementDoctorantDialog;
       }

    set editEncadrementDoctorantDialog(value: boolean) {
        this._editEncadrementDoctorantDialog = value;
       }

    get viewEncadrementDoctorantDialog(): boolean {
        return this._viewEncadrementDoctorantDialog;
       }

    set viewEncadrementDoctorantDialog(value: boolean) {
        this._viewEncadrementDoctorantDialog = value;
       }

     get searchEncadrementDoctorant(): EncadrementDoctorantVo {
     if(this._searchEncadrementDoctorant==null){
    this._searchEncadrementDoctorant=new EncadrementDoctorantVo();
    }
        return this._searchEncadrementDoctorant;
    }

    set searchEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this._searchEncadrementDoctorant = value;
       }

}
