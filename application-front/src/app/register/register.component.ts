import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApplicationService} from '../service/application.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  email: FormControl;
  username: FormControl;
  password: FormControl;

  constructor(private applicationService: ApplicationService, private router: Router) {
    this.email = new FormControl('');
    this.username = new FormControl('');
    this.password = new FormControl('');

    this.formGroup = new FormGroup({
      email: this.email,
      username: this.username,
      password: this.password
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    // TODO Gérer les échecs d'inscription
    // Losqu'un utilisateur existe déjà, cette requête ne devrait pas fonctionner,
    // Il faut donc afficher le bon message d'erreur avec une alerte via `Swal`
    // Il faut avoir un formulaire valide: mail valide et pas de champs vides
    if(this.validateEmail(this.email.value)){
      this.applicationService.register(this.username.value, this.password.value, this.email.value).subscribe((user) => {

        sessionStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['home']);
        Swal.fire('Inscription réussie', 'Vous êtes à présent connecté', 'success');
      }, (error) => {
        Swal.fire('Erreur', 'Cet utilisateur existe déjà','error')
      });
    } else {
      Swal.fire('Attention',"l'email n'est pas valide",'warning');
    }
  }

  validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
}
