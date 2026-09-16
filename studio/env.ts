function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing ${name}. Copy studio/.env.example to studio/.env and fill it in.`)
  }
  return value
}

export const projectId = required('SANITY_STUDIO_PROJECT_ID', process.env.SANITY_STUDIO_PROJECT_ID)
export const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
