import BuyerProfileClient from "./buyer-profile-client"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BuyerProfilePage({ params }: PageProps) {
  const { id } = await params
  return <BuyerProfileClient id={id} />
}
