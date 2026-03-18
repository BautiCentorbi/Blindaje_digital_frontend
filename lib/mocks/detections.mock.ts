export type DetectionType = "ocr" | "lpr" | "facial";
export type DetectionStatus = "pending_review" | "approved" | "rejected";

export type DetectionTargetType = "resident" | "authorized_visit" | "unknown";

export type DetectionItem = {
  id: string;
  type: DetectionType;
  targetType: DetectionTargetType;
  title: string;
  detectedValue: string;
  confidence: number;
  detectedAt: string;
  source: string;
  suggestedVisitId?: string;
  suggestedResidentName?: string;
  suggestedResidentUnit?: string;
  previewLabel: string;
  status: DetectionStatus;
};

export const detectionsMock: DetectionItem[] = [
  {
    id: "det-001",
    type: "ocr",
    targetType: "authorized_visit",
    title: "Documento detectado",
    detectedValue: "32145678",
    confidence: 94,
    detectedAt: "20:36",
    source: "Acceso principal",
    suggestedVisitId: "visit-001",
    previewLabel: "Coincidencia con visita autorizada",
    status: "pending_review",
  },
  {
    id: "det-002",
    type: "facial",
    targetType: "resident",
    title: "Residente detectado",
    detectedValue: "María López",
    confidence: 97,
    detectedAt: "20:38",
    source: "Cámara peatonal",
    suggestedResidentName: "María López",
    suggestedResidentUnit: "Casa 14",
    previewLabel: "Ingreso directo permitido",
    status: "pending_review",
  },
];