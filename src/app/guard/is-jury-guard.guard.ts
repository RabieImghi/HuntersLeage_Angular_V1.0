import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenStorageServiceService} from "../service/token-storage-service.service";

export const isJuryGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const tokenService = inject(TokenStorageServiceService);

  const token = tokenService.getToken();
  if(token){
    const role = tokenService.getRole();
    console.log(role);
    if(role){
      if(role == "JURY" || role == "ADMIN")
        return true;
      else {
        console.log("111111111111111111");
        router.navigateByUrl("/Unauthorized");
        return false;
      }
    }else {
      console.log("222222");
      router.navigateByUrl("/login");
      return false;
    }
  }else {
    console.log("33333333");
    router.navigateByUrl("/login");
    return false;
  }
};
