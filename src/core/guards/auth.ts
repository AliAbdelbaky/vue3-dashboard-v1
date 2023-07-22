const LOGIN_PATH = {
    name: 'auth-login'
};

export async function AuthGuard(to, from, next) {
    const token = true;


    if (!token) {
        return  next(LOGIN_PATH)
    }


    // set local storage and refresh token
    const roles = to.meta.roles as [] | undefined
    const user_roles = [1, 2]


    if (!user_roles) {
        return next(LOGIN_PATH)
    }


    if (!roles || roles.length == 0) {
        return next()
    }

    const allowed = roles.every((x: number) => {
        return user_roles.includes(x)
    })


    if (!allowed) {
        return next({name: 'dashboard-home'})
    }
    return next()
}