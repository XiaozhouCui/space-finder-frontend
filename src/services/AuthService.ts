import { User, UserAttribute } from '../model/Model';
import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { config } from './config';
import * as AWS from 'aws-sdk';
import { Credentials } from 'aws-sdk/lib/credentials';

Amplify.configure({
  // auth data from cognito user pool and identity pool
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    identityPoolId: config.IDENTITY_POOL_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
});

export class AuthService {
  public async login(
    userName: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const user = (await Auth.signIn(userName, password)) as CognitoUser;
      return {
        cognitoUser: user,
        userName: user.getUsername(),
      };
    } catch (error) {
      return undefined;
    }
  }

  public async getUserAttributes(user: User): Promise<UserAttribute[]> {
    const result: UserAttribute[] = [];
    result.push({
      Name: 'description',
      Value: 'Best user ever!',
    });
    result.push({
      Name: 'job',
      Value: 'Engineer',
    });
    result.push({
      Name: 'age',
      Value: '25',
    });
    result.push({
      Name: 'experience',
      Value: '3 years',
    });
    return result;
  }
}
