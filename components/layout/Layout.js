import classes from './Layout.module.css';
// own components
import MainHeader from './MainHeader';
// import { Icon } from '@iconify/react';

function Layout({ children }) {
  return (
    <div>
      <MainHeader />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
