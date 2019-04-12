
// siempre importar esta linea porque es un modulo de angular
import { NgModule } from '@angular/core'; 
import {MatButtonModule, MatCheckboxModule, MatListModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';

//spinner
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

//menu
import {MatMenuModule} from '@angular/material/menu'

//SnackBar
import {MatSnackBarModule} from '@angular/material/snack-bar';

//tabs
import {MatTabsModule} from '@angular/material/tabs';


import { ReactiveFormsModule } from '@angular/forms';


import {MatToolbarModule,
     MatIconModule, 
     MatCardModule,
     MatInputModule, 
     MatFormFieldModule
        
    } from '@angular/material';
  

const modules=
[
    MatButtonModule,
     MatCheckboxModule,

     //
     MatToolbarModule,
     MatIconModule,
     MatCardModule,
     MatInputModule,

     MatListModule,
     MatGridListModule, 
     MatRadioModule,
     
     //spinner
     MatProgressSpinnerModule,
    //menu
    MatMenuModule,
    //Snak bar
    MatSnackBarModule,
    //tabs
    MatTabsModule,

    MatFormFieldModule,

    ReactiveFormsModule,
];


//Para indicar que es un modulo de angular se necesita esta notacion
// recibe 2 parametros
@NgModule({
    imports: modules,
    exports: modules,
})


export class MaterialModule{

}