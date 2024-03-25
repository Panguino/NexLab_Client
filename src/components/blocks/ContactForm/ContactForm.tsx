'use client'
import styles from './ContactForm.module.scss'

export const ContactForm = () => {
	// Form Validators
	function validateName(name) {
		// Regular expression to match only alphabets and allow spaces
		var regex = /^[A-Za-z ]+$/
		return regex.test(name) && name.length <= 64 ? name : false // probably a good idea to cap length
	}
	function validateEmail(email) {
		// Regular expression for validating email addresses
		var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return regex.test(email) ? email : false
	}
	function sanitizeSubject(subject) {
		subject = subject.trim()
		subject = subject.replace(/<[^>]*>/g, '')
		var maxLength = 256
		if (subject.length > maxLength) {
			subject = subject.substring(0, maxLength)
		}
		// Return false if the subject is empty
		if (subject.length === 0) {
			return false
		}
		return subject
	}
	function sanitizeBody(body) {
		body = body.trim()
		body = body.replace(/<[^>]*>/g, '')
		var maxLength = 2048 // Example maximum length
		if (body.length > maxLength) {
			body = body.substring(0, maxLength)
		}
		// Return false if the body is empty after sanitization
		if (body.length === 0) {
			return false
		}
		return body
	}

	// on Submit
	const submitForm = (e) => {
		e.preventDefault()
		const data = new FormData(e.target)
		const payload = Object.fromEntries(data)
		console.log(payload)
		// needs validation and then an endpoint
		// validate by hand

		// send client to confirm message
		function confirm(input) {
			if (
				validateName(input.first) &&
				validateName(input.last) &&
				validateEmail(input.email) &&
				sanitizeSubject(input.subject) &&
				sanitizeBody(input.message)
			) {
				console.log('data validated, can send to enpoint and confirm')
			}
		}
		confirm(payload)
	}
	return (
		<>
			<h1>Contact</h1>
			<p>Complete the form below and send us your message. We will be in touch as soon as possible.</p>
			<form className={styles.formContainer} onSubmit={submitForm} method="post">
				<input type="text" placeholder="First Name" name="first" required></input>
				<input type="text" placeholder="Last Name" name="last" required></input>
				<input type="email" placeholder="E-Mail Address" name="email" required></input>
				<input type="text" placeholder="Subject" name="subject" required></input>
				<textarea placeholder="Type your messsage..." name="message" required></textarea>
				<button className="formSubmit" type="submit">
					Send Message
				</button>
			</form>
		</>
	)
}

export default ContactForm
