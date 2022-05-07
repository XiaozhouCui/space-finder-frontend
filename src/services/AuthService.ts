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

  public async confirmSignUp(username: string, code: string): Promise<any | undefined> {
    try {
      const result = await Auth.confirmSignUp(username, code);
      return result
    } catch (error) {
      console.error(error);
      return undefined
    }
  }

  public async signUp(username: string, password: string, email: string): Promise<CognitoUser | undefined> {
    try {
      const result = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      return result.user;
    } catch (error) {
      console.error(error);
      return undefined
    }
  }

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

  public async logOut() {
    return await Auth.signOut();
  }

  public async getAWSTemporaryCreds(user: CognitoUser) {
    // Initialize the Amazon Cognito credentials provider
    const cognitoIdentityPool = `cognito-idp.${config.REGION}.amazonaws.com/${config.USER_POOL_ID}`;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials(
      {
        IdentityPoolId: config.IDENTITY_POOL_ID,
        Logins: {
          [cognitoIdentityPool]: user
            .getSignInUserSession()!
            .getIdToken()
            .getJwtToken(),
        },
      },
      {
        region: config.REGION,
      }
    );
    await this.refreshCredentials();
  }

  // refresh credentials asynchronously
  private async refreshCredentials(): Promise<void> {
    return new Promise((resolve, reject) => {
      (AWS.config.credentials as Credentials).refresh((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async getUserAttributes(user: User): Promise<UserAttribute[]> {
    const result: UserAttribute[] = [];
    // get user info (email, email_verified, sub, etc.) from cognito user pool
    const attributes = await Auth.userAttributes(user.cognitoUser);
    result.push(...attributes);
    return result;
  }
}
