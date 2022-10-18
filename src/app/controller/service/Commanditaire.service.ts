import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommanditaireVo} from '../model/Commanditaire.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class CommanditaireService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/commanditaire/';
        })
    }
     private _commanditaires: Array<CommanditaireVo> ;
     private _selectedCommanditaire: CommanditaireVo;
     private _commanditaireSelections: Array<CommanditaireVo>;
     private _createCommanditaireDialog: boolean;
     private _editCommanditaireDialog: boolean;
     private _viewCommanditaireDialog: boolean;
     public editCommanditaire$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommanditaire:CommanditaireVo ;

    // methods
    public archiver(commanditaire: CommanditaireVo): Observable<CommanditaireVo> {
        return this.http.put<CommanditaireVo>(this.API + 'archiver/' ,commanditaire);
    }
    public desarchiver(commanditaire: CommanditaireVo): Observable<CommanditaireVo> {
    return this.http.put<CommanditaireVo>(this.API + 'desarchiver/' ,commanditaire);
    }

    public findAll(){
     return this.http.get<Array<CommanditaireVo>>(this.API);
    }

    public save(): Observable<CommanditaireVo> {
           return this.http.post<CommanditaireVo>(this.API, {...this.selectedCommanditaire,dateCreation: moment(this.selectedCommanditaire.dateCreation).format("YYYY-MM-DD")});
    }

    delete(commanditaire: CommanditaireVo) {
         return this.http.delete<number>(this.API + 'id/' + commanditaire.id);
    }


    public edit(): Observable<CommanditaireVo> {
        return this.http.put<CommanditaireVo>(this.API, this.selectedCommanditaire);
    }


     public findByCriteria(commanditaire:CommanditaireVo):Observable<Array<CommanditaireVo>>{
           return this.http.post<Array<CommanditaireVo>>(this.API +'search', commanditaire);
    }

   public findByIdWithAssociatedList(commanditaire:CommanditaireVo):Observable<CommanditaireVo>{
         return this.http.get<CommanditaireVo>(this.API + 'detail/id/' +commanditaire.id);
    }

    // getters and setters


    get commanditaires(): Array<CommanditaireVo> {
    if(this._commanditaires==null){
    this._commanditaires=new Array<CommanditaireVo>();
    }
return this._commanditaires;
       }

    set commanditaires(value: Array<CommanditaireVo>) {
        this._commanditaires = value;
       }

    get selectedCommanditaire(): CommanditaireVo {
    if(this._selectedCommanditaire==null){
    this._selectedCommanditaire=new CommanditaireVo();
    }
           return this._selectedCommanditaire;
       }

    set selectedCommanditaire(value: CommanditaireVo) {
        this._selectedCommanditaire = value;
       }

    get commanditaireSelections(): Array<CommanditaireVo> {
    if(this._commanditaireSelections==null){
    this._commanditaireSelections=new Array<CommanditaireVo>();
    }
        return this._commanditaireSelections;
       }


    set commanditaireSelections(value: Array<CommanditaireVo>) {
        this._commanditaireSelections = value;
       }

    get createCommanditaireDialog(): boolean {
        return this._createCommanditaireDialog;
       }

    set createCommanditaireDialog(value: boolean) {
        this._createCommanditaireDialog = value;
       }

    get editCommanditaireDialog(): boolean {
        return this._editCommanditaireDialog;
       }

    set editCommanditaireDialog(value: boolean) {
        this._editCommanditaireDialog = value;
       }

    get viewCommanditaireDialog(): boolean {
        return this._viewCommanditaireDialog;
       }

    set viewCommanditaireDialog(value: boolean) {
        this._viewCommanditaireDialog = value;
       }

     get searchCommanditaire(): CommanditaireVo {
     if(this._searchCommanditaire==null){
    this._searchCommanditaire=new CommanditaireVo();
    }
        return this._searchCommanditaire;
    }

    set searchCommanditaire(value: CommanditaireVo) {
        this._searchCommanditaire = value;
       }

}
