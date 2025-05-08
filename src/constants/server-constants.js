export const SERVER_CONSTANTS = {
	PORT: 8080,
	MONGODB_URI: process.env.MONGODB_URI,
	API_BASE: "/api",
	FRONTEND_URL: process.env.FRONTEND_URL,
	SMPT: {
		HOST: process.env.SMTP_HOST,
		PORT: process.env.SMTP_PORT,
		USER: process.env.SMTP_USER,
		PASSWORD: process.env.SMTP_PASSWORD,
	},
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
