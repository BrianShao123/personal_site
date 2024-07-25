import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import config from '../config';

const useEmailJS = () => {
  useEffect(() => {
    emailjs.init(config.emailJsPublicKey);
  }, []);
};


export default useEmailJS;
