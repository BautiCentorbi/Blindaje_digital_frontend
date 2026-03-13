type RoundFinalizationPanelProps = {
  observations: string;
  onChangeObservations: (value: string) => void;
  onFinish: () => void;
};

export function RoundFinalizationPanel({
  observations,
  onChangeObservations,
  onFinish,
}: RoundFinalizationPanelProps) {
  return (
    <div className="rounded-[28px] border border-emerald-200 bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <p className="text-sm font-medium text-emerald-700">Cierre de ronda</p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
        Todos los checkpoints completados
      </h3>

      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium text-[#2f2f37]">
          Observaciones generales
        </label>
        <textarea
          value={observations}
          onChange={(e) => onChangeObservations(e.target.value)}
          rows={4}
          placeholder="Observaciones finales del recorrido..."
          className="w-full rounded-2xl border border-[#dddde6] bg-white px-4 py-3 text-sm text-[#1f1f24] outline-none transition placeholder:text-[#9b9ba5] focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
        />
      </div>

      <button
        type="button"
        onClick={onFinish}
        className="mt-4 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        Finalizar ronda
      </button>
    </div>
  );
}
