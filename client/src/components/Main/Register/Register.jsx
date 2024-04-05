import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heroImage from '../../../assets/hero-image.png'
import logoSeveral from '../../../assets/logo_several.png'
import axios from '../../../api/axios';

const USER_REGEX = /^[a-z ,.'-]+$/i;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{12,64}$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/;
const REGISTER_URL = '/api/user';

const Register = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [branch, setBranch] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
      setValidPhone(PHONE_REGEX.test(phone));
  }, [phone])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd, email, phone, branch }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(response?.data);
            // console.log(response?.accessToken);
            // console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
            setEmail('');
            setPhone('');
            setBranch('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <section id="register-section">  
            <article className="color-picture-article">
                <img src={heroImage} className="outer-img" alt="" />
                <img src={logoSeveral} className='auth-logo inner-img' alt="" />
            </article> 
            
            <article id="register-form">
                {success ? (
                    <section className="signup-section">
                        <h2 className="success-title">Solicitud de creación de cuenta enviada</h2>
                        <p className="success-p">Tu solicitud será revisada por un administrador lo antes posible. Recibirás un mensaje en tu correo electrónico cuando haya sido aprobada.</p>
                        <Link to="/login">
                             <button className="success-btn">Volver al Inicio</button>
                        </Link>
                    </section>
                ) : (
                    <section className="signup-section">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h2>Crear cuenta</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">
                                Correo Electrónico
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="email"
                                id="email"
                                ref={emailRef}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                className="register-input"
                            />
                            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Correo electrónico no reconocido.<br />
                            </p>

                            <label htmlFor="username">
                                Nombre y apellido
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                className="register-input"
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Símbolo introducido no válido.
                            </p>

                            <label htmlFor="password">
                                Contraseña
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                className="register-input"
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Mínimo 12 caracteres.<br />
                                Debe incluir mayúscula y minúscula, números, y caracter especial.<br />
                                Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                            <label htmlFor="confirm_pwd">
                                Confirmar contraseña
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                className="register-input"
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Las contraseñas no coinciden.
                            </p>

                            <label htmlFor="phone">
                                Teléfono
                                <FontAwesomeIcon icon={faCheck} className={validPhone && phone ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="phone"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                required
                                aria-invalid={validPhone ? "false" : "true"}
                                aria-describedby="phonenote"
                                onFocus={() => setPhoneFocus(true)}
                                onBlur={() => setPhoneFocus(false)}
                                className="register-input"
                            />
                            <p id="phonenote" className={phoneFocus && !validPhone && phone ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                El teléfono no es válido.
                            </p>

                            <label htmlFor="branch">Delegación</label>
                            <select id="branch" value={(branch)} className="register-input" onChange={(e) => setBranch(e.target.value)}>
                            <option selected disabled>Elige tu delegación</option>
                            <option value="Valencia">Valencia</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Remoto">Remoto</option>
                            </select>
                            {/* <input
                                type="text"
                                id="branch"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                required
                                aria-invalid={validPhone ? "false" : "true"}
                                aria-describedby="phonenote"
                                onFocus={() => setPhoneFocus(true)}
                                onBlur={() => setPhoneFocus(false)}
                            />
                            <p id="phonenote" className={phoneFocus && !validPhone && phone ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                El teléfono no es válido.
                            </p> */}

                            <button disabled={!validName || !validPwd || !validEmail || !validMatch || !validPhone ? true : false}>Crear cuenta</button>
                        </form>
                        <p className="align-start">
                            ¿Ya tienes cuenta? 
                            <span className='line'>
                                <Link to="/login">
                                    <a href="#">Inicia sesión</a>
                                </Link>
                            </span>
                        </p>
                    </section>
                )}
            </article>
        </section>
    )
}

export default Register
