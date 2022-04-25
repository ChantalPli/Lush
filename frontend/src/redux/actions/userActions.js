import axios from 'axios';
import Swal from 'sweetalert2'

const alertsToasts = (icon, message) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: `${icon}`,
        title: `${message}`
    })
}

const userActions = {

    signUpUser: (userData) => {
        return async (dispatch, getState) => {
            const res = await axios.post('https://lushplants.herokuapp.com/api/auth/signup', userData)
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            });
            alertsToasts(res.data.success ? 'success' : 'error',
                Array.isArray(res.data.message) ?
                    res.data.message.map(msg => msg.message).join('<hr>') :
                    res.data.message
            )
        }
    },
    signInUser: (loggedUser) => {
        return async (dispatch, getState) => {
            const user = await axios.post('https://lushplants.herokuapp.com/api/auth/signin', loggedUser)
            if (user.data.success) {
                alertsToasts('success', user.data.message)
                localStorage.setItem('token', user.data.response.token)
                dispatch({ type: 'user', payload: user.data.response.user });
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: user.data.message,
                        success: user.data.success
                    }
                })
            } else {
                alertsToasts('error', user.data.message)
            }

        }
    },
    SignOutUser: () => {
        return async (dispatch, getState) => {
            const token = localStorage.getItem('token')
            const user = await axios.post('https://lushplants.herokuapp.com/api/auth/signout', null, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            localStorage.removeItem('token')
            dispatch({ type: 'user', payload: null });
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: user.data.message,
                    success: user.data.success
                }
            })
        }
    },
    verifyToken: () => {
        return async (dispatch, getState) => {
            //console.log(token)
            const token = localStorage.getItem('token')
            const user = await axios.get('https://lushplants.herokuapp.com/api/auth/signin', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            //console.log(user)
            if (user.data.success) {
                dispatch({ type: 'user', payload: user.data.response });
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: user.data.message,
                        success: user.data.success
                    }
                })
            } else {
                localStorage.removeItem('token')
            }
        }
    }
}

export default userActions;