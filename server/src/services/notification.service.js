const Notification = require('../models/Notification');

async function sendLeadNotification(leadId, assessmentName, userName) {
  await Notification.create({
    toUserId: leadId,
    type: 'LeadNotified',
    title: 'Attempt limit exceeded',
    message: `${userName} exceeded attempts for ${assessmentName}.`,
  });
}

module.exports = { sendLeadNotification };