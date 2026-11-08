import { submitContactMessage } from "../services/contact.service.js";

export const createContactMessage = async (req, res) => {
  try {
    const result = await submitContactMessage(req.body);

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully. Thank you for contacting us.",
      id: result.id,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error("CREATE CONTACT MESSAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send your message. Please try again later.",
    });
  }
};
