export const userId = (id) =>{


    return{
        type:"CREATE_USER",
        payload:id
    }
}

export const showMessage = (show) =>{


    return{
        type:"SHOW_BOX",
        payload:show
    }
}

export const messageFriendList = (data) =>{


    return{
        type:"MESSAGE_LIST",
        payload:data
    }
}
export const unreadMessages = (data) =>{


    return{
        type:"UNREAD_MESSAGE",
        payload:data
    }
}

