import { CanActivateFn } from '@angular/router';
import { TokenStorageServiceService } from '../service/token-storage-service.service';
import { Router } from '@angular/router';


export const isJuryTestGuard: CanActivateFn = (route, state) => {
  const router = new Router();

  const tokenStorage = new TokenStorageServiceService();
  const username = tokenStorage.getSub();
  if(username === 'jury_test'){
    router.navigate(['/admin/competitions']);
    return false;
  }else return true;
  
  
};
