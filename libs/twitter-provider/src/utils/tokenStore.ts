class TokenStore {
  private tokenToSecretMap = new Map<string, string>();

  storeSecret(oauthToken: string, oauthSecret: string) {
    this.tokenToSecretMap.set(oauthToken, oauthSecret);

    setTimeout(() => {
      this.tokenToSecretMap.delete(oauthToken);
    }, 1000 * 60 * 5);
  }

  getSecret(oauthToken: string): string | undefined {
    return this.tokenToSecretMap.get(oauthToken);
  }
}

export const tokenStore = new TokenStore();
