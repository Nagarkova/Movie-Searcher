import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiTextfield } from '@taiga-ui/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, TuiTextfield, TuiAvatar],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  value = '';
}

