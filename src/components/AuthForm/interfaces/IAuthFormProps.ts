interface IAuthFormProps {
  onAuth: (isLogin: boolean, email: string, password: string) => void;
  signInWithSocialNetworks: (provider: any) => void;
  signInWithTwitter: () => void;
}

export default IAuthFormProps;
