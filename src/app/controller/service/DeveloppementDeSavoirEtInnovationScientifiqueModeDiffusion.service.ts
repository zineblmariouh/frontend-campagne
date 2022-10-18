import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from '../model/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import {ModeDiffusionVo} from '../model/ModeDiffusion.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/developpementDeSavoirEtInnovationScientifiqueModeDiffusion/';
        })
    }
     private _developpementDeSavoirEtInnovationScientifiqueModeDiffusions: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> ;
     private _selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo;
     private _developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>;
     private _createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog: boolean;
     private _editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog: boolean;
     private _viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog: boolean;
     public editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion:DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>>(this.API);
    }

    public save(): Observable<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
         return this.http.post<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion);
    }

    delete(developpementDeSavoirEtInnovationScientifiqueModeDiffusion: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {
         return this.http.delete<number>(this.API + 'id/' + developpementDeSavoirEtInnovationScientifiqueModeDiffusion.id);
    }


    public edit(): Observable<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
        return this.http.put<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion);
    }


     public findByCriteria(developpementDeSavoirEtInnovationScientifiqueModeDiffusion:DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo):Observable<Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>>{
           return this.http.post<Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>>(this.API +'search', developpementDeSavoirEtInnovationScientifiqueModeDiffusion);
    }

   public findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueModeDiffusion:DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo):Observable<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>{
         return this.http.get<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>(this.API + 'detail/id/' +developpementDeSavoirEtInnovationScientifiqueModeDiffusion.id);
    }

    // getters and setters


    get developpementDeSavoirEtInnovationScientifiqueModeDiffusions(): Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
    if(this._developpementDeSavoirEtInnovationScientifiqueModeDiffusions==null){
    this._developpementDeSavoirEtInnovationScientifiqueModeDiffusions=new Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>();
    }
return this._developpementDeSavoirEtInnovationScientifiqueModeDiffusions;
       }

    set developpementDeSavoirEtInnovationScientifiqueModeDiffusions(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueModeDiffusions = value;
       }

    get selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(): DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo {
    if(this._selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion==null){
    this._selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion=new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
    }
           return this._selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion;
       }

    set selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(value: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {
        this._selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
    if(this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections==null){
    this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections=new Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>();
    }
        return this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections;
       }


    set developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections = value;
       }

    get createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(): boolean {
        return this._createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog;
       }

    set createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(value: boolean) {
        this._createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = value;
       }

    get editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(): boolean {
        return this._editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog;
       }

    set editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(value: boolean) {
        this._editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = value;
       }

    get viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(): boolean {
        return this._viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog;
       }

    set viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(value: boolean) {
        this._viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = value;
       }

     get searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(): DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo {
     if(this._searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion==null){
    this._searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion=new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
    }
        return this._searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion;
    }

    set searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(value: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {
        this._searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = value;
       }

}
