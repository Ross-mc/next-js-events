import { useContext, useRef } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailRef = useRef("")
  const notificationCtx = useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();

    const email = emailRef.current.value;

    notificationCtx.showNotification({
      title: "Signing Up...",
      message: "Registering for newsletter",
      status: "pending"
    })

    if (email.length < 5){
      alert("Invalid email")
      return
    }

    fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    })
      .then(response => {
        if (response.ok){
          return response.json()
        }
        //http status codes of 400 or 500 do not
        //cause a promise to fail, they actually resolve
        //so if we want to handle these we check ^^^ if response.ok is truthy
        //and then return response.json() (which returns another promise)
        //so we get to this next block when there is a 400 or 500 error
        response.json().then(data => {
          throw new Error(data.message || "Internal Server Error")
        })
        //because we throw this error, this causes the outer promise to be rejected
        //and then we enter the catch block
      })
      .then(data => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Registered for newsletter",
          status: "success"
        })
      })
      .catch(err => {
        notificationCtx.showNotification({
          title: "Error!",
          message: err,
          status: "error"
        })
      })

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;