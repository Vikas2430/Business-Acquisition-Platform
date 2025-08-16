import AIAnalysisClient from "./ai-analysis-client"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AIAnalysisPage({ params }: PageProps) {
  const { id } = await params
  return <AIAnalysisClient id={id} />
}
