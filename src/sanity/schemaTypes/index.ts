import { type SchemaTypeDefinition } from 'sanity'
import { event } from './event' // <-- Ubah import ke file event
import { news } from './news' // <-- Ubah import ke file news
import { category } from './category' // <-- Ubah import ke file category

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, category, news] // <-- Masukkan event ke dalam array, 
}