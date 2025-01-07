import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import { TokenStorageServiceService} from "../service/token-storage-service.service";

export const isAdminGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const tokenService = inject(TokenStorageServiceService);

  const token = tokenService.getToken();
  if(token){
    const role = tokenService.getRole();
    if(role){
      if(role == "ADMIN")
        return true;
      else {
        router.navigateByUrl("/Unauthorized");
        return false;
      }
    }else {
      router.navigateByUrl("/login");
      return false;
    }
  }else {
    router.navigateByUrl("/login");
    return false;
  }
};
