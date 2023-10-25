import * as Yup from 'yup'

export const AuthSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required field'),
	password: Yup.string()
		.required('Required field')
		.min(6, 'Password must contain at least 6 characters')
		.matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/, {
			message:
				'Password must contain Latin characters, 1 digit, 1 capital character',
		}),
})

export const RegisterSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required field'),
	password: Yup.string()
		.required('Required field')
		.min(6, 'Password must contain at least 6 characters')
		.matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/, {
			message:
				'Password must contain Latin characters, 1 digit, 1 capital character',
		}),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match"),
})
