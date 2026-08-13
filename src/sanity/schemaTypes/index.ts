import { type SchemaTypeDefinition } from 'sanity'
import { event } from './event'
import { news } from './news'
import { category } from './category'
import { location } from './location'
import { recruitment} from './recruitment'
import { promotion } from './promotion'
import { herobanner } from './herobanner'
import { service } from './service'
import { program } from './program'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, category, news, location, recruitment, promotion, herobanner, service, program] 
}