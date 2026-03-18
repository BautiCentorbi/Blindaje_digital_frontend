type Companion = {
  fullName: string;
  documentId: string;
};

type CompanionsFormProps = {
  count: number;
  companions: Companion[];
  onChangeCount: (count: number) => void;
  onChangeCompanion: (
    index: number,
    field: "fullName" | "documentId",
    value: string,
  ) => void;
};

export function CompanionsForm({
  count,
  companions,
  onChangeCount,
  onChangeCompanion,
}: CompanionsFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#2f2f37]">
          Cantidad de acompañantes
        </label>

        <select
          value={count}
          onChange={(e) => onChangeCount(Number(e.target.value))}
          className="h-12 w-full rounded-2xl border border-[#dddde6] bg-white px-4 text-sm text-[#1f1f24] outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>

      {count > 0 ? (
        <div className="space-y-3">
          {companions.slice(0, count).map((companion, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4"
            >
              <p className="text-sm font-medium text-[#1f1f24]">
                Acompañante {index + 1}
              </p>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={companion.fullName}
                  onChange={(e) =>
                    onChangeCompanion(index, "fullName", e.target.value)
                  }
                  placeholder="Nombre completo"
                  className="h-11 w-full rounded-2xl border border-[#dddde6] bg-white px-4 text-sm text-[#1f1f24] outline-none"
                />

                <input
                  type="text"
                  value={companion.documentId}
                  onChange={(e) =>
                    onChangeCompanion(index, "documentId", e.target.value)
                  }
                  placeholder="DNI"
                  className="h-11 w-full rounded-2xl border border-[#dddde6] bg-white px-4 text-sm text-[#1f1f24] outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}