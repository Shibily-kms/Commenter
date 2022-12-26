const signUpFormFunction = function (obj) {
    let regex = /^[A-Za-z ]+$/
    let uregex = /^[A-Za-z0-9 ]+$/

    let firstnameValid = regex.test(obj.firstName);
    let lastnameValid = regex.test(obj.lastName);
    let usernameValid = uregex.test(obj.userName);

    if (obj.firstName === null || obj.lastName === null || obj.userName === null || obj.emailId === null || obj.dob === null ||
        obj.password === null || obj.cpassword === null || obj.mobile === null) {
        return {
            success: false,
            message: 'Fill the form Completed'
        }
    } else if (!firstnameValid || !lastnameValid || !usernameValid) {

        return {
            success: false,
            message: 'Clear symbols in Name inputs'
        }
    } else if (obj.userName.length < 3) {

        return {
            success: false,
            message: 'Username must be at least 3 characters long'
        }

    } else if (obj.mobile.length !== 10) {
        return {
            success: false,
            message: 'Mobile number must be at 10 numbers '
        }
    } else if (obj.password.length < 6) {
        return {
            success: false,
            message: 'Password must be at least 6 characters long'
        }
    } else if (obj.password !== obj.cpassword) {
        return {
            success: false,
            message: 'Password not match'
        }
    } else {
        return {
            success: true,
            message: 'Validation Completed'
        }
    }
}

const passwordValidation = (obj) => {
    if (obj.password === null || obj.cpassword === null) {
        return {
            success: false,
            message: 'Fill the form Completed'
        }
    } else if (obj.password.length < 6) {
        return {
            success: false,
            message: 'Password must be at least 6 characters long'
        }
    } else if (obj.password !== obj.cpassword) {
        return {
            success: false,
            message: 'Password not match'
        }
    } else {
        return {
            success: true,
            message: 'Validation Completed'
        }
    }
}

const NewPasswordValidation = (obj) => {
    if (obj.current === null || obj.password === null || obj.confirm === null) {
        return {
            success: false,
            message: 'Fill the form Completed'
        }
    } else if (obj.password.length < 6) {
        return {
            success: false,
            message: 'Password must be at least 6 characters long'
        }
    } else if (obj.password !== obj.confirm) {
        return {
            success: false,
            message: 'Password not match'
        }
    } else {
        return {
            success: true,
            message: 'Validation Completed'
        }
    }
}

const editprofileValidation = (obj) => {
    let regex = /^[A-Za-z ]+$/


    let firstnameValid = regex.test(obj.firstName);
    let lastnameValid = regex.test(obj.lastName);

    if (obj.firstName === null || obj.lastName === null || obj.emailId === null || obj.dob === null) {
        return {
            success: false,
            message: 'Fill the required inputs'
        }
    } else if (!firstnameValid || !lastnameValid) {

        return {
            success: false,
            message: 'Clear symbols in Name inputs'
        }
    } else {
        return {
            success: true,
            message: 'Validation Completed'
        }
    }
}

export { signUpFormFunction, passwordValidation, editprofileValidation, NewPasswordValidation };