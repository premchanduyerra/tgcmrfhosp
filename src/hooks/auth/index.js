//isLoggedIn
export const isLoggedIn=()=>{
    let data =sessionStorage.getItem('data')

    if(data==null)
     return false
    else
      return true 

}

//doLogin =>set data to sessionStorage
export const doLogin=(data,next)=>{
    if(data.statuscode===200){
sessionStorage.setItem('data',JSON.stringify(data.responseData.users))
    }
next()
}

export const doUpdate=(data)=>{
    // if(data.statuscode===200){
        console.log('data update in session storage')
        sessionStorage.removeItem('data')
        sessionStorage.setItem('data',JSON.stringify(data))
//     }
// next()
}

//doLogout=>remove from sessionStorage

export const doLogout=(next)=>{
    sessionStorage.removeItem('data')
    sessionStorage.removeItem("adminmenu")
    next()
}

//getCurrentUser
export const getCurrentUserDetails=()=>{
    if(isLoggedIn()){
        return JSON.parse(sessionStorage.getItem('data'))
    }
    else{
        return undefined
    }
}

export const getToken=()=>{
    let user=getCurrentUserDetails()
    return {
            authToken:user.jwtToken,
            role: user.roleId
           }
}