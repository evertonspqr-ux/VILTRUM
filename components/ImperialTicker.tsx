const NEWS = [
  'TERRA: PROTOCOLO DE PRÉ-ANEXAÇÃO EM 84% DE CONCLUSÃO',
  'COALITION OF PLANETS: AMEAÇA CLASSIFICADA COMO CRÍTICA',
  'AGENTE NOLAN GRAYSON: STATUS DESCONHECIDO — INVESTIGAÇÃO EM CURSO',
  'PLANETAS CONQUISTADOS: 13.480 — EXPANSÃO CONTINUA',
  'GRANDE REGENTE THRAGG: ORDEM IMPERIAL MANTIDA',
  'SCOURGE VIRUS: CONTENÇÃO CONFIRMADA — RISCO RESIDUAL MONITORADO',
  'RECRUTAMENTO SETOR TERRA: ATIVO — CANDIDATOS SENDO AVALIADOS',
  'MARK GRAYSON / INVINCIBLE: VARIÁVEL CRÍTICA — NEUTRALIZAÇÃO PENDENTE',
  'CONQUEST: EXECUTOR IMPERIAL EM CAMPO — MISSÃO CLASSIFICADA',
  'VILTRUM PRIME: SINAL IMPERIAL ESTÁVEL — COMUNICAÇÕES ATIVAS',
];

export default function ImperialTicker() {
  const repeated = [...NEWS, ...NEWS];
  return (
    <div className="w-full overflow-hidden bg-blood-red/5 border-y border-blood-red/20 py-2.5 relative z-10">
      <div className="flex animate-[ticker_50s_linear_infinite]">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[10px] text-blood-red/70 tracking-widest whitespace-nowrap px-10 flex-shrink-0"
          >
            <span className="text-blood-red mr-3">▶</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
