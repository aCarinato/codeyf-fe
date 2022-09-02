import Link from 'next/link';
import classes from './DropdownMenu.module.css';

function DropdownMenu(props) {
  const { menuItems } = props;

  //   console.log(menuItems);

  const menu = menuItems.map((menuItem) => (
    <div className={classes['container-flex-vertical-item']} key={menuItem.id}>
      <Link href={menuItem.link}>
        <a className={classes['main-nav-link']}>{menuItem.name}</a>
      </Link>
    </div>
  ));

  return <div className={classes['container-flex-vertical']}>{menu}</div>;
}

export default DropdownMenu;
