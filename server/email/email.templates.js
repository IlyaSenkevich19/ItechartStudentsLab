module.exports = {
  confirm: id => ({
    subject: 'React Confirm Email',
    html: `
      <a href='http://localhost:8000/api/user/email/confirm/${id}'>
        click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: http://localhost:8000/api/user/email/confirm/${id}`
  }),

  confirmCaptchaEmail: (voteId, userId) => ({
    subject: 'React Confirm Email',
    html: `
      <a href='http://localhost:8000/api/user/email/confirm/captcha/${voteId}/${userId}'>
        click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: http://localhost:8000/api/user/email/confirm/captcha/${voteId}/${userId}`
  })
  
}