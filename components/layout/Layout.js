import classes from './Layout.module.css';
// own components
import MainHeader from './MainHeader';

function Layout({ children }) {
  return (
    <div>
      <MainHeader />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
