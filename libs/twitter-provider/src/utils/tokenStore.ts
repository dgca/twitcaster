class TokenStore {
  private tokenToSecretMap = new Map<
    string,
    {
      token: string;
      timeoutId: ReturnType<typeof setTimeout>;
    }
  >();

  storeSecret(oauthToken: string, oauthSecret: string) {
    if (this.tokenToSecretMap.get(oauthToken)) {
      clearTimeout(this.tokenToSecretMap.get(oauthToken)?.timeoutId);
    }

    const timeoutId = setTimeout(() => {
      this.tokenToSecretMap.delete(oauthToken);
    }, 1000 * 60 * 5);

    this.tokenToSecretMap.set(oauthToken, {
      token: oauthSecret,
      timeoutId,
    });
  }

  getSecret(oauthToken: string): string | undefined {
    return this.tokenToSecretMap.get(oauthToken)?.token;
  }
}

export const tokenStore = new TokenStore();
