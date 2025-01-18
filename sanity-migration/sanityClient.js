// sanityClient.js
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'vjqqgzvj', // Replace with your project ID
  dataset: 'production',        // Or your dataset name
  useCdn: false,                // Disable CDN for real-time updates
  token: 'skIYH9A4sJXWg1Zmyfi6FKzQHDZnYlnfIs94f34QYZdpb7TLnW1jYZnSC0YANLlXzJ2s3N30igpN3EUKPVStakW6udAaykWllgtb3NePqV7NExCdbBOp5PzLRYQ49qk52jnET1Ipn1FKVGBIKXLzc8avbilvaXVTUFKf6MhnV9fGvZe44bRQ',
});