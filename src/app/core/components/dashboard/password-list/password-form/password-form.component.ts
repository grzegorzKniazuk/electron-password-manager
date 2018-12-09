import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFormComponent implements OnInit {

  public credentialsForm: FormGroup;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.initForm();
  }

  public initForm(): void {
    this.credentialsForm = this.formService.credentialsForm;
  }

  public saveCredentials(): void {
    if (this.credentialsForm.valid) {

    }
  }
}
