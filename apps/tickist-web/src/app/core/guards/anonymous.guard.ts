import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {UserService} from '../services/user.service';
import {AuthService} from '../../modules/auth/services/auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {dashboardRoutesName} from '../../modules/dashboard/routes.names';
import {homeRoutesName} from '../../routing.module.name';


@Injectable()
export class AnonymousGuard implements CanActivate {

    constructor(protected router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, stateRouter: RouterStateSnapshot): Observable<boolean> {

        return this.authService.authState$.pipe(map(state => {
                if (state === null) {
                    return true;
                }
                this.router.navigate([homeRoutesName.HOME, dashboardRoutesName.DASHBOARD]);
                return false;
            }
            )
        );
    }
}
