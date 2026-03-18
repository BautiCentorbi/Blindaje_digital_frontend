"use client";

import { useEffect, useState } from "react";
import { X, ScanText } from "lucide-react";

export type OcrDniResult = {
  firstName: string;
  lastName: string;
  documentId: string;
};

type OcrScanModalProps = {
  open: boolean;
  onClose: () => void;
  onUseData: (data: OcrDniResult) => void;
};

const mockDniResult: OcrDniResult = {
  firstName: "Silvina",
  lastName: "Juárez",
  documentId: "32145678",
};

export function OcrScanModal({
  open,
  onClose,
  onUseData,
}: OcrScanModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  function handleUse() {
    onUseData(mockDniResult);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#18181b]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6D28D9]">OCR DNI</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
              Documento detectado
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#666670]">
              Vista previa del documento capturado. Podés usar los datos ahora o
              cerrar manualmente.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e4e4ea] bg-white text-[#4f4f59]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 rounded-[24px] border border-[#e7e7ee] bg-[linear-gradient(180deg,#fafafe_0%,#f3f3f8_100%)] p-5">
          <div className="mb-4 flex items-center gap-2 text-[#6D28D9]">
            <ScanText className="h-5 w-5" />
            <span className="text-sm font-medium">Lectura OCR simulada</span>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[20px] border border-[#d7d7e2] bg-white p-4 shadow-sm">
              <div className="aspect-[1.6/1] rounded-[16px] border border-dashed border-[#d9d9e3] bg-[#f9f9fc] p-4">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6D28D9]">
                      República Argentina
                    </span>
                    <span className="text-[10px] text-[#8a8a95]">DNI</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-[#8a8a95]">Apellido / Nombre</p>
                    <p className="text-lg font-semibold tracking-[-0.02em] text-[#18181b]">
                      {mockDniResult.lastName}, {mockDniResult.firstName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-[#8a8a95]">Documento</p>
                      <p className="text-sm font-medium text-[#18181b]">
                        {mockDniResult.documentId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8a8a95]">Estado</p>
                      <p className="text-sm font-medium text-emerald-700">
                        Detectado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-[#e7e7ee] bg-white p-4">
              <p className="text-sm font-medium text-[#1f1f24]">
                Datos reconocidos
              </p>

              <div className="mt-4 space-y-3">
                <InfoRow label="Nombre" value={mockDniResult.firstName} />
                <InfoRow label="Apellido" value={mockDniResult.lastName} />
                <InfoRow label="DNI" value={mockDniResult.documentId} />
              </div>

              <p className="mt-4 text-xs text-[#8a8a95]">
                Cierre automático estimado: {secondsLeft}s
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-[#e4e4ea] bg-white px-4 py-3 text-sm font-medium text-[#4f4f59]"
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={handleUse}
            className="rounded-2xl bg-[#6D28D9] px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            Usar datos OCR
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-[#1f1f24]">{value}</p>
    </div>
  );
}
