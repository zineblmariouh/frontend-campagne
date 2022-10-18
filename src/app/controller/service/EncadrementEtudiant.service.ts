import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EncadrementEtudiantVo} from '../model/EncadrementEtudiant.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {EtudiantVo} from '../model/Etudiant.model';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../model/ResponsabiliteDirectionEncadrementEtudiant.model';
import {EncadrementVo} from '../model/Encadrement.model';
import {EncadrementEtudiantEnjeuxIrdVo} from '../model/EncadrementEtudiantEnjeuxIrd.model';
import {NiveauFormationPostBacVo} from '../model/NiveauFormationPostBac.model';
import {EtablissementVo} from '../model/Etablissement.model';
import {EncadrementEtudiantDisciplineScientifiqueVo} from '../model/EncadrementEtudiantDisciplineScientifique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class EncadrementEtudiantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/encadrementEtudiant/';
        })
    }
     private _encadrementEtudiants: Array<EncadrementEtudiantVo> ;
     private _selectedEncadrementEtudiant: EncadrementEtudiantVo;
     private _encadrementEtudiantSelections: Array<EncadrementEtudiantVo>;
     private _createEncadrementEtudiantDialog: boolean;
     private _editEncadrementEtudiantDialog: boolean;
     private _viewEncadrementEtudiantDialog: boolean;
     public editEncadrementEtudiant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEncadrementEtudiant:EncadrementEtudiantVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EncadrementEtudiantVo>>(this.API);
    }

    public save(): Observable<EncadrementEtudiantVo> {
         return this.http.post<EncadrementEtudiantVo>(this.API, this.selectedEncadrementEtudiant);
    }

    delete(encadrementEtudiant: EncadrementEtudiantVo) {
         return this.http.delete<number>(this.API + 'id/' + encadrementEtudiant.id);
    }


    public edit(): Observable<EncadrementEtudiantVo> {
        return this.http.put<EncadrementEtudiantVo>(this.API, this.selectedEncadrementEtudiant);
    }


     public findByCriteria(encadrementEtudiant:EncadrementEtudiantVo):Observable<Array<EncadrementEtudiantVo>>{
           return this.http.post<Array<EncadrementEtudiantVo>>(this.API +'search', encadrementEtudiant);
    }

   public findByIdWithAssociatedList(encadrementEtudiant:EncadrementEtudiantVo):Observable<EncadrementEtudiantVo>{
         return this.http.get<EncadrementEtudiantVo>(this.API + 'detail/id/' +encadrementEtudiant.id);
    }

    // getters and setters


    get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
    if(this._encadrementEtudiants==null){
    this._encadrementEtudiants=new Array<EncadrementEtudiantVo>();
    }
return this._encadrementEtudiants;
       }

    set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this._encadrementEtudiants = value;
       }

    get selectedEncadrementEtudiant(): EncadrementEtudiantVo {
    if(this._selectedEncadrementEtudiant==null){
    this._selectedEncadrementEtudiant=new EncadrementEtudiantVo();
    }
           return this._selectedEncadrementEtudiant;
       }

    set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this._selectedEncadrementEtudiant = value;
       }

    get encadrementEtudiantSelections(): Array<EncadrementEtudiantVo> {
    if(this._encadrementEtudiantSelections==null){
    this._encadrementEtudiantSelections=new Array<EncadrementEtudiantVo>();
    }
        return this._encadrementEtudiantSelections;
       }


    set encadrementEtudiantSelections(value: Array<EncadrementEtudiantVo>) {
        this._encadrementEtudiantSelections = value;
       }

    get createEncadrementEtudiantDialog(): boolean {
        return this._createEncadrementEtudiantDialog;
       }

    set createEncadrementEtudiantDialog(value: boolean) {
        this._createEncadrementEtudiantDialog = value;
       }

    get editEncadrementEtudiantDialog(): boolean {
        return this._editEncadrementEtudiantDialog;
       }

    set editEncadrementEtudiantDialog(value: boolean) {
        this._editEncadrementEtudiantDialog = value;
       }

    get viewEncadrementEtudiantDialog(): boolean {
        return this._viewEncadrementEtudiantDialog;
       }

    set viewEncadrementEtudiantDialog(value: boolean) {
        this._viewEncadrementEtudiantDialog = value;
       }

     get searchEncadrementEtudiant(): EncadrementEtudiantVo {
     if(this._searchEncadrementEtudiant==null){
    this._searchEncadrementEtudiant=new EncadrementEtudiantVo();
    }
        return this._searchEncadrementEtudiant;
    }

    set searchEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this._searchEncadrementEtudiant = value;
       }

}
