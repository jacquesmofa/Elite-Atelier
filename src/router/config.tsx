import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const ShopPage = lazy(() => import('../pages/shop/page'));
const LookbookPage = lazy(() => import('../pages/lookbook/page'));
const CheckoutPage = lazy(() => import('../pages/checkout/page'));
const MemberClubPage = lazy(() => import('../pages/member-club/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/shop',
    element: <ShopPage />,
  },
  {
    path: '/lookbook',
    element: <LookbookPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/member-club',
    element: <MemberClubPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;