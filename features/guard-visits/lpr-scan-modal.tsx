"use client";

import { X, CarFront } from "lucide-react";

export type LprResult = {
  plate: string;
};

type LprScanModalProps = {
  open: boolean;
  onClose: () => void;
  onUseData: (data: LprResult) => void;
};

const mockLprResult: LprResult = {
  plate: "AB123CD",
};

export function LprScanModal({
  open,
  onClose,
  onUseData,
}: LprScanModalProps) {
  if (!open) return null;

  function handleUse() {
    onUseData(mockLprResult);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#18181b]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6D28D9]">LPR</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
              Patente detectada
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#666670]">
              Simulación de lectura automática de dominio vehicular.
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
            <CarFront className="h-5 w-5" />
            <span className="text-sm font-medium">Lectura LPR simulada</span>
          </div>

          <div className="rounded-[20px] border border-[#d7d7e2] bg-white p-6 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a8a95]">
              Dominio detectado
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-[0.2em] text-[#18181b]">
              {mockLprResult.plate}
            </p>
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
            Usar patente
          </button>
        </div>
      </div>
    </div>
  );
}