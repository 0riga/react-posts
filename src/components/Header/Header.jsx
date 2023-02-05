import s from './index.module.css';
import logo from '../../assets/logo.webp'
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className={s.header}>
			<div className={s.header__content}>
				<Link to={'/'}>
					<div className={s.logo}>
						<img src={logo} alt="logo" />
					</div>
				</Link>
				<div className={s.header__content__buttons}>
					{/* <Button type="button">Войти</Button>
					<Button type="button">Зарегестрироваться</Button> */}
				</div>
			</div>
		</div>
	)
}
export default Header;