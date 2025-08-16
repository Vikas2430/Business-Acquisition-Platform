import DealDetailClient from "./deal-detail-client"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DealDetailPage({ params }: PageProps) {
  const { id } = await params
  return <DealDetailClient id={id} />
}
