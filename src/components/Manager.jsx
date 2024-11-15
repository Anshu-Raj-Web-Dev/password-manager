import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Manager.css"

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ website: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const savePassword = () => {
        if (form.website.length > 0 && form.username.length > 0 && form.password.length > 0) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ website: "", username: "", password: "" })

            toast('Password saved', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: "Bounce"
            });
        }

        console.log(passwordArray)
    }

    const deletePassword = (id) => {
            setPasswordArray(passwordArray.filter(item=>item.id!== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!== id)))

            toast('Password Deleted', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: "Bounce"
            });
    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/show-btn.png")) {
            passwordRef.current.type = "text"
            ref.current.src = "icons/hide-btn.png"
        }
        else {
            ref.current.src = "icons/show-btn.png"
            passwordRef.current.type = "password"
        }
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Text Copied', {
            position: "top-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: "Bounce"
        });
    }



    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition="Bounce"
        />
    <ToastContainer />
        <div className='manager-container'>
            <div className="title">
                Your own Password Manager
            </div>

            <div className='inputs'>

                <input value={form.website} onChange={handleChange} type="text" name='website' id='website' placeholder='Website' />

                <div className="username-password">
                    <input value={form.username} onChange={handleChange} type="text" name='username' id='username' placeholder='Username' />

                    <div className="relative">
                        <input value={form.password} onChange={handleChange} ref={passwordRef} type="password" name='password' id='password' placeholder='Password' />
                        <span className='show-hide' onClick={showPassword}>
                            <img ref={ref} src="icons/hide-btn.png" width={25} />
                        </span>
                    </div>
                </div>
            </div>

            <button className='save' onClick={savePassword} >Save Password</button>

            <div className="your-passwords">
                <h1 className='your-passwords-h1'>Your Passwords</h1>
            </div>
            {passwordArray.length === 0 && <div className='no-passwords'>No Passwords to show</div>}
            {passwordArray.length != 0 &&
                <div className="table">
                    <div className="heading">
                        <ul>
                            <div className="site">Site</div>
                            <div className="username">Username</div>
                            <div className="password">Password</div>
                            <div className="action">Actions</div>
                        </ul>
                    </div>
                    <div className="saved-passwords">
                        <ul>
                            {passwordArray.map((item, index) => {

                                return <li className='saved-password-list' key={index}>

                                    
                                        <div className="saved-website"><a href={item.website} target='_blank'> {item.website}</a></div>
                                        <div className="saved-username">{item.username}</div>
                                        <div className="saved-password">{item.password}</div>
                                        <div className="saved-action">
                                            <div className="edit" onClick={() => { editPassword(item.id) }}>
                                                <img src="icons/edit.png"/>
                                            </div>
                                            <div className="delete" onClick={() => { deletePassword(item.id) }}>
                                                <img src="icons/delete.png" width={25}/>
                                            </div>
                                            <div className="copy" onClick={() => { copyText(item.website) }}>
                                            <img src="icons/copy.png"/>
                                            </div>
                                        </div>
                                    

                                </li>
                            })}

                        </ul>
                    </div>
                </div>}
        </div>
            </>
    )
}

export default Manager