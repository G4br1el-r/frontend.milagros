interface StatusPresentation {
  label: string;
  tone: string;
}

const STATUS_MAP: Record<string, StatusPresentation> = {
  salvolocal: { label: "Processando", tone: "text-amber-700 bg-amber-50" },
  faturado: { label: "Faturado", tone: "text-emerald-700 bg-emerald-50" },
  concluido: { label: "Concluído", tone: "text-emerald-700 bg-emerald-50" },
  concluído: { label: "Concluído", tone: "text-emerald-700 bg-emerald-50" },
  cancelado: { label: "Cancelado", tone: "text-primary/50 bg-primary/5" },
  cancelada: { label: "Cancelado", tone: "text-primary/50 bg-primary/5" },
};

/** Traduz o status cru da API para um rótulo amigável; desconhecido cai num badge neutro com o texto original. */
export function presentOrderStatus(status: string | null): StatusPresentation {
  if (!status)
    return { label: "Em andamento", tone: "text-primary/60 bg-primary/5" };

  const found = STATUS_MAP[status.trim().toLowerCase()];
  return found ?? { label: status, tone: "text-primary/60 bg-primary/5" };
}
