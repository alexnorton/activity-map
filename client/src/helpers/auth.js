import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import Authenticating from '../components/Authenticating';

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user.user !== undefined,
  wrapperDisplayName: 'UserIsAuthenticated',
  authenticatingSelector: state => state.user.isFetching,
  AuthenticatingComponent: Authenticating,
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/home',
  allowRedirectBack: false,
  authenticatedSelector: state => !state.user.user,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  authenticatingSelector: state => state.user.isFetching,
  AuthenticatingComponent: Authenticating,
});
