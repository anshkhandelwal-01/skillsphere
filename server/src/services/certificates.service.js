async function generateCertificate(user, course) {
  const certificateUrl = `https://certificates.skillsphere.com/${user._id}_${course._id}.pdf`;
  if (!user.certificates.includes(certificateUrl)) {
    user.certificates.push(certificateUrl);
    await user.save();
  }
  return certificateUrl;
}

module.exports = { generateCertificate };