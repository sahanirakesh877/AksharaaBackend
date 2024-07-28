const asyncHandler = require("express-async-handler");
const Enquiry = require("../Models/enquirySchema");
const nodemailer = require("nodemailer");

// post Enquiry
const postEnquiry = asyncHandler(async (req, res) => {
  try {
    const {
      studentName,
      studentAge,
      studentGender,
      studentGrade,
      studentAddress,
      parentName,
      parentEmail,
      parentPhone,
      parentOccupation,
      parentAddress,
      transportation,
      knowAboutUs,
    } = req.body;
    console.log({
      studentName,
      studentAge,
      studentGender,
      studentGrade,
      studentAddress,
      parentName,
      parentEmail,
      parentPhone,
      parentOccupation,
      parentAddress,
      transportation,
      knowAboutUs,
    });
    if (
      studentName?.trim() === "" ||
      studentAge?.trim() === "" ||
      studentGender?.trim() === "" ||
      studentGrade?.trim() === "" ||
      studentAddress?.trim() === "" ||
      parentName?.trim() === "" ||
      parentEmail?.trim() === "" ||
      parentPhone?.trim() === "" ||
      parentOccupation?.trim() === "" ||
      parentAddress?.trim() === "" ||
      knowAboutUs?.trim() === ""
    ) {
      return res.json({
        success: false,
        message: "Form fields are required",
      });
    } else {
      const enquiry = new Enquiry({
        studentName,
        studentAge,
        studentGender,
        studentGrade,
        studentAddress,
        parentName,
        parentEmail,
        phone: parentPhone,
        occupation: parentOccupation,
        parentAddress,
        transportation,
        source: knowAboutUs,
      });

      await enquiry.save();

      const transporter = nodemailer.createTransport({
        // Specify your email service details (SMTP or other service)
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      // Compose email message
      const confirmationMail = {
        to: parentEmail,
        subject: "Enquiry Submitted",
        html: `
        <p>Your enquiry for student <strong>${studentName} ${studentGrade}</strong>  has been submitted. </p>
      `,
      };

      transporter.sendMail(confirmationMail, (error, info) => {
        if (error) {
          console.error(error);
          return res.json({
            success: true,
            message:
              "Enquiry Submitted we will reach back to you about your enquiry.",
          });
        }
        res.json({
          success: true,
          message: "Enquiry Submitted",
        });
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// post Enquiry
const getEnquiry = asyncHandler(async (req, res) => {
  try {
    const enquiries = await Enquiry.find({});
    res.json({
      success: true,
      message: "Fetched Enquiries",
      enquiries,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { postEnquiry, getEnquiry };
