/**
 * Email Template for Hotel Booking Confirmation
 * Contains template generation and formatting utilities
 */

export const generateBookingEmailTemplate = (bookingData) => {
  return {
    to_email: "abc@xyz.com",
    subject: `New Hotel Booking - ${bookingData.hotel_name}`,
    user_name: bookingData.user_name,
    user_email: bookingData.user_email,
    user_phone: bookingData.user_phone,
    hotel_name: bookingData.hotel_name,
    hotel_location: bookingData.hotel_location,
    hotel_price: bookingData.hotel_price,
    hotel_rating: bookingData.hotel_rating,
    check_in: bookingData.check_in,
    check_out: bookingData.check_out,
    guests: bookingData.guests,
    message: bookingData.message || "No special requests",
    // For formatted email body
    email_body: formatEmailBody(bookingData),
  };
};

const formatEmailBody = (data) => {
  return `
--- Guest Details ---
Name:    ${data.user_name}
Email:   ${data.user_email}
Phone:   ${data.user_phone}

--- Hotel Details ---
Hotel:    ${data.hotel_name}
Location: ${data.hotel_location}
Price:    ₹${data.hotel_price} / night
Rating:   ${data.hotel_rating} stars

--- Booking Details ---
Check-in:  ${data.check_in}
Check-out: ${data.check_out}
Guests:    ${data.guests}

Message: ${data.message || "No special requests"}
  `.trim();
};

// Sample usage in BookingModal:
export const exampleUsage = `
import { generateBookingEmailTemplate } from '../utils/emailTemplate';
import emailjs from '@emailjs/browser';

const handleSubmit = async (formData) => {
  const emailTemplate = generateBookingEmailTemplate({
    user_name: formData.name,
    user_email: formData.email,
    user_phone: formData.phone,
    hotel_name: selectedHotel.name,
    hotel_location: selectedHotel.location,
    hotel_price: selectedHotel.price,
    hotel_rating: selectedHotel.rating,
    check_in: formData.checkIn,
    check_out: formData.checkOut,
    guests: formData.guests,
    message: formData.message,
  });

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      emailTemplate,
      PUBLIC_KEY
    );
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email send failed:', error);
  }
};
`;
