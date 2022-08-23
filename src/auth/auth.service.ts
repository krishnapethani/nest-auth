import { Catch, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as LRAuthPrrovider from 'loginradius-sdk'
import { error } from 'console';

@Injectable()
export class AuthService {
    authenticate: any;
    async signup(registerUserDto: UserDto) {
      try {
        
        const response = await LRAuthPrrovider.authenticationApi
            .checkEmailAvailability(registerUserDto.email)
          if (response.isExist) {
          return "Email already in use"
          }
          
          let authUserRegistrationModel = {
            email: [
              {
                type: "primary",
                value: registerUserDto.email,
              },
            ],
            password: registerUserDto.password,
          };
          // register user
          let user = await LRAuthPrrovider.authenticationApi
          .userRegistrationByEmail(authUserRegistrationModel, StorageEvent)
          if(user) {
            return "Sign up successful"
          }
        } catch (error) {
          return error
        }

    }
    async login(loginUserDTO: UserDto) {
        try {
            let emailAuthenticationModel = {
                email: loginUserDTO.email,
                password: loginUserDTO.password,
              };
            let user = await LRAuthPrrovider.authenticationApi
                .loginByEmail(emailAuthenticationModel)
            return {
                accessToken: user.access_token,
            }
        } catch (error) {
            return error
        }
        
    }
    async authnicate(accessToken: string) {
        try {
          const response = await LRAuthPrrovider.authenticationApi
            .authValidateAccessToken(accessToken)
          return response
        } catch (error) {
          throw new UnauthorizedException();
        }
}
}
                