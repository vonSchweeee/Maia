import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSidenavModule} from "@angular/material/sidenav";

const modules = [
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatDividerModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSidenavModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
