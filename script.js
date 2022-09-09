const form = document.querySelector(".sign-up")

const inputFields = new Map([
	["First name", document.querySelector("#first-name")],
	["Last name", document.querySelector("#last-name")],
	["Email", document.querySelector("#email")],
	["Password", document.querySelector("#password")],
])

const submitButton = document.querySelector("#sign-up-button")

const showError = (input, message) => {
	input.classList.add("sign-up__input--error")

	const formField = input.parentElement
	// Target the corresponding error p
	const errorMessageBox = formField.querySelector(".sign-up__error")
	errorMessageBox.textContent = message
}

const showSuccess = input => {
	input.classList.remove("sign-up__input--error")

	const formField = input.parentElement
	// Target the corresponding error p
	const errorMessageBox = formField.querySelector(".sign-up__error")
	errorMessageBox.textContent = ""
}

const isValidEmail = email => {
	if (!email) {
		return
	}

	// Not the strongest RegEx to validate the email but it is good enough for the mock-up form
	const re = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}")

	return re.test(email)
}

document.addEventListener("DOMContentLoaded", () => form.reset())

form.addEventListener("submit", e => {
	// Prevents the form from submitting right away
	e.preventDefault()
})

// Error message disappeares when the user types something into the input
for (const input of inputFields.values()) {
	input.addEventListener("input", e => {
		e.target.classList.remove("sign-up__input--error")
	})
}

submitButton.addEventListener("click", e => {
	// For each input field, show the error message corresponding to its key
	for (const name of inputFields.keys()) {
		if (!inputFields.get(name).value) {
			showError(inputFields.get(name), `${name} cannot be empty`)
		} else {
			showSuccess(inputFields.get(name))
		}
	}

	const emailField = inputFields.get("Email")
	if (!emailField.value) return
	if (!isValidEmail(emailField.value)) {
		showError(emailField, "Looks like this is not an email")
	} else {
		showSuccess(emailField)
	}
})
