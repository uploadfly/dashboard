import plunk from "../configs/plunk";

const sendEmail = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  try {
    await plunk.emails.send({
      to,
      subject,
      body,
      subscribed: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { sendEmail };
