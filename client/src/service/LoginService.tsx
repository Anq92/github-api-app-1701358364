export class LoginService {

    private serverUrl = import.meta.env.VITE_SERVER_URL;
    
    async getAccessToken(code: string) : Promise<string> {
        const response = await fetch(`${this.serverUrl}token?code=${code}`, {
            method: "GET",
          });
        
        const data = await response.json();
        return data.access_token;
    }
}

