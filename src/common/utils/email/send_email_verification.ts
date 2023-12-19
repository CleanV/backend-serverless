import PWA from '../../config/pwa';
import transporter from '../../config/transporter';

export default function sendEmailVerification(email: string, code: string) {
  transporter.sendMail(
    {
      from: 'melvinjovano2@gmail.com',
      to: email,
      subject: 'Verifikasi email kamu',
      html: `<div><a href="${PWA.createPasswordCodeURl(
        code,
      )}">Click Here</a> Expired 10 minutes</div>`,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    },
  );
}
