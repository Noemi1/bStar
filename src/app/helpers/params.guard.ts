import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Crypto } from '../utils/crypto';

@Injectable({
	providedIn: 'root'
})
export class ParamsGuard implements CanActivate {

	obj: any;
	contemParametros = true;
	parametrosFaltando: string[] = []

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private crypto: Crypto,
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		this.contemParametros = true;
		if(route.data['params']) {
			route.data['params'].forEach((param: any) => {
				var includes = route.queryParamMap.has(param) || route.paramMap.has(param);
        var paramValue = route.queryParamMap.get(param) || route.paramMap.get(param);
        if (!includes || !paramValue || !paramValue.trim()) {
          this.contemParametros = false;
					this.parametrosFaltando.push(param);
					if(route.data['returnUrl'] != undefined) {
						this.router.navigateByUrl(route.data['returnUrl']);
					}
        }
			});
		}
    if(this.parametrosFaltando.length > 0) {
      this.toastr.error('Operação não autorizada!');
    }

		return this.contemParametros;
	}
}
