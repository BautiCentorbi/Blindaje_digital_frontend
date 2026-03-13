import { RoundExecutionView } from "@/features/guard-rounds/round-execution-view";

export default async function RoundExecutionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RoundExecutionView roundId={id} />;
}
