import ContactMessage from "../models/contact.model.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submitContactMessage = async ({
  name,
  email,
  subject,
  message,
}) => {
  // Validate required fields.
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string"
  ) {
    throw createError("All fields are required", 400);
  }

  // Normalize input.
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanSubject = subject.trim();
  const cleanMessage = message.trim();

  if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
    throw createError("All fields are required", 400);
  }

  // Validate field lengths.
  if (cleanName.length > 100) {
    throw createError("Name must not exceed 100 characters", 400);
  }

  if (cleanEmail.length > 150 || !EMAIL_REGEX.test(cleanEmail)) {
    throw createError("Please provide a valid email address", 400);
  }

  if (cleanSubject.length > 200) {
    throw createError("Subject must not exceed 200 characters", 400);
  }

  if (cleanMessage.length > 5000) {
    throw createError("Message must not exceed 5000 characters", 400);
  }

  if (cleanMessage.length < 10) {
    throw createError("Message must contain at least 10 characters", 400);
  }

  const id = await ContactMessage.create({
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
  });

  return { id };
};
