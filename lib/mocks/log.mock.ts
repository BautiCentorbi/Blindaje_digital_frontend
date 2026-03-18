export type GuardLogFilter =
  | "all"
  | "operations"
  | "visits"
  | "rounds"
  | "tasks"
  | "detections";

export type GuardLogSourceType =
  | "task"
  | "round"
  | "checkpoint"
  | "visit"
  | "detection"
  | "manual_entry";

export type GuardLogPriority = "low" | "medium" | "high";
export type GuardLogCategory = Exclude<GuardLogFilter, "all">;

export type GuardLogDetail = {
  label: string;
  value: string;
};

export type GuardLogItem = {
  id: string;
  category: GuardLogCategory;
  sourceType: GuardLogSourceType;
  sourceLabel: string;
  title: string;
  summary: string;
  statusLabel: string;
  priority: GuardLogPriority;
  location: string;
  actor: string;
  reference: string;
  dateKey: string;
  timeLabel: string;
  note?: string;
  details: GuardLogDetail[];
};

export const guardLogMock: GuardLogItem[] = [
  {
    id: "log-018",
    category: "operations",
    sourceType: "manual_entry",
    sourceLabel: "Registro manual",
    title: "Se asentó novedad por portón lateral",
    summary:
      "El guardia registró una observación manual luego de una apertura excepcional para mantenimiento.",
    statusLabel: "Asentado en turno",
    priority: "medium",
    location: "Portón lateral",
    actor: "Guardia Martín Ríos",
    reference: "BIT-204",
    dateKey: "2026-03-18",
    timeLabel: "09:42",
    note:
      "Se autorizó el acceso técnico por 15 minutos y se dejó registro para el relevo.",
    details: [
      { label: "Tipo", value: "Observación manual" },
      { label: "Supervisor", value: "Coordinación de turno" },
      { label: "Resultado", value: "Sin desvíos detectados" },
      { label: "Adjunto", value: "Sin evidencia" },
    ],
  },
  {
    id: "log-017",
    category: "detections",
    sourceType: "detection",
    sourceLabel: "Detección",
    title: "Lectura LPR pendiente de validación",
    summary:
      "La cámara del acceso vehicular detectó una patente no asociada a una visita activa.",
    statusLabel: "Pendiente de revisión",
    priority: "high",
    location: "Acceso vehicular norte",
    actor: "Cámara LPR 02",
    reference: "DET-782",
    dateKey: "2026-03-18",
    timeLabel: "09:28",
    note: "Se recomienda confirmar destino antes de habilitar ingreso.",
    details: [
      { label: "Patente", value: "AE 548 QL" },
      { label: "Confianza", value: "94%" },
      { label: "Flujo", value: "Vehicular" },
      { label: "Estado", value: "Esperando decisión" },
    ],
  },
  {
    id: "log-016",
    category: "visits",
    sourceType: "visit",
    sourceLabel: "Visita",
    title: "Ingreso aprobado para proveedor de ascensores",
    summary:
      "Se autorizó el acceso del técnico programado y quedó vinculado al residente responsable.",
    statusLabel: "Ingreso habilitado",
    priority: "medium",
    location: "Recepción principal",
    actor: "Guardia Paula Sosa",
    reference: "VIS-138",
    dateKey: "2026-03-18",
    timeLabel: "09:11",
    details: [
      { label: "Visitante", value: "Fernando Leiva" },
      { label: "Documento", value: "DNI 28.441.552" },
      { label: "Destino", value: "Torre B · Sala de máquinas" },
      { label: "Residente", value: "Administración técnica" },
    ],
  },
  {
    id: "log-015",
    category: "rounds",
    sourceType: "checkpoint",
    sourceLabel: "Checkpoint",
    title: "Checkpoint completado en perímetro sur",
    summary:
      "La ronda activa registró control correcto del perímetro y cierre sin incidentes.",
    statusLabel: "Control completado",
    priority: "low",
    location: "Perímetro sur",
    actor: "Ronda 03",
    reference: "CHK-312",
    dateKey: "2026-03-18",
    timeLabel: "08:56",
    details: [
      { label: "Ronda asociada", value: "Ronda perimetral mañana" },
      { label: "Método", value: "QR + geolocalización" },
      { label: "Resultado", value: "Sin novedades" },
      { label: "Tiempo", value: "1 min 12 s" },
    ],
  },
  {
    id: "log-014",
    category: "tasks",
    sourceType: "task",
    sourceLabel: "Tarea",
    title: "Tarea iniciada: control de matafuegos",
    summary:
      "Se comenzó la verificación programada de matafuegos en el bloque administrativo.",
    statusLabel: "En progreso",
    priority: "medium",
    location: "Bloque administrativo",
    actor: "Guardia Martín Ríos",
    reference: "TAR-071",
    dateKey: "2026-03-18",
    timeLabel: "08:37",
    details: [
      { label: "Prioridad operativa", value: "Media" },
      { label: "Ventana", value: "08:30 - 09:15" },
      { label: "Checklist", value: "6 puntos" },
      { label: "Cobertura", value: "Planta baja y primer piso" },
    ],
  },
  {
    id: "log-013",
    category: "rounds",
    sourceType: "round",
    sourceLabel: "Ronda",
    title: "Ronda perimetral iniciada",
    summary:
      "Se activó el recorrido de apertura con checkpoints sobre perímetro, acceso vehicular y sala de bombas.",
    statusLabel: "Ronda activa",
    priority: "high",
    location: "Circuito perimetral",
    actor: "Guardia Paula Sosa",
    reference: "RON-203",
    dateKey: "2026-03-18",
    timeLabel: "08:15",
    details: [
      { label: "Duración estimada", value: "25 min" },
      { label: "Checkpoints", value: "5 estaciones" },
      { label: "Turno", value: "Mañana" },
      { label: "Estado", value: "En ejecución" },
    ],
  },
  {
    id: "log-012",
    category: "operations",
    sourceType: "manual_entry",
    sourceLabel: "Registro manual",
    title: "Se dejó constancia por barrera con demora",
    summary:
      "El equipo reportó una demora breve en la barrera de salida y registró seguimiento preventivo.",
    statusLabel: "Seguimiento preventivo",
    priority: "medium",
    location: "Salida vehicular",
    actor: "Guardia Paula Sosa",
    reference: "BIT-203",
    dateKey: "2026-03-18",
    timeLabel: "07:58",
    note: "Mantenimiento avisado. No afectó circulación interna.",
    details: [
      { label: "Tiempo de demora", value: "3 minutos" },
      { label: "Impacto", value: "Bajo" },
      { label: "Notificación", value: "Mantenimiento interno" },
      { label: "Cierre", value: "Normalizado" },
    ],
  },
  {
    id: "log-011",
    category: "visits",
    sourceType: "visit",
    sourceLabel: "Visita",
    title: "Egreso confirmado de visita familiar",
    summary:
      "Se registró la salida del visitante sin observaciones y con horario dentro de la franja prevista.",
    statusLabel: "Finalizada",
    priority: "low",
    location: "Recepción principal",
    actor: "Guardia Martín Ríos",
    reference: "VIS-137",
    dateKey: "2026-03-18",
    timeLabel: "07:41",
    details: [
      { label: "Visitante", value: "Andrea Molina" },
      { label: "Destino", value: "Casa 22" },
      { label: "Ingreso", value: "06:48" },
      { label: "Salida", value: "07:41" },
    ],
  },
  {
    id: "log-010",
    category: "tasks",
    sourceType: "task",
    sourceLabel: "Tarea",
    title: "Tarea completada: apertura de amenities",
    summary:
      "Quedó finalizada la rutina de apertura y control visual en gimnasio y SUM.",
    statusLabel: "Completada",
    priority: "low",
    location: "Amenities",
    actor: "Guardia Paula Sosa",
    reference: "TAR-069",
    dateKey: "2026-03-18",
    timeLabel: "07:18",
    details: [
      { label: "Prioridad operativa", value: "Alta" },
      { label: "Checklist", value: "Apertura validada" },
      { label: "Resultado", value: "Sin observaciones" },
      { label: "Cierre", value: "Espacios habilitados" },
    ],
  },
  {
    id: "log-009",
    category: "operations",
    sourceType: "manual_entry",
    sourceLabel: "Registro manual",
    title: "Cambio de guardia asentado",
    summary:
      "Se registró el traspaso de novedades entre turnos con observaciones operativas del acceso norte.",
    statusLabel: "Relevo confirmado",
    priority: "medium",
    location: "Puesto central",
    actor: "Supervisor de turno",
    reference: "BIT-202",
    dateKey: "2026-03-17",
    timeLabel: "22:04",
    details: [
      { label: "Turno saliente", value: "Tarde" },
      { label: "Turno entrante", value: "Noche" },
      { label: "Pendientes", value: "1 seguimiento vehicular" },
      { label: "Estado general", value: "Operativo" },
    ],
  },
  {
    id: "log-008",
    category: "detections",
    sourceType: "detection",
    sourceLabel: "Detección",
    title: "Reconocimiento facial validado para residente",
    summary:
      "El acceso peatonal registró coincidencia positiva y apertura automática dentro de umbrales permitidos.",
    statusLabel: "Aprobada",
    priority: "low",
    location: "Acceso peatonal oeste",
    actor: "Sensor FAC 01",
    reference: "DET-781",
    dateKey: "2026-03-17",
    timeLabel: "21:26",
    details: [
      { label: "Coincidencia", value: "98%" },
      { label: "Perfil", value: "Residente autorizado" },
      { label: "Modo", value: "Apertura automática" },
      { label: "Observación", value: "Sin revisión manual" },
    ],
  },
  {
    id: "log-007",
    category: "rounds",
    sourceType: "checkpoint",
    sourceLabel: "Checkpoint",
    title: "Checkpoint con observación en sala de bombas",
    summary:
      "Se dejó constancia por vibración atípica durante el paso de la ronda nocturna.",
    statusLabel: "Con novedad",
    priority: "high",
    location: "Sala de bombas",
    actor: "Ronda nocturna",
    reference: "CHK-309",
    dateKey: "2026-03-17",
    timeLabel: "20:54",
    note: "Se sugirió revisión técnica al inicio del siguiente turno.",
    details: [
      { label: "Ronda asociada", value: "Nocturna interior" },
      { label: "Condición", value: "Ruido intermitente" },
      { label: "Acción", value: "Se notificó al relevo" },
      { label: "Evidencia", value: "Sin foto adjunta" },
    ],
  },
  {
    id: "log-006",
    category: "visits",
    sourceType: "visit",
    sourceLabel: "Visita",
    title: "Ingreso rechazado por documentación incompleta",
    summary:
      "No se habilitó el acceso por falta de coincidencia entre documento presentado y visita anunciada.",
    statusLabel: "Rechazada",
    priority: "high",
    location: "Recepción principal",
    actor: "Guardia Martín Ríos",
    reference: "VIS-136",
    dateKey: "2026-03-17",
    timeLabel: "20:17",
    details: [
      { label: "Visitante", value: "Matías Ferreyra" },
      { label: "Documento", value: "DNI no coincidente" },
      { label: "Destino declarado", value: "Casa 14" },
      { label: "Resultado", value: "Acceso denegado" },
    ],
  },
];
