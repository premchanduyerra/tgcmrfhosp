 import { encrypt,decrypt } from "../crypto/EncrDecr";


//isLoggedIn
export const isLoggedIn=()=>{
    let data =sessionStorage.getItem('data')

    if(data==null)
     return false
    else
      return true 

}

//doLogin =>set encrypted data to sessionStorage
export const doLogin=(data,next)=>{
    if(data.statusCode===200){

        var encryptedUserData=encrypt(JSON.stringify(data.data));
        sessionStorage.setItem('data',encryptedUserData)
        sessionStorage.setItem('dataWithoutEncpt',JSON.stringify(data.data))//remove this line after completion
    }
    next()
}

export const doUpdate=(data)=>{

        console.log('data update in session storage')
        sessionStorage.removeItem('data')
        var encryptedUserData=encrypt(JSON.stringify(data));
        sessionStorage.setItem('data',encryptedUserData)
        sessionStorage.setItem('dataWithoutEncpt',JSON.stringify(data))//remove this line after completion

}

//doLogout=>remove from sessionStorage

export const doLogout=(next)=>{
    sessionStorage.removeItem('data')
    console.log("data removed from session")
}

//getCurrentUser
export const getCurrentUserDetails=()=>{
    if(isLoggedIn()){
        return JSON.parse(decrypt(sessionStorage.getItem('data')))
    }
    else{
        return undefined
    }
}

export const getToken=()=>{
    let user=getCurrentUserDetails()
    return user?.token;
}