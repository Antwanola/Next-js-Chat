//Users
export interface CreateUsernameData {
  createUserName: {
      success: boolean,
      error: string
    }
  }
  
export interface CreateUsernameVariables {
  username: string
  }

export interface SearchUsernameInput {
    username: string
  }

export interface SearchUsernameData {
  searchUsers: [SearchedUsers]
}

export interface SearchedUsers {
 id: string, 
 username: string
}

export interface CreateConvoRes {
convoId: string
}

//Conversations

export interface CreateConvoInputs {
participantsIds: Array<string>
}

export interface CreateConvoData {
  createConversation: {
    convoId: string
  }
}