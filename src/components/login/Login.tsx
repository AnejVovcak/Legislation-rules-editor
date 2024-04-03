import {useState} from "react";
import {
    Button,
    Form,
    FormGroup,
    FormInput,
    Message,
    Modal,
    ModalActions,
    ModalContent,
    ModalHeader
} from "semantic-ui-react";
import {getJWT} from "../../api/api";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const handleLogin = () => {
        getJWT({email, password}).then((data) => {
            setError(false);
            console.log("JWT token:", data);
            //save access_token to local storage
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('email', email)
            //redirect to previous page
            window.location.href = '/';
        }).catch((error) => {
            console.error("Failed to login:", error);
            //show error message
            setError(true);
        })
    };

    return (
        <Modal open={true}>
            <ModalHeader>Login with your MongoDB credentials</ModalHeader>
            <ModalContent style={{padding: '3em'}} form>
                <Form>
                    <FormInput name="email" fluid label='Email' placeholder='Email' value={email || ''}
                               onChange={(e) => setEmail(e.target.value)}/>
                    <FormInput name="password" type='password' fluid label='Password' placeholder='Password'
                               value={password || ''}
                               onChange={(e) => setPassword(e.target.value)}/>
                </Form>
                <Message
                    hidden={!error}
                    error
                    header='Error'
                    content='Invalid email or password'
                />
            </ModalContent>
            <ModalActions>
                <Button color='blue' onClick={handleLogin}>
                    Login
                </Button>
            </ModalActions>
        </Modal>
    )
}

export default Login;