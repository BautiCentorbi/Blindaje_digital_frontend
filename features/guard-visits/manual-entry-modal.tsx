"use client";

import { useMemo, useState } from "react";
import { X, ScanText, CarFront } from "lucide-react";
import { OcrScanModal, type OcrDniResult } from "./ocr-scan-modal";
import { LprScanModal, type LprResult } from "./lpr-scan-modal";
import { CompanionsForm } from "./companions-form";

type ResidentOption = {
  id: string;
  label: string;
};

export type ManualEntryPayload = {
  entryType: "pedestrian" | "vehicle";
  firstName: string;
  lastName: string;
  documentId: string;
  residentId: string;
  residentLabel: string;
  companions: {
    fullName: string;
    documentId: string;
  }[];
  vehiclePlate?: string;
  driverLicenseNumber?: string;
};

type ManualEntryModalProps = {
  open: boolean;
  residents: ResidentOption[];
  onClose: () => void;
  onSubmit: (payload: ManualEntryPayload) => void;
};

const emptyCompanions = [
  { fullName: "", documentId: "" },
  { fullName: "", documentId: "" },
  { fullName: "", documentId: "" },
  { fullName: "", documentId: "" },
];

export function ManualEntryModal({
  open,
  residents,
  onClose,
  onSubmit,
}: ManualEntryModalProps) {
  const [entryType, setEntryType] = useState<"pedestrian" | "vehicle">(
    "pedestrian",
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [residentId, setResidentId] = useState("");
  const [companionsCount, setCompanionsCount] = useState(0);
  const [companions, setCompanions] = useState(emptyCompanions);
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [driverLicenseNumber, setDriverLicenseNumber] = useState("");
  const [isOcrOpen, setIsOcrOpen] = useState(false);
  const [isLprOpen, setIsLprOpen] = useState(false);

  const selectedResident = useMemo(
    () => residents.find((resident) => resident.id === residentId) ?? null,
    [residentId, residents],
  );
  const isVehicleEntry = entryType === "vehicle";
  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    documentId.trim().length > 0 &&
    residentId.trim().length > 0 &&
    (!isVehicleEntry ||
      (vehiclePlate.trim().length > 0 &&
        driverLicenseNumber.trim().length > 0));

  if (!open) return null;

  function handleClose() {
    onClose();
  }

  function handleUseOcr(data: OcrDniResult) {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setDocumentId(data.documentId);
  }

  function handleUseLpr(data: LprResult) {
    setVehiclePlate(data.plate);
  }

  function handleChangeCompanion(
    index: number,
    field: "fullName" | "documentId",
    value: string,
  ) {
    setCompanions((current) =>
      current.map((companion, companionIndex) =>
        companionIndex === index
          ? { ...companion, [field]: value }
          : companion,
      ),
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) return;

    const companionsPayload = companions
      .slice(0, companionsCount)
      .filter(
        (companion) => companion.fullName.trim() && companion.documentId.trim(),
      );

    onSubmit({
      entryType,
      firstName,
      lastName,
      documentId,
      residentId,
      residentLabel: selectedResident?.label ?? "",
      companions: companionsPayload,
      vehiclePlate: isVehicleEntry ? vehiclePlate : undefined,
      driverLicenseNumber: isVehicleEntry ? driverLicenseNumber : undefined,
    });

    onClose();
  }

  return (
    <>
      <div className="fixed inset-0 z-[55] flex items-center justify-center bg-[#18181b]/40 p-4 backdrop-blur-sm">
        <div className="w-full max-w-4xl rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#6D28D9]">Nuevo ingreso</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
                Alta manual asistida
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#666670]">
                Registro operativo con OCR DNI, LPR y carga de acompañantes.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e4e4ea] bg-white text-[#4f4f59]"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form
            className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]"
            onSubmit={handleSubmit}
          >
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setEntryType("pedestrian")}
                  className={[
                    "rounded-2xl border px-4 py-4 text-left transition",
                    entryType === "pedestrian"
                      ? "border-violet-200 bg-violet-50"
                      : "border-[#e4e4ea] bg-white",
                  ].join(" ")}
                >
                  <p className="text-sm font-medium text-[#1f1f24]">Peatonal</p>
                  <p className="mt-1 text-sm text-[#666670]">Ingreso sin vehículo</p>
                </button>

                <button
                  type="button"
                  onClick={() => setEntryType("vehicle")}
                  className={[
                    "rounded-2xl border px-4 py-4 text-left transition",
                    entryType === "vehicle"
                      ? "border-violet-200 bg-violet-50"
                      : "border-[#e4e4ea] bg-white",
                  ].join(" ")}
                >
                  <p className="text-sm font-medium text-[#1f1f24]">Vehicular</p>
                  <p className="mt-1 text-sm text-[#666670]">Con dominio y licencia</p>
                </button>
              </div>

              <div className="rounded-[24px] border border-[#efeff4] bg-[#fafafe] p-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOcrOpen(true)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#6D28D9] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
                  >
                    <ScanText className="h-4 w-4" />
                    Escanear DNI
                  </button>

                  {isVehicleEntry ? (
                    <button
                      type="button"
                      onClick={() => setIsLprOpen(true)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#e4e4ea] bg-white px-4 py-2.5 text-sm font-medium text-[#4f4f59]"
                    >
                      <CarFront className="h-4 w-4" />
                      Detectar patente
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Nombre"
                  value={firstName}
                  onChange={setFirstName}
                  required
                />
                <InputField
                  label="Apellido"
                  value={lastName}
                  onChange={setLastName}
                  required
                />
                <InputField
                  label="DNI"
                  value={documentId}
                  onChange={setDocumentId}
                  required
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2f2f37]">
                    A quién visita
                  </label>
                  <select
                    required
                    value={residentId}
                    onChange={(e) => setResidentId(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#dddde6] bg-white px-4 text-sm text-[#1f1f24] outline-none"
                  >
                    <option value="">Seleccionar residente</option>
                    {residents.map((resident) => (
                      <option key={resident.id} value={resident.id}>
                        {resident.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isVehicleEntry ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField
                    label="Patente / dominio"
                    value={vehiclePlate}
                    onChange={setVehiclePlate}
                    required
                  />
                  <InputField
                    label="Licencia de conducir"
                    value={driverLicenseNumber}
                    onChange={setDriverLicenseNumber}
                    required
                  />
                </div>
              ) : null}

              <CompanionsForm
                count={companionsCount}
                companions={companions}
                onChangeCount={setCompanionsCount}
                onChangeCompanion={handleChangeCompanion}
              />
            </div>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-[#efeff4] bg-[#fafafe] p-5">
                <p className="text-sm font-medium text-[#6D28D9]">Resumen</p>
                <div className="mt-4 space-y-3 text-sm text-[#4f4f59]">
                  <p>
                    <span className="font-medium">Tipo:</span>{" "}
                    {isVehicleEntry ? "Vehicular" : "Peatonal"}
                  </p>
                  <p>
                    <span className="font-medium">Principal:</span>{" "}
                    {[firstName, lastName].filter(Boolean).join(" ") || "Sin datos"}
                  </p>
                  <p>
                    <span className="font-medium">DNI:</span>{" "}
                    {documentId || "Sin dato"}
                  </p>
                  <p>
                    <span className="font-medium">Residente:</span>{" "}
                    {selectedResident?.label || "Sin seleccionar"}
                  </p>
                  {isVehicleEntry ? (
                    <>
                      <p>
                        <span className="font-medium">Patente:</span>{" "}
                        {vehiclePlate || "Sin dato"}
                      </p>
                      <p>
                        <span className="font-medium">Licencia:</span>{" "}
                        {driverLicenseNumber || "Sin dato"}
                      </p>
                    </>
                  ) : null}
                  <p>
                    <span className="font-medium">Acompañantes:</span>{" "}
                    {companionsCount}
                  </p>
                </div>
              </div>

              {!canSubmit ? (
                <p className="text-sm text-[#666670]">
                  Completá nombre, apellido, DNI y residente para registrar la visita.
                  {isVehicleEntry
                    ? " En ingresos vehiculares también se requiere patente y licencia."
                    : ""}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-2xl bg-[#6D28D9] px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Registrar visita
              </button>
            </div>
          </form>
        </div>
      </div>

      <OcrScanModal
        key={isOcrOpen ? "ocr-open" : "ocr-closed"}
        open={isOcrOpen}
        onClose={() => setIsOcrOpen(false)}
        onUseData={handleUseOcr}
      />

      <LprScanModal
        open={isLprOpen}
        onClose={() => setIsLprOpen(false)}
        onUseData={handleUseLpr}
      />
    </>
  );
}

function InputField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#2f2f37]">{label}</label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-2xl border border-[#dddde6] bg-white px-4 text-sm text-[#1f1f24] outline-none"
      />
    </div>
  );
}
