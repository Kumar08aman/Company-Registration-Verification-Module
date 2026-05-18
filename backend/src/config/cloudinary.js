const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
// You need to get these values from your Cloudinary dashboard
cloudinary.config({
  cloud_name: 'du1yigsdi',
  api_key: '786458528497125',
  api_secret: 'KTbQx4KYQKoHYB53Bqw0Ehsqh1o', 
});

module.exports = cloudinary;