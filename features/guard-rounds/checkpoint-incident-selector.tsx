import type { IncidentType } from "@/lib/mocks/rounds.mock";

const incidentOptions: { value: IncidentType; label: string }[] = [
  { value: "lighting_issue", label: "Iluminación" },
  { value: "open_access", label: "Acceso abierto" },
  { value: "unknown_person", label: "Persona ajena" },
  { value: "suspicious_vehicle", label: "Vehículo sospechoso" },
  { value: "camera_offline", label: "Cámara offline" },
  { value: "obstruction", label: "Obstrucción" },
  { value: "other", label: "Otra" },
];

type CheckpointIncidentsSelectorProps = {
  selected: IncidentType[];
  onToggle: (incident: IncidentType) => void;
};

export function CheckpointIncidentsSelector({
  selected,
  onToggle,
}: CheckpointIncidentsSelectorProps) {
  return (
    <div>
      <p className="text-sm font-medium text-[#1f1f24]">Anomalías detectadas</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {incidentOptions.map((option) => {
          const active = selected.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              className={[
                "rounded-2xl border px-3 py-2 text-sm font-medium transition",
                active
                  ? "border-violet-200 bg-violet-50 text-[#6D28D9]"
                  : "border-[#e4e4ea] bg-white text-[#4f4f59] hover:border-violet-200 hover:text-[#6D28D9]",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
