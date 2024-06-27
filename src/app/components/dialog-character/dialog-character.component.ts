import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import { Character } from '../../models/character';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'mottu-dialog-character',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCardModule, MatListModule, MatDividerModule],
  templateUrl: './dialog-character.component.html',
  styleUrl: './dialog-character.component.scss'
})
export class DialogCharacterComponent {

  readonly dialogRef = inject(MatDialogRef<DialogCharacterComponent>);
  readonly character = inject<Character>(MAT_DIALOG_DATA);

  constructor(){}

}
