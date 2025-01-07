import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { TokenStorageServiceService} from "../service/token-storage-service.service";

export const isLoginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const tokenService = inject(TokenStorageServiceService);
  if(tokenService.getToken()){
    router.navigateByUrl("/")
    return false;
  }else {
    return true;
  }
};
