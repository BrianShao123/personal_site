import emailjs from '@emailjs/browser';
import config from '../config';

export const sendEmail = (form: HTMLFormElement, onSuccess: () => void): void => {
  console.log('Sending email with form:', form);

  emailjs.sendForm(
    config.emailJsServiceId,
    config.emailJsTemplateId,
    form
  )
  .then((response) => {
    console.log('SUCCESS!', response.status, response.text);
    alert('Message sent successfully!');
    onSuccess();
  })
  .catch((error) => {
    console.log('FAILED...', error);
    alert(`Failed to send message: ${error.text || error}`);
  });
};
