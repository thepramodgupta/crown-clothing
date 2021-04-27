import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from "../../redux/user/user.actions";

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { HeaderContainer, LogoConatiner, OptionsContainer, OptionLink} from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoConatiner to="/">
            <Logo className='Logo' />
        </LogoConatiner>

        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='#'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={signOutStart}> 
                SIGN OUT
                </OptionLink>
                :
                <OptionLink to='/signin'>
                SIGN IN
                </OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden?
                null
            :<CartDropdown />

        }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDisptachToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(
    mapStateToProps,
    mapDisptachToProps
)(Header);