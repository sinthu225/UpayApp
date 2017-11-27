import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, 
         MatCardModule, MatIconModule,
         MatTableModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, 
            MatToolbarModule, 
            MatCardModule,
            MatIconModule,
            MatTableModule],
  exports: [MatButtonModule, 
            MatToolbarModule, 
            MatCardModule,
            MatIconModule,
            MatTableModule],
})
export class MaterialModule { }