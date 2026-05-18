const pool = require('../config/db'); // Import database connection
const cloudinary = require('../config/cloudinary'); // Import Cloudinary config

// This helper function handles streaming the file to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'company_logos' }, // Optional: organizes files in Cloudinary
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

// --- CREATE a new company profile ---
exports.createCompanyProfile = async (req, res) => {
  try {
    const { company_name, industry_type } = req.body;
    const owner_id = req.user.id;

    const newProfile = await pool.query(
      `INSERT INTO company_profile (
        owner_id, company_name, industry_type
       ) VALUES ($1, $2, $3) RETURNING id`,
      [owner_id, company_name, industry_type]
    );

    res.status(201).json({
      success: true,
      message: 'Company profile created successfully.',
      data: { company_id: newProfile.rows[0].id },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// --- GET the logged-in user's company profile ---
exports.getCompanyProfile = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const profile = await pool.query(
      'SELECT * FROM company_profile WHERE owner_id = $1',
      [owner_id]
    );

    if (profile.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Profile not found' });
    }

    res.status(200).json({
      success: true,
      data: profile.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// --- UPLOAD a company logo ---
exports.uploadLogo = async (req, res) => {
  try {
    // 1. Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    // 2. Upload the file buffer to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // 3. Get the secure URL from the Cloudinary response
    const logoUrl = result.secure_url;

    // 4. Save the new URL to the user's company profile
    await pool.query(
      'UPDATE company_profile SET company_logo_url = $1 WHERE owner_id = $2',
      [logoUrl, req.user.id]
    );

    // 5. Send a success response
    res.status(200).json({
      success: true,
      message: 'Logo uploaded successfully.',
      data: { url: logoUrl },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// --- UPDATE the company profile ---
exports.updateCompanyProfile = async (req, res) => {
  try {
    // 1. Get the fields to update from the body
    // We'll just allow editing these two for now
    const { company_name, industry_type } = req.body;

    // 2. Get the user ID from our auth middleware
    const owner_id = req.user.id;

    // 3. Run the SQL UPDATE command
    await pool.query(
      `UPDATE company_profile 
       SET company_name = $1, industry_type = $2, updated_at = CURRENT_TIMESTAMP
       WHERE owner_id = $3`,
      [company_name, industry_type, owner_id]
    );

    // 4. Send a success response
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
