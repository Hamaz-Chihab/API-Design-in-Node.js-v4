export default {
  port: process.env.PORT || 3000, // Use a fallback for missing port
  // Add other production-specific configurations here
  secrets: {
    jwt: process.env.JWT_SECRET, // Require JWT secret for production
  },
};
