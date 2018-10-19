import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { PyxisSharedModule } from '@pyxis/shared.module';
import { PyxisCountdownModule } from '@pyxis/components';

import { PyxisComingSoonComponent } from './coming-soon.component';

const routes = [
    {
        path: '',
        component: PyxisComingSoonComponent
    }
];

@NgModule({
    declarations: [
        PyxisComingSoonComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        PyxisSharedModule,
        PyxisCountdownModule
    ]
})
export class ComingSoonModule {
}
