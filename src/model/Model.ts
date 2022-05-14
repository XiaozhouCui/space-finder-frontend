import { CognitoUser } from '@aws-amplify/auth';

export interface User {
  userName: string;
  cognitoUser: CognitoUser;
  isAdmin: boolean;
}

export interface UserAttribute {
  // this follows type CognitoUserAttribute
  Name: string;
  Value: string;
}

export interface Space {
  spaceId: string;
  name: string;
  location: string;
  photoURL?: string;
}
