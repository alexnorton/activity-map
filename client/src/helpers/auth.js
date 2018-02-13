import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import Authenticating from '../components/Authenticating';

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user.loggedIn === true,
  wrapperDisplayName: 'UserIsAuthenticated',
  authenticatingSelector: state => !state.user.fetched,
  AuthenticatingComponent: Authenticating,
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/home',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user.loggedIn === false,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  authenticatingSelector: state => !state.user.fetched,
  AuthenticatingComponent: Authenticating,
});
