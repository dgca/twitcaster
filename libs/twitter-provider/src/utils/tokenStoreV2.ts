class TokenStore {
  private stateToVerifierMap = new Map<
    string,
    {
      codeVerifier: string;
      timeoutId: ReturnType<typeof setTimeout>;
    }
  >();

  storeVerifier({
    state,
    codeVerifier,
  }: {
    state: string;
    codeVerifier: string;
  }) {
    if (this.stateToVerifierMap.get(state)) {
      clearTimeout(this.stateToVerifierMap.get(state)?.timeoutId);
    }

    const timeoutId = setTimeout(() => {
      this.stateToVerifierMap.delete(state);
    }, 1000 * 60 * 5);

    this.stateToVerifierMap.set(state, {
      codeVerifier,
      timeoutId,
    });
  }

  getVerifier(oauthToken: string): string | undefined {
    return this.stateToVerifierMap.get(oauthToken)?.codeVerifier;
  }
}

export const tokenStore = new TokenStore();
