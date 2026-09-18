import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './env'

export default defineCliConfig({
  api: { projectId, dataset },
  // Ties `npm run deploy` to massimo-russo.sanity.studio instead of prompting for a hostname
  deployment: { appId: 'ykwkhu3zln63qegf52c55ct1', autoUpdates: true },
})
