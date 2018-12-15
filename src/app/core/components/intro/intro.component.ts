import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { ApplicationSettings } from '../../interfaces/application-settings';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent implements OnInit {

  @ViewChild('imgElement') private imgElement: ElementRef;
  private applicationSettings: ApplicationSettings;

  constructor(private router: Router,
              private authService: AuthService,
              private toastService: ToastService,
              private renderer2: Renderer2) {}

  public ngOnInit(): void {
    this.renderer2.addClass(this.imgElement.nativeElement, 'scale');
    this.applicationSettings = JSON.parse(localStorage.getItem('app-settings'));
  }

  private autoLogin(): void {
    if (this.applicationSettings && this.applicationSettings.autoLogin) {
      this.authService.login(localStorage.getItem('password'));
    }
  }

  @HostListener('document:keydown.enter')
  public goToLogin(): void {
    if (this.applicationSettings && this.applicationSettings.autoLogin) {
      this.autoLogin();
    } else {
      this.loadLoginForm();
    }
  }

  private loadLoginForm(): void {
    this.renderer2.removeClass(this.imgElement.nativeElement, 'scale');
    this.renderer2.addClass(this.imgElement.nativeElement, 'rotate');
    setTimeout(() => {
      this.router.navigate(['login']).catch((error) => {
        this.toastService.error(error);
      });
    }, 2000);
  }
}
