
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';

<#list pojos as pojo>
import { ${pojo.name?cap_first}${role.name?cap_first}Component } from './${pojo.formatedUrl?uncap_first}-${role.name}/${pojo.formatedUrl?uncap_first}-${role.name}.component';
</#list>
@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [
                        <#list pojos as pojo>
                        {

                            path: '${pojo.formatedUrl?uncap_first}',
                            children: [
                                {
                                    path: 'list',
                                    component: ${pojo.name?cap_first}${role.name?cap_first}Component ,
                                    canActivate: [AuthGuard]
                                }
                                <#if role.name == "chercheur" && pojo.createUpdateConfounded>
                                 ,{
                                    path: 'create',
                                    component: ${pojo.name?cap_first}Create${role.name?cap_first}Component ,
                                    canActivate: [AuthGuard]
                                }
                                </#if>
                            ]
                        },
                        </#list>

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class ${submodule.className?cap_first}.${role.name?cap_first}RoutingModule { }
