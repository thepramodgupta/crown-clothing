
import SignIn from '../../components/sign-in/sign-in.component';
import Signup from '../../components/sign-up/sign-up.component'
import './sign-in-and-sign-up.styles.scss';

const SigninAndSignUpPage = () =>  (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        <Signup />
    </div>
)

export default SigninAndSignUpPage;