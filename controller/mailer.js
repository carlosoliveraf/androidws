var nodemailer = require('nodemailer');


var transporte = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'tibiacharactermonitor@gmail.com', 
    pass: '1Q2w3E4r'             
  } 
});


// var email = {
//   from: 'tibiacharactermonitor@gmail.com', // Quem enviou este e-mail
//   to: 'carlosedof@gmail.com', // Quem receberá
//   subject: 'Node.js ♥ unicode',  // Um assunto bacana :-) 
//   html: 'E-mail foi enviado do <strong>Node.js</strong>' // O conteúdo do e-mail
// };


// transporte.sendMail(email, function(err, info){
//   if(err)
//     throw err; // Oops, algo de errado aconteceu.

//   console.log('Email enviado! Leia as informações adicionais: ', info);
// });

var send = function(mail){
   transporte.sendMail(mail, function(err, info){
   if(err)
     throw err; // algo de errado aconteceu

   console.log('Email enviado! Leia as informações adicionais: ', info);
 });
}



exports.welcomeMail = function(user){
  var mail = {
  from: 'tibiacharactermonitor@gmail.com',
  to: user.email,
  subject: 'Welcome to Tibia Character Monitor',
  html: 'Hello '+user.name+'! Thanks for signing in! We are glad to have you on <strong>Tibia Character Monitor</strong><br/>Your username is: '+user.username
};
  send(mail);

};

exports.passwordForgotMail = function(user){
  var mail = {
  from: 'tibiacharactermonitor@gmail.com',
  to: user.email,
  subject: 'Tibia Character Monitor - Password Reminder',
  html: 'Hello '+user.name+'! We received a password reminder request.<br/> Your username is: '+user.username+' <br/> And your password is: '+user.password+'.'
};
  send(mail);

};




