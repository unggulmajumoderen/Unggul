import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Diubah ke false agar perubahan di Sanity (seperti unpublish) langsung real-time di website
})
