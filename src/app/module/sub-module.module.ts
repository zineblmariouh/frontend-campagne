import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { Login${role.name?cap_first}Component } from './login-${role.name}/login-${role.name}.component';
import { Register${role.name?cap_first}Component } from './register-${role.name}/register-${role.name}.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

<#list pojos as pojo>
import { ${pojo.name?cap_first}Create${role.name?cap_first}Component } from './view/${pojo.formatedUrl?uncap_first}-${role.name}/create-${role.name}/${pojo.formatedUrl?uncap_first}-create-${role.name}.component';
import { ${pojo.name?cap_first}Edit${role.name?cap_first}Component } from './view/${pojo.formatedUrl?uncap_first}-${role.name}/edit-${role.name}/${pojo.formatedUrl?uncap_first}-edit-${role.name}.component';
import { ${pojo.name?cap_first}View${role.name?cap_first}Component } from './view/${pojo.formatedUrl?uncap_first}-${role.name}/view-${role.name}/${pojo.formatedUrl?uncap_first}-view-${role.name}.component';
import { ${pojo.name?cap_first}List${role.name?cap_first}Component } from './view/${pojo.formatedUrl?uncap_first}-${role.name}/list-${role.name}/${pojo.formatedUrl?uncap_first}-list-${role.name}.component';
import { ${pojo.name?cap_first}${role.name?cap_first}Component } from './view/${pojo.formatedUrl?uncap_first}-${role.name}/${pojo.formatedUrl?uncap_first}-${role.name}.component';
</#list>

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';


@NgModule({
  declarations: [

<#list pojos as pojo>
    ${pojo.name?cap_first}Create${role.name?cap_first}Component,
    ${pojo.name?cap_first}List${role.name?cap_first}Component,
    ${pojo.name?cap_first}View${role.name?cap_first}Component,
    ${pojo.name?cap_first}Edit${role.name?cap_first}Component,
    ${pojo.name?cap_first}${role.name?cap_first}Component,
</#list>
  ],
  imports: [
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    TabViewModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    BadgeModule,
    MultiSelectModule
  ],
  exports: [
<#list pojos as pojo>
  ${pojo.name?cap_first}Create${role.name?cap_first}Component,
  ${pojo.name?cap_first}List${role.name?cap_first}Component,
  ${pojo.name?cap_first}View${role.name?cap_first}Component,
  ${pojo.name?cap_first}Edit${role.name?cap_first}Component,
  ${pojo.name?cap_first}${role.name?cap_first}Component,
</#list>
  ],
  entryComponents: [],
})
export class ${submodule.className?cap_first}${role.name?cap_first}Module { }
