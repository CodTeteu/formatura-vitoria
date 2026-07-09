import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Phone,
  User,
  Users,
  CheckCircle2,
  Calendar,
  MessageSquare,
  GraduationCap
} from "lucide-react";
import { toast } from "sonner";
import { rsvpSchema, type RSVPInput } from "@shared/schemas";
import { inviteData, buildWhatsAppMessage, defaultSource, eventSlug } from "@/config/invite";
import { submitRsvp } from "@/lib/api";
import { queueFailedSubmission } from "@/lib/pending-rsvp";
import { formatPhone } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";


const defaultValues: RSVPInput = {
  guest_name: "",
  phone: "",
  attendance_status: "attending",
  companions_count: 0,
  companions_names: [],
  notes: "",
  acknowledged_guidelines: true,
  source: defaultSource,
  event_slug: eventSlug,
};



export function RSVPSection() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<RSVPInput | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RSVPInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues,
  });

  const attendanceStatus = useWatch({
    control,
    name: "attendance_status",
  });
  const companionsCount = Number(
    useWatch({
      control,
      name: "companions_count",
    }) || 0,
  );
  const phoneValue =
    useWatch({
      control,
      name: "phone",
    }) || "";
  const maxCompanions = inviteData.rsvp.maxCompanions;

  useEffect(() => {
    const currentNames = getValues("companions_names") ?? [];
    const currentCount = Number(getValues("companions_count") || 0);

    if (attendanceStatus === "not-attending") {
      if (currentCount !== 0) {
        setValue("companions_count", 0);
      }
      if (currentNames.length !== 0) {
        setValue("companions_names", []);
      }
      return;
    }

    if (currentCount > maxCompanions) {
      setValue("companions_count", maxCompanions);
      return;
    }

    if (currentNames.length !== companionsCount) {
      setValue(
        "companions_names",
        Array.from({ length: companionsCount }, (_, index) => currentNames[index] ?? ""),
      );
    }
  }, [attendanceStatus, companionsCount, getValues, maxCompanions, setValue]);

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleDropdownChange = (val: string) => {
    setSelectedOption(val);
    switch (val) {
      case "missa":
        setSelectedEvents(["Missa de Formatura"]);
        break;
      case "colacao":
        setSelectedEvents(["Colação de Grau"]);
        break;
      case "festa":
        setSelectedEvents(["Festa de Formatura"]);
        break;
      case "missa_colacao":
        setSelectedEvents(["Missa de Formatura", "Colação de Grau"]);
        break;
      case "missa_festa":
        setSelectedEvents(["Missa de Formatura", "Festa de Formatura"]);
        break;
      case "colacao_festa":
        setSelectedEvents(["Colação de Grau", "Festa de Formatura"]);
        break;
      case "all":
        setSelectedEvents(["Missa de Formatura", "Colação de Grau", "Festa de Formatura"]);
        break;
      case "":
      default:
        setSelectedEvents([]);
        break;
    }
  };



  async function onSubmit(values: RSVPInput) {
    if (attendanceStatus === "attending" && selectedEvents.length === 0) {
      toast.error("Por favor, selecione pelo menos um evento para comparecer.");
      return;
    }

    setLoading(true);
    try {
      // Build notes string from selected events and optional message
      const eventsStr = attendanceStatus === "attending"
        ? `Eventos: ${selectedEvents.join(", ")}`
        : "Não comparecerá";
      
      const notePayload = values.notes
        ? `${eventsStr}. Recado: ${values.notes}`
        : eventsStr;

      const payload = rsvpSchema.parse({
        ...values,
        notes: notePayload.slice(0, 500),
        source: defaultSource,
        event_slug: eventSlug,
      });

      await submitRsvp(payload);
      setSubmittedData(payload);
      setStep("success");
      
      toast.success("Presença registrada com sucesso!");
    } catch (err) {
      console.error(err);
      const payload = rsvpSchema.parse({
        ...getValues(),
        source: defaultSource,
        event_slug: eventSlug,
      });
      queueFailedSubmission(payload);
      
      toast.error(
        "Servidor instável. Salvamos seus dados localmente e tentaremos enviar de forma automática em segundo plano.",
        { duration: 8000 }
      );
    } finally {
      setLoading(false);
    }
  }

  const handleWhatsAppRedirect = () => {
    if (!submittedData) return;
    
    // Customize companions names filter
    const activeCompanions = submittedData.companions_names?.filter((n) => n.trim() !== "") || [];
    
    const message = buildWhatsAppMessage({
      name: submittedData.guest_name,
      attendance: submittedData.attendance_status,
      companionsNames: activeCompanions,
    });
    
    const finalMsg = submittedData.attendance_status === "attending"
      ? `${message}\nEventos: ${selectedEvents.join(", ")}`
      : message;

    const whatsappUrl = `https://wa.me/${inviteData.rsvp.whatsappIntl}?text=${encodeURIComponent(finalMsg)}`;
    window.location.assign(whatsappUrl);
  };

  return (
    <section className="invite-section !pt-8 sm:!pt-12" id="rsvp">
      <div className="invite-container">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            align="center"
            description={inviteData.rsvp.description}
            label={inviteData.rsvp.label}
            title={inviteData.rsvp.title}
          />
        </div>

        <Reveal className="invite-card mx-auto mt-12 max-w-3xl px-5 py-6 sm:px-8 sm:py-9 overflow-hidden" delay={0.08}>
          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-[24px] border border-[var(--invite-line)] bg-[var(--invite-sage-soft)]/10 p-5 mb-8 max-w-md mx-auto">
                  <p className="font-heading text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[var(--invite-brown)] text-center mb-4">
                    Datas dos Eventos
                  </p>
                  
                  <div className="space-y-2.5">
                    {/* MISSA */}
                    <div className="flex items-center justify-between bg-[var(--invite-paper)] rounded-[16px] border border-[var(--invite-line)]/60 px-4 py-2.5 shadow-sm">
                      <div className="flex items-center">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[var(--invite-sage-soft)]/50 mr-3 shrink-0 text-[var(--invite-brown)]">
                          <Calendar className="size-4" />
                        </div>
                        <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--invite-brown)]">
                          Missa
                        </span>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="font-heading text-sm sm:text-base font-bold text-[var(--invite-brown)] leading-none mb-0.5">
                          10/08
                        </span>
                        <span className="font-body text-xs text-[var(--invite-brown-soft)]/80 font-medium">
                          19h00
                        </span>
                      </div>
                    </div>

                    {/* COLAÇÃO */}
                    <div className="flex items-center justify-between bg-[var(--invite-paper)] rounded-[16px] border border-[var(--invite-line)]/60 px-4 py-2.5 shadow-sm">
                      <div className="flex items-center">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[var(--invite-sage-soft)]/50 mr-3 shrink-0 text-[var(--invite-brown)]">
                          <GraduationCap className="size-4" />
                        </div>
                        <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--invite-brown)]">
                          Colação
                        </span>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="font-heading text-sm sm:text-base font-bold text-[var(--invite-brown)] leading-none mb-0.5">
                          11/08
                        </span>
                        <span className="font-body text-xs text-[var(--invite-brown-soft)]/80 font-medium">
                          19h30
                        </span>
                      </div>
                    </div>

                    {/* FESTA */}
                    <div className="flex items-center justify-between bg-[var(--invite-paper)] rounded-[16px] border border-[var(--invite-line)]/60 px-4 py-2.5 shadow-sm">
                      <div className="flex items-center">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[var(--invite-sage-soft)]/50 mr-3 shrink-0 text-[var(--invite-brown)]">
                          <Calendar className="size-4" />
                        </div>
                        <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--invite-brown)]">
                          Festa
                        </span>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="font-heading text-sm sm:text-base font-bold text-[var(--invite-brown)] leading-none mb-0.5">
                          22/08
                        </span>
                        <span className="font-body text-xs text-[var(--invite-brown-soft)]/80 font-medium">
                          12h00
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 font-body text-xs font-semibold text-[var(--invite-brown-soft)] mt-4">
                    <Calendar className="size-3.5 text-[var(--invite-gold)]" />
                    <span>Confirme até 10/08/2026</span>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  {/* SEUS DADOS */}
                  <div>
                    <div className="mb-3">
                      <h3 className="font-heading text-lg text-[var(--invite-brown)] font-bold">Seus Dados</h3>
                      <hr className="mt-1.5 border-[var(--invite-line)]" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="mb-1 flex items-center gap-2 font-sans text-xs text-[var(--invite-brown-soft)] font-bold uppercase tracking-wider">
                          <User className="size-3.5 text-[var(--invite-gold)]" />
                          Nome Completo <span className="text-rose-400">*</span>
                        </label>
                        <input
                          className="w-full rounded-[12px] border border-[var(--invite-line)] bg-transparent px-4 py-2.5 text-sm text-[var(--invite-brown)] outline-none transition focus:border-[var(--invite-gold)] focus:bg-[var(--invite-cream)]"
                          placeholder="Seu nome completo"
                          {...register("guest_name")}
                        />
                        {errors.guest_name ? (
                          <p className="mt-1.5 text-xs text-rose-600">{errors.guest_name.message}</p>
                        ) : null}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-1 flex items-center gap-2 font-sans text-xs text-[var(--invite-brown-soft)] font-bold uppercase tracking-wider">
                          <Phone className="size-3.5 text-[var(--invite-gold)]" />
                          Celular / WhatsApp <span className="text-rose-400">*</span>
                        </label>
                        <input
                          className="w-full rounded-[12px] border border-[var(--invite-line)] bg-transparent px-4 py-2.5 text-sm text-[var(--invite-brown)] outline-none transition focus:border-[var(--invite-gold)] focus:bg-[var(--invite-cream)]"
                          placeholder="(00) 00000-0000"
                          {...register("phone")}
                          onChange={(event) => {
                            setValue("phone", formatPhone(event.target.value));
                          }}
                          value={phoneValue}
                        />
                        {errors.phone ? (
                          <p className="mt-1.5 text-xs text-rose-600">{errors.phone.message}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* PARTICIPAÇÃO */}
                  <div>
                    <div className="mb-3">
                      <h3 className="font-heading text-lg text-[var(--invite-brown)] font-bold">Participação</h3>
                      <hr className="mt-1.5 border-[var(--invite-line)]" />
                    </div>
                    <div className="rounded-[16px] bg-[var(--invite-sage-soft)]/10 border border-[var(--invite-line)] p-4">
                      <p className="mb-3 font-sans text-xs font-semibold text-[var(--invite-brown-soft)]/90 uppercase tracking-wider">
                        Você poderá comparecer aos eventos de formatura?
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <label className="cursor-pointer">
                          <input className="peer sr-only" type="radio" value="attending" {...register("attendance_status")} />
                          <span className="flex min-w-[110px] items-center justify-center rounded-full border border-[var(--invite-line)] bg-white px-5 py-2 font-heading text-sm text-[var(--invite-brown)] transition hover:bg-[var(--invite-sage-soft)]/20 peer-checked:border-[var(--invite-gold)] peer-checked:bg-[var(--invite-sage-soft)]/30 peer-checked:shadow-sm">
                            Sim, com certeza!
                          </span>
                        </label>
                        <label className="cursor-pointer">
                          <input className="peer sr-only" type="radio" value="not-attending" {...register("attendance_status")} />
                          <span className="flex min-w-[110px] items-center justify-center rounded-full border border-[var(--invite-line)] bg-white px-5 py-2 font-heading text-sm text-[var(--invite-brown)] transition hover:bg-[var(--invite-sage-soft)]/20 peer-checked:border-slate-500 peer-checked:bg-slate-100 peer-checked:shadow-sm">
                            Não poderei ir
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* SELEÇÃO DE EVENTOS */}
                  {attendanceStatus === "attending" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-3">
                        <h3 className="font-heading text-lg text-[var(--invite-brown)] font-bold flex items-center gap-2">
                          <Calendar className="size-4.5 text-[var(--invite-gold)]" />
                          Selecione os Eventos
                        </h3>
                        <hr className="mt-1.5 border-[var(--invite-line)]" />
                      </div>
                      
                      <p className="mb-3 font-body text-xs text-[var(--invite-brown-soft)] italic">
                        Selecione os eventos que você e seus acompanhantes comparecerão.
                      </p>

                      <div>
                        <select
                          value={selectedOption}
                          onChange={(e) => handleDropdownChange(e.target.value)}
                          className="w-full rounded-[12px] border border-[var(--invite-line)] bg-[var(--invite-cream)]/50 px-4 py-2.5 font-sans text-sm text-[var(--invite-brown)] outline-none transition-all duration-300 focus:border-[var(--invite-gold)] focus:bg-white focus:ring-2 focus:ring-[var(--invite-gold)]/20"
                        >
                          <option value="">Selecione uma opção...</option>
                          <option value="all">Todos os Eventos (Missa, Colação e Festa)</option>
                          <option value="missa">Apenas Missa de Formatura (10/08)</option>
                          <option value="colacao">Apenas Colação de Grau (11/08)</option>
                          <option value="festa">Apenas Festa de Formatura (22/08)</option>
                          <option value="missa_colacao">Missa de Formatura e Colação de Grau</option>
                          <option value="missa_festa">Missa de Formatura e Festa de Formatura</option>
                          <option value="colacao_festa">Colação de Grau e Festa de Formatura</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* ACOMPANHANTES */}
                  {attendanceStatus === "attending" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-3">
                        <h3 className="font-heading text-lg text-[var(--invite-brown)] font-bold flex items-center gap-2">
                          <Users className="size-4.5 text-[var(--invite-gold)]" />
                          Acompanhantes
                        </h3>
                        <hr className="mt-1.5 border-[var(--invite-line)]" />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-[var(--invite-brown-soft)]">
                            Número de acompanhantes
                          </label>
                          <select
                            className="w-full rounded-[12px] border border-[var(--invite-line)] bg-white px-4 py-2.5 text-sm text-[var(--invite-brown)] outline-none transition focus:border-[var(--invite-gold)]"
                            {...register("companions_count")}
                          >
                            {Array.from({ length: maxCompanions + 1 }, (_, number) => (
                              <option key={number} value={number}>
                                {number === 0 ? "Apenas eu" : `${number} acompanhante${number > 1 ? "s" : ""}`}
                              </option>
                            ))}
                          </select>
                        </div>

                        {companionsCount > 0 && (
                          <div className="grid gap-3 sm:grid-cols-2 animate-in fade-in duration-300">
                            {Array.from({ length: companionsCount }, (_, index) => (
                              <div key={`companion-${index}`}>
                                <label className="mb-1 flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-wider text-[var(--invite-brown-soft)]">
                                  Acompanhante {index + 1}
                                </label>
                                <input
                                  className="w-full rounded-[12px] border border-[var(--invite-line)] bg-transparent px-4 py-2.5 text-sm text-[var(--invite-brown)] outline-none transition focus:border-[var(--invite-gold)] focus:bg-[var(--invite-cream)]"
                                  placeholder="Nome completo do acompanhante"
                                  {...register(`companions_names.${index}` as const)}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* RECADO */}
                  <div>
                    <div className="mb-3">
                      <h3 className="font-heading text-lg text-[var(--invite-brown)] font-bold flex items-center gap-2">
                        <MessageSquare className="size-4.5 text-[var(--invite-gold)]" />
                        Deixe um Recado
                      </h3>
                      <hr className="mt-1.5 border-[var(--invite-line)]" />
                    </div>
                    <div>
                      <textarea
                        className="min-h-20 w-full rounded-[12px] border border-[var(--invite-line)] bg-transparent px-4 py-2.5 text-sm text-[var(--invite-brown)] outline-none transition focus:border-[var(--invite-gold)] focus:bg-[var(--invite-cream)]"
                        placeholder={inviteData.rsvp.messagePlaceholder}
                        {...register("notes")}
                      />
                    </div>
                  </div>

                  <button
                    className="w-full font-heading font-bold uppercase tracking-[0.2em] rounded-full text-white bg-[var(--invite-brown)] hover:bg-[var(--invite-brown-soft)] py-3 text-sm transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg disabled:opacity-50"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Enviando confirmação...
                      </>
                    ) : (
                      "Confirmar Presença"
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="text-center py-10 px-5 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200 mb-6 shadow-inner animate-bounce">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                
                <h3 className="font-heading text-3xl md:text-4xl text-[var(--invite-brown)] font-bold mb-4">
                  Confirmação Concluída!
                </h3>
                
                <p className="font-body text-base md:text-lg text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
                  Sua presença foi registrada com sucesso no sistema. Para finalizar, envie o comprovante diretamente via WhatsApp para a Vitória.
                </p>

                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full max-w-sm rounded-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-heading font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-[0.98] relative"
                >
                  <span className="absolute inset-0 rounded-full bg-[#25D366]/25 animate-ping pointer-events-none" />
                  <Phone className="w-5 h-5 fill-current" />
                  Finalizar pelo WhatsApp
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
