'use client'
import styles from './ContactForm.module.scss'

export const ContactForm = () => {
	const submitForm = (e) => {
		e.preventDefault()
		const data = new FormData(e.target)
		const payload = Object.fromEntries(data)
		console.log(payload)
		// needs validation and then an endpoint
	}
	return (
		<>
			<h1>Contact</h1>
			<p>Complete the form below and send us your message. We will be in touch as soon as possible.</p>
			<form className={styles.formContainer} onSubmit={submitForm} method="post">
				<input type="text" placeholder="First Name" name="first"></input>
				<input type="text" placeholder="Last Name" name="last"></input>
				<input type="email" placeholder="E-Mail Address" name="email"></input>
				<input type="text" placeholder="Subject" name="subject"></input>
				<textarea name="message" placeholder="Type your messsage..."></textarea>
				<button className="formSubmit" type="submit">
					Send Message
				</button>
			</form>
		</>
	)
}

export default ContactForm
