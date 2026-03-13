type CheckpointEvidencePanelProps = {
  evidenceCount: number;
  onAddEvidence: () => void;
};

export function CheckpointEvidencePanel({
  evidenceCount,
  onAddEvidence,
}: CheckpointEvidencePanelProps) {
  return (
    <div className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
      <p className="text-sm font-medium text-[#1f1f24]">Evidencia</p>
      <p className="mt-2 text-sm text-[#666670]">
        Archivos adjuntos en este checkpoint: {evidenceCount}
      </p>

      <button
        type="button"
        onClick={onAddEvidence}
        className="mt-4 rounded-2xl border border-[#e4e4ea] bg-white px-4 py-2.5 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
      >
        Adjuntar evidencia
      </button>
    </div>
  );
}
