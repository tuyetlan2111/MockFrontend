import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

logout() {
  this.authService.logout();
  this.router.navigate(["/"]);
}
});
