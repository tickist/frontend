import {
    DateAdapter,
    MatAutocompleteModule, MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule, MatChipsModule,
    MatDatepickerModule,
    MatDialogModule, MatIconModule, MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule,
    MatSnackBarModule, MatToolbarModule,
    MatTooltipModule, MatExpansionModule, MAT_DATE_LOCALE,
    MatTreeModule
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {Platform, PlatformModule} from '@angular/cdk/platform';
import {NgModule} from '@angular/core';
import {MyDateAdapter} from './shared/data-adapter';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatInputModule, MatRadioModule, MatSelectModule,
        MatSlideToggleModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule,
        MatButtonToggleModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule,
        MatTooltipModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule, PlatformModule, MatTabsModule,
        ScrollingModule, MatInputModule, MatTreeModule, MatBadgeModule],
    providers: [
        {provide: DateAdapter, useClass: MyDateAdapter, deps: [MAT_DATE_LOCALE, Platform]}
    ],
    exports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatInputModule, MatRadioModule, MatSelectModule,
        MatSlideToggleModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule,
        MatButtonToggleModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule,
        MatTooltipModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule, PlatformModule, MatTabsModule,
        ScrollingModule, MatInputModule, MatTreeModule, MatBadgeModule],
    declarations: []
})
export class TickistMaterialModule {
}
