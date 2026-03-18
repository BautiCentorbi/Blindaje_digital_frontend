"use client";

import { ScanText, CarFront, ScanFace, Eye } from "lucide-react";
import type { DetectionItem } from "@/lib/mocks/detections.mock";

type DetectionsPanelProps = {
  detections: DetectionItem[];
  onReview: (detectionId: string) => void;
};

export function DetectionsPanel({
  detections,
  onReview,
}: DetectionsPanelProps) {
  return (
    <article className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <p className="text-sm font-medium text-[#6D28D9]">Detecciones automáticas</p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
        OCR · LPR · Facial
      </h3>

      <div className="mt-4 space-y-3">
        {detections.map((detection) => (
          <div
            key={detection.id}
            className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-[#6D28D9]">
                  <DetectionIcon type={detection.type} />
                </div>

                <div>
                  <p className="text-sm font-medium text-[#1f1f24]">
                    {detection.title}
                  </p>
                  <p className="mt-1 text-sm text-[#666670]">
                    {detection.detectedValue}
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                Revisar
              </span>
            </div>

            <div className="mt-3 space-y-1 text-xs text-[#7b7b86]">
              <p>Fuente: {detection.source}</p>
              <p>Confianza: {detection.confidence}%</p>
              <p>Hora: {detection.detectedAt}</p>
            </div>

            <button
              type="button"
              onClick={() => onReview(detection.id)}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[#e4e4ea] bg-white px-3 py-2 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
            >
              <Eye className="h-4 w-4" />
              Revisar detección
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}

function DetectionIcon({ type }: { type: DetectionItem["type"] }) {
  if (type === "ocr") return <ScanText className="h-5 w-5" />;
  if (type === "lpr") return <CarFront className="h-5 w-5" />;
  return <ScanFace className="h-5 w-5" />;
}