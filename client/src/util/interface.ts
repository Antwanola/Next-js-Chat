
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
  searchUsers: Array<SearchedUsers>
}

export interface SearchedUsers {
 id: string, 
 username: string
}