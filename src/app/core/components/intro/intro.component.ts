import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent implements OnInit {

  @ViewChild('imgElement') private imgElement: ElementRef;

  constructor(private router: Router, private toastService: ToastService, private renderer2: Renderer2) {}

  public ngOnInit(): void {
    this.renderer2.addClass(this.imgElement.nativeElement, 'scale');
  }

  @HostListener('document:keydown.enter')
  public goToLogin(): void {
    this.renderer2.removeClass(this.imgElement.nativeElement, 'scale');
    this.renderer2.addClass(this.imgElement.nativeElement, 'rotate');
    setTimeout(() => {
      this.router.navigate(['login']).catch((error) => {
        this.toastService.error(error);
      });
    }, 2000);
  }
}
