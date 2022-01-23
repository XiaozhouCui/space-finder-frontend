import { Component } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../model/Model';

export default class Navbar extends Component<{ user: User | undefined }> {
  render() {
    let loginLogOut: any;

    if (this.props.user) {
      loginLogOut = <Link to="/logout">{this.props.user.userName}</Link>;
    } else {
      loginLogOut = <Link to="/login">Login</Link>;
    }

    return (
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/profile">Prifile</Link>
        {loginLogOut}
      </div>
    );
  }
}
