import React from 'react';
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';
import Login from './Login';

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.setUser = this.setUser.bind(this);
  }
  private authService: AuthService = new AuthService();

  private setUser(user: User) {
    this.setState({ user });
  }

  render(): React.ReactNode {
    return (
      <div>
        App from class works!
        <Login authService={this.authService} setUser={this.setUser} />
      </div>
    );
  }
}
