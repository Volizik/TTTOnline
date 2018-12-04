import {
    MatAutocompleteModule,
    MatButtonModule, MatCardModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatSelectModule, MatTabsModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatTabsModule,
        MatDialogModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatTabsModule,
        MatDialogModule
    ],
})
export class AppMaterialModule {
}
