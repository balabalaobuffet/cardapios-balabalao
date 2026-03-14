import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, ChevronLeft, Check, Sparkles, Star, Crown, Gift, Coffee, Cake, Utensils, GlassWater, Snowflake, ChefHat, Sandwich, Palette, Send, MessageCircle, Mail, CheckCircle2, Circle, Info, Clock, ArrowRight, X, Phone, User, Calendar, Baby, Hash } from "lucide-react";

// ─── CONFIG ──────────────────────────────────────────────
const WHATSAPP_NUMBER = "5514998962405";
const BUFFET_EMAIL = "balabalao@uol.com.br";

// ─── SHARED DATA ─────────────────────────────────────────
const SALGADOS_REG_OPTIONS = [
  { id: "esfiha-fechada-carne", name: "Esfiha fechada de carne" },
  { id: "esfiha-aberta-carne-catupiry", name: "Esfiha aberta de carne c/ catupiry" },
  { id: "esfiha-escarola", name: "Esfiha de escarola" },
  { id: "risoles-queijo", name: "Risoles de queijo" },
  { id: "trouxinha-frango-calabresa", name: "Trouxinha de frango com calabresa" },
  { id: "croquete-queijo-presunto", name: "Croquete de queijo e presunto" },
  { id: "trouxinha-calabresa", name: "Trouxinha de calabresa" },
  { id: "enroladinho-queijo-presunto", name: "Enroladinho de queijo e presunto" },
  { id: "quibe", name: "Quibe" },
];
const SALGADOS_FINOS_OPTIONS = [
  { id: "assado-palmito-gorgonzola", name: "Assado de palmito c/ gorgonzola" },
  { id: "croquete-carne-seca", name: "Croquete de carne seca" },
  { id: "empadinha-palmito", name: "Empadinha de palmito" },
  { id: "folhado-ricota-passas", name: "Folhado de ricota com passas" },
  { id: "assado-tomate-seco-alcaparra", name: "Assado de tomate seco com alcaparra" },
  { id: "trouxinha-ricota-presunto", name: "Trouxinha de ricota com presunto" },
];
const MASSAS_BOLO = [
  { id: "massa-chocolate", name: "Massa chocolate" },
  { id: "massa-branca", name: "Massa branca" },
];
const RECHEIOS_BASE = [
  { id: "recheio-brigadeiro", name: "Brigadeiro" },
  { id: "recheio-doce-leite-nozes", name: "Doce de leite com nozes" },
  { id: "recheio-leite-ninho", name: "Leite Ninho" },
  { id: "recheio-sonho-valsa", name: "Sonho de Valsa" },
  { id: "recheio-ouro-branco", name: "Ouro Branco" },
];
const RECHEIO_BOMBOM = { id: "recheio-bombom-crocante", name: "Bombom Crocante" };
const RECHEIO_TRUFADO = { id: "recheio-trufado", name: "Trufado" };
const RECHEIO_BRIG_MORANGO = { id: "recheio-brigadeiro-morango", name: "Brigadeiro com morango" };
const RECHEIO_DL_MORANGO = { id: "recheio-doce-leite-morango", name: "Doce de leite com morango" };
const RECHEIO_ABACAXI = { id: "recheio-abacaxi", name: "Abacaxi" };
const DOCINHOS_FULL = [
  { id: "brigadeiro-tradicional", name: "Brigadeiro tradicional" },
  { id: "brigadeiro-branco", name: "Brigadeiro branco" },
  { id: "brigadeiro-cafe", name: "Brigadeiro de café" },
  { id: "bicho-de-pe", name: "Bicho de pé" },
  { id: "beijinho-coco", name: "Beijinho de coco" },
  { id: "cajuzinho", name: "Cajuzinho" },
  { id: "brigadeiro-leite-ninho", name: "Brigadeiro Leite Ninho" },
  { id: "brigadeiro-leite-ninho-nutella", name: "Brigadeiro Leite Ninho c/ Nutella" },
  { id: "brigadeiro-doce-leite-nozes", name: "Brigadeiro doce de leite c/ nozes" },
];
const MASSAS_PRATO = [
  { id: "sofiateli", name: "Sofiateli" },
  { id: "rondelli", name: "Rondelli" },
  { id: "cannelloni", name: "Cannelloni" },
];
const MOLHOS = [
  { id: "molho-bechamel", name: "Molho Béchamel" },
  { id: "molho-sugo", name: "Molho de tomate ao Sugo" },
];
const SALGADOS_FIXOS_5 = [
  { id: "fritas", name: "Fritas" },
  { id: "bolinha-queijo", name: "Bolinha de queijo" },
  { id: "coxinha-frango", name: "Coxinha de frango" },
  { id: "mini-pizza", name: "Mini pizza" },
  { id: "enroladinho-salsicha", name: "Enroladinho de salsicha" },
];
const BEBIDAS_BASE = [
  { id: "agua", name: "Água com e sem gás" },
  { id: "suco-natural", name: "Suco natural" },
  { id: "refrigerantes", name: "Refrigerantes" },
];

// ─── PACKAGES DATA ───────────────────────────────────────
const PACKAGES_DATA = [
  {
    id: "formiguinha-1", name: "Formiguinha 1", cat: "promocionais",
    desc: "Pacote essencial com 7 variedades de salgados e bolo brigadeiro",
    obs: "Segunda a quarta (exceto feriados)",
    dur: { h: 3, m: 0, tol: 30 },
    tags: ["7 salgados", "3h de festa", "Bolo brigadeiro"],
    groups: [
      { id: "salgados", name: "Salgados", icon: "utensils", sections: [
        { id: "s-fix", name: "7 variedades de salgadinhos", type: "fixed", items: [
          { id: "fritas", name: "Fritas" }, { id: "bolinha-queijo", name: "Bolinha de queijo" },
          { id: "coxinha-frango", name: "Coxinha de frango" }, { id: "trouxinha-frango-calabresa", name: "Trouxinha de frango com calabresa" },
          { id: "mini-pizza", name: "Mini pizza" }, { id: "esfiha-carne", name: "Esfiha de carne" },
          { id: "mini-hotdog", name: "Mini hotdog" },
        ]},
      ]},
      { id: "bebidas", name: "Bebidas", icon: "glass", sections: [
        { id: "b-fix", name: "Bebidas", type: "fixed", items: [...BEBIDAS_BASE] },
      ]},
      { id: "doces", name: "Doces", icon: "candy", sections: [
        { id: "d-fix", name: "Docinhos", type: "fixed", items: [
          { id: "brigadeiro-tradicional", name: "Brigadeiro tradicional" },
          { id: "bicho-de-pe", name: "Bicho de pé" },
          { id: "beijinho-coco", name: "Beijinho de coco" },
        ]},
      ]},
      { id: "bolo", name: "Bolo", icon: "cake", sections: [
        { id: "bolo-fix", name: "Bolo", type: "fixed", items: [{ id: "bolo-brigadeiro", name: "Bolo Brigadeiro" }] },
      ]},
    ],
  },
  {
    id: "formiguinha-2", name: "Formiguinha 2", cat: "promocionais",
    desc: "Mais variedade com 8 salgados, lembrancinhas e meia hora extra de festa",
    obs: "Segunda a quinta (exceto feriados)",
    dur: { h: 3, m: 30, tol: 30 },
    tags: ["8 salgados", "3h30 de festa", "Lembrancinhas"],
    groups: [
      { id: "salgados", name: "Salgados", icon: "utensils", sections: [
        { id: "s-fix", name: "8 variedades de salgadinhos", type: "fixed", items: [
          { id: "fritas", name: "Fritas" }, { id: "bolinha-queijo", name: "Bolinha de queijo" },
          { id: "coxinha-frango", name: "Coxinha de frango" }, { id: "enroladinho-salsicha", name: "Enroladinho de salsicha" },
          { id: "trouxinha-frango-calabresa", name: "Trouxinha de frango com calabresa" },
          { id: "mini-pizza", name: "Mini pizza" }, { id: "esfiha-carne", name: "Esfiha de carne" },
          { id: "mini-hotdog", name: "Mini hotdog" },
        ]},
      ]},
      { id: "bebidas", name: "Bebidas", icon: "glass", sections: [
        { id: "b-fix", name: "Bebidas", type: "fixed", items: [...BEBIDAS_BASE] },
      ]},
      { id: "doces", name: "Doces", icon: "candy", sections: [
        { id: "d-fix", name: "Docinhos", type: "fixed", items: [
          { id: "brigadeiro-tradicional", name: "Brigadeiro tradicional" },
          { id: "bicho-de-pe", name: "Bicho de pé" },
          { id: "beijinho-coco", name: "Beijinho de coco" },
        ]},
      ]},
      { id: "bolo", name: "Bolo", icon: "cake", sections: [
        { id: "bolo-fix", name: "Bolo", type: "fixed", items: [{ id: "bolo-brigadeiro", name: "Bolo Brigadeiro" }] },
      ]},
      { id: "lembrancinhas", name: "Lembrancinhas", icon: "gift", sections: [
        { id: "l-fix", name: "Lembrancinhas", type: "fixed", items: [{ id: "bolas", name: "Bolas do Bala Balão" }] },
      ]},
    ],
  },
  {
    id: "formiguinha-3", name: "Formiguinha 3", cat: "promocionais",
    desc: "O promocional mais completo: 9 salgados e escolha de docinhos",
    obs: "Segunda a sexta (exceto feriados)",
    dur: { h: 3, m: 30, tol: 30 },
    tags: ["9 salgados", "3h30 de festa", "Escolha de doces", "Lembrancinhas"],
    groups: [
      { id: "salgados", name: "Salgados", icon: "utensils", sections: [
        { id: "s-fix", name: "9 variedades de salgadinhos", type: "fixed", items: [
          { id: "fritas", name: "Fritas" }, { id: "bolinha-queijo", name: "Bolinha de queijo" },
          { id: "coxinha-frango", name: "Coxinha de frango" }, { id: "enroladinho-salsicha", name: "Enroladinho de salsicha" },
          { id: "mini-pizza", name: "Mini pizza" }, { id: "esfiha-carne", name: "Esfiha de carne" },
          { id: "croquete-queijo-presunto", name: "Croquete de queijo e presunto" },
          { id: "mini-hotdog", name: "Mini hotdog" }, { id: "trouxinha-frango-calabresa", name: "Trouxinha de frango com calabresa" },
        ]},
      ]},
      { id: "bebidas", name: "Bebidas", icon: "glass", sections: [
        { id: "b-fix", name: "Bebidas", type: "fixed", items: [...BEBIDAS_BASE] },
      ]},
      { id: "doces", name: "Doces", icon: "candy", sections: [
        { id: "d-choice", name: "Docinhos", type: "choice", desc: "Escolha 3 variedades", required: true,
          rule: { mode: "pick", min: 3, max: 3 },
          options: [
            { id: "brigadeiro-tradicional", name: "Brigadeiro tradicional" },
            { id: "bicho-de-pe", name: "Bicho de pé" },
            { id: "beijinho-coco", name: "Beijinho de coco" },
            { id: "cajuzinho", name: "Cajuzinho" },
          ],
        },
      ]},
      { id: "bolo", name: "Bolo", icon: "cake", sections: [
        { id: "bolo-fix", name: "Bolo", type: "fixed", items: [{ id: "bolo-brigadeiro", name: "Bolo Brigadeiro" }] },
      ]},
      { id: "lembrancinhas", name: "Lembrancinhas", icon: "gift", sections: [
        { id: "l-fix", name: "Lembrancinhas", type: "fixed", items: [{ id: "bolas", name: "Bolas do Bala Balão" }] },
      ]},
    ],
  },
  // ── TRADICIONAIS ──
  {
    id: "formigueiro-1", name: "Formigueiro 1", cat: "tradicionais",
    desc: "11 salgados, bolo personalizado, torta salgada e mesa de café",
    obs: "Qualquer dia, inclusive finais de semana e feriados",
    dur: { h: 4, m: 0, tol: 30 },
    tags: ["11 salgados", "4h de festa", "Bolo personalizado", "Torta salgada", "Mesa do café"],
    groups: [
      { id: "salgados", name: "Salgados", icon: "utensils", sections: [
        { id: "s-fix", name: "6 salgados inclusos", type: "fixed", items: [
          { id: "fritas", name: "Fritas" }, { id: "bolinha-queijo", name: "Bolinha de queijo" },
          { id: "coxinha-frango", name: "Coxinha de frango" }, { id: "mini-pizza", name: "Mini pizza" },
          { id: "trouxinha-calabresa", name: "Trouxinha de calabresa" }, { id: "mini-hotdog", name: "Mini hotdog" },
        ]},
        { id: "s-choice", name: "Escolha mais 5 variedades", type: "choice", required: true,
          rule: { mode: "pick", min: 5, max: 5 },
          options: [
            { id: "esfiha-fechada-carne", name: "Esfiha fechada de carne" },
            { id: "esfiha-aberta-carne-catupiry", name: "Esfiha aberta de carne c/ catupiry" },
            { id: "croquete-queijo-presunto", name: "Croquete de queijo e presunto" },
            { id: "enroladinho-salsicha", name: "Enroladinho de salsicha" },
            { id: "enroladinho-queijo-presunto", name: "Enroladinho de queijo e presunto" },
            { id: "risoles-queijo", name: "Risoles de queijo" },
            { id: "trouxinha-ricota-presunto", name: "Trouxinha de ricota com presunto" },
            { id: "quibe", name: "Quibe" },
            { id: "trouxinha-frango-calabresa", name: "Trouxinha de frango com calabresa" },
          ],
        },
      ]},
      { id: "bebidas", name: "Bebidas", icon: "glass", sections: [
        { id: "b-fix", name: "Bebidas", type: "fixed", items: [...BEBIDAS_BASE] },
      ]},
      { id: "pratos", name: "Pratos", icon: "chef", sections: [
        { id: "p-fix", name: "Prato", type: "fixed", items: [{ id: "torta-salgada", name: "Torta salgada de frango com catupiry" }] },
      ]},
      { id: "bolo", name: "Bolo", icon: "cake", sections: [
        { id: "bolo-massa", name: "Massa do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 }, options: [...MASSAS_BOLO] },
        { id: "bolo-recheio", name: "Recheio do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 },
          options: [...RECHEIOS_BASE, RECHEIO_BOMBOM] },
      ]},
      { id: "doces", name: "Doces", icon: "candy", sections: [
        { id: "d-choice", name: "Docinhos", type: "choice", desc: "Servidos logo após o parabéns", required: true,
          rule: { mode: "pick", min: 3, max: 3 },
          options: [
            { id: "brigadeiro-tradicional", name: "Brigadeiro tradicional" },
            { id: "brigadeiro-branco", name: "Brigadeiro branco" },
            { id: "brigadeiro-doce-leite", name: "Brigadeiro de doce de leite" },
            { id: "bicho-de-pe", name: "Bicho de pé" },
            { id: "beijinho-coco", name: "Beijinho de coco" },
            { id: "cajuzinho", name: "Cajuzinho" },
          ],
        },
      ]},
      { id: "mesa-cafe", name: "Mesa do Café", icon: "coffee", sections: [
        { id: "mc-choice", name: "Mesa do Café", type: "choice", required: true,
          rule: { mode: "pick_one", min: 1, max: 1 },
          options: [
            { id: "torta-mousse-limao", name: "Torta mousse de limão" },
            { id: "folhado-doce-leite", name: "Folhado de doce de leite" },
          ],
        },
      ]},
      { id: "lembrancinhas", name: "Lembrancinhas", icon: "gift", sections: [
        { id: "l-fix", name: "Lembrancinhas", type: "fixed", items: [{ id: "bolas", name: "Bolas do Bala Balão" }] },
      ]},
    ],
  },
  {
    id: "formigueiro-2", name: "Formigueiro 2", cat: "tradicionais",
    desc: "13 salgados com finos, prato à escolha e docinhos gourmet",
    obs: "Qualquer dia, inclusive finais de semana e feriados",
    dur: { h: 4, m: 0, tol: 30 },
    tags: ["13 salgados", "Salgados finos", "Prato à escolha", "4h de festa", "Mesa do café"],
    groups: [
      { id: "salgados", name: "Salgados", icon: "utensils", sections: [
        { id: "s-fix", name: "5 salgados inclusos", type: "fixed", items: [...SALGADOS_FIXOS_5] },
        { id: "s-choice", name: "Escolha mais 6 variedades", type: "choice", required: true,
          rule: { mode: "pick", min: 6, max: 6 }, options: [...SALGADOS_REG_OPTIONS] },
        { id: "sf-choice", name: "Salgados Finos — escolha 2", type: "choice", required: true,
          rule: { mode: "pick", min: 2, max: 2 }, options: [...SALGADOS_FINOS_OPTIONS] },
      ]},
      { id: "bebidas", name: "Bebidas", icon: "glass", sections: [
        { id: "b-fix", name: "Bebidas", type: "fixed", items: [...BEBIDAS_BASE] },
      ]},
      { id: "pratos", name: "Pratos", icon: "chef", sections: [
        { id: "p-choice", name: "Prato principal", type: "choice", required: true,
          rule: { mode: "pick_one", min: 1, max: 1 },
          options: [
            { id: "sofiateli-molho-branco", name: "Sofiateli com molho branco maçaricado" },
            { id: "torta-salgada", name: "Torta salgada" },
          ],
        },
      ]},
      { id: "bolo", name: "Bolo", icon: "cake", sections: [
        { id: "bolo-massa", name: "Massa do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 }, options: [...MASSAS_BOLO] },
        { id: "bolo-recheio", name: "Recheio do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 },
          options: [...RECHEIOS_BASE, RECHEIO_BOMBOM, RECHEIO_TRUFADO] },
      ]},
      { id: "doces", name: "Doces", icon: "candy", sections: [
        { id: "d-choice", name: "Docinhos", type: "choice", desc: "Servidos logo após o parabéns", required: true,
          rule: { mode: "pick", min: 3, max: 3 },
          options: [
            { id: "brigadeiro-tradicional", name: "Brigadeiro tradicional" },
            { id: "brigadeiro-branco", name: "Brigadeiro branco" },
            { id: "bicho-de-pe", name: "Bicho de pé" },
            { id: "beijinho-coco", name: "Beijinho de coco" },
            { id: "cajuzinho", name: "Cajuzinho" },
            { id: "brigadeiro-leite-ninho", name: "Brigadeiro Leite Ninho" },
            { id: "brigadeiro-leite-ninho-nutella", name: "Brigadeiro Leite Ninho c/ Nutella" },
            { id: "brigadeiro-doce-leite-nozes", name: "Brigadeiro doce de leite c/ nozes" },
          ],
        },
      ]},
      { id: "mesa-cafe", name: "Mesa do Café", icon: "coffee", sections: [
        { id: "mc-choice", name: "Mesa do Café", type: "choice", required: true,
          rule: { mode: "pick_one", min: 1, max: 1 },
          options: [
            { id: "torta-mousse-limao", name: "Torta mousse de limão" },
            { id: "folhado-doce-leite", name: "Folhado de doce de leite" },
          ],
        },
      ]},
      { id: "lembrancinhas", name: "Lembrancinhas", icon: "gift", sections: [
        { id: "l-fix", name: "Lembrancinhas", type: "fixed", items: [{ id: "bolas", name: "Bolas do Bala Balão" }] },
      ]},
    ],
  },
  {
    id: "formigueiro-3", name: "Formigueiro 3", cat: "tradicionais",
    desc: "O tradicional mais completo: 14 salgados, 2 pratos, gelato e mesa de café reforçada",
    obs: "Qualquer dia, inclusive finais de semana e feriados",
    dur: { h: 4, m: 0, tol: 30 },
    tags: ["14 salgados", "Salgados finos", "2 pratos", "Gelato Borelli", "4h de festa"],
    groups: [
      { id: "salgados", name: "Salgados", icon: "utensils", sections: [
        { id: "s-fix", name: "5 salgados inclusos", type: "fixed", items: [...SALGADOS_FIXOS_5] },
        { id: "s-choice", name: "Escolha mais 6 variedades", type: "choice", required: true,
          rule: { mode: "pick", min: 6, max: 6 }, options: [...SALGADOS_REG_OPTIONS] },
        { id: "sf-choice", name: "Salgados Finos — escolha 3", type: "choice", required: true,
          rule: { mode: "pick", min: 3, max: 3 }, options: [...SALGADOS_FINOS_OPTIONS] },
      ]},
      { id: "bebidas", name: "Bebidas", icon: "glass", sections: [
        { id: "b-fix", name: "Bebidas", type: "fixed", items: [...BEBIDAS_BASE] },
      ]},
      { id: "pratos", name: "Pratos", icon: "chef", sections: [
        { id: "p-fix", name: "2 pratos inclusos", type: "fixed", items: [
          { id: "sofiateli", name: "Sofiateli com molho branco maçaricado" },
          { id: "torta-salgada", name: "Torta salgada" },
        ]},
      ]},
      { id: "bolo", name: "Bolo", icon: "cake", sections: [
        { id: "bolo-massa", name: "Massa do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 }, options: [...MASSAS_BOLO] },
        { id: "bolo-recheio", name: "Recheio do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 },
          options: [...RECHEIOS_BASE, RECHEIO_BOMBOM, RECHEIO_TRUFADO, RECHEIO_BRIG_MORANGO, RECHEIO_DL_MORANGO] },
      ]},
      { id: "doces", name: "Doces", icon: "candy", sections: [
        { id: "d-choice", name: "Docinhos", type: "choice", desc: "Servidos logo após o parabéns", required: true,
          rule: { mode: "pick", min: 3, max: 3 }, options: [...DOCINHOS_FULL] },
      ]},
      { id: "gelato", name: "Gelato", icon: "icecream", sections: [
        { id: "g-fix", name: "Gelato", type: "fixed", items: [{ id: "gelato-borelli", name: "Gelato Borelli" }] },
      ]},
      { id: "mesa-cafe", name: "Mesa do Café", icon: "coffee", sections: [
        { id: "mc-choice", name: "Mesa do Café — escolha 2", type: "choice", required: true,
          rule: { mode: "pick", min: 2, max: 2 },
          options: [
            { id: "torta-mousse-limao", name: "Torta mousse de limão" },
            { id: "folhado-doce-leite", name: "Folhado de doce de leite" },
            { id: "torta-banoffee", name: "Torta banoffee" },
            { id: "torta-chocolate", name: "Torta de chocolate" },
          ],
        },
      ]},
      { id: "lembrancinhas", name: "Lembrancinhas", icon: "gift", sections: [
        { id: "l-fix", name: "Lembrancinhas", type: "fixed", items: [{ id: "bolas", name: "Bolas do Bala Balão" }] },
      ]},
    ],
  },
  // ── PREMIUM ──
  {
    id: "bala-balao", name: "Festa Bala Balão", cat: "premium",
    desc: "Experiência premium: entrada, prato principal, sobremesa empratada, cerveja e gelato",
    obs: "Qualquer dia, inclusive finais de semana e feriados",
    dur: { h: 4, m: 30, tol: 30 },
    tags: ["14 salgados", "Salgados finos", "Menu 3 pratos", "Cerveja inclusa", "Gelato Borelli", "4h30 de festa"],
    groups: [
      { id: "salgados", name: "Salgados", icon: "utensils", sections: [
        { id: "s-fix", name: "5 salgados inclusos", type: "fixed", items: [...SALGADOS_FIXOS_5] },
        { id: "s-choice", name: "Escolha mais 6 variedades", type: "choice", required: true,
          rule: { mode: "pick", min: 6, max: 6 }, options: [...SALGADOS_REG_OPTIONS] },
        { id: "sf-choice", name: "Salgados Finos — escolha 3", type: "choice", required: true,
          rule: { mode: "pick", min: 3, max: 3 }, options: [...SALGADOS_FINOS_OPTIONS] },
      ]},
      { id: "bebidas", name: "Bebidas", icon: "glass", sections: [
        { id: "b-fix", name: "Bebidas", type: "fixed", items: [...BEBIDAS_BASE, { id: "cerveja", name: "Cerveja" }] },
      ]},
      { id: "menu-principal", name: "Menu Principal", icon: "chef", sections: [
        { id: "entrada-fix", name: "Entrada", type: "fixed", items: [{ id: "salada-mix", name: "Salada Mix de Folhas" }] },
        { id: "principal-massa", name: "Prato principal — escolha a massa", type: "choice", required: true,
          rule: { mode: "pick_one", min: 1, max: 1 }, options: [...MASSAS_PRATO] },
        { id: "principal-molho", name: "Escolha o molho", type: "choice", required: true,
          rule: { mode: "pick_one", min: 1, max: 1 }, options: [...MOLHOS] },
        { id: "sobremesa", name: "Sobremesa empratada", type: "choice", required: true,
          rule: { mode: "pick_one", min: 1, max: 1 },
          options: [
            { id: "mousse-chocolate", name: "Torta mousse de chocolate" },
            { id: "mousse-limao", name: "Torta mousse de limão" },
            { id: "mousse-maracuja", name: "Torta mousse de maracujá" },
          ],
        },
      ]},
      { id: "bolo", name: "Bolo", icon: "cake", sections: [
        { id: "bolo-massa", name: "Massa do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 }, options: [...MASSAS_BOLO] },
        { id: "bolo-recheio", name: "Recheio do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 },
          options: [...RECHEIOS_BASE, RECHEIO_TRUFADO, RECHEIO_ABACAXI, RECHEIO_BRIG_MORANGO, RECHEIO_DL_MORANGO] },
      ]},
      { id: "doces", name: "Doces", icon: "candy", sections: [
        { id: "d-choice", name: "Docinhos", type: "choice", desc: "Servidos logo após o parabéns", required: true,
          rule: { mode: "pick", min: 3, max: 3 }, options: [...DOCINHOS_FULL] },
      ]},
      { id: "gelato", name: "Gelato", icon: "icecream", sections: [
        { id: "g-fix", name: "Gelato", type: "fixed", items: [{ id: "gelato-borelli", name: "Gelato Borelli" }] },
      ]},
      { id: "lembrancinhas", name: "Lembrancinhas", icon: "gift", sections: [
        { id: "l-fix", name: "Lembrancinhas", type: "fixed", items: [{ id: "bolas", name: "Bolas do Bala Balão" }] },
      ]},
    ],
  },
  {
    id: "bala-balao-premier", name: "Bala Balão Premier", cat: "premium",
    desc: "A experiência mais exclusiva: mesa de frios, 5 pratos, espumante, gelato e doces personalizados",
    obs: "Qualquer dia, inclusive finais de semana e feriados",
    dur: { h: 4, m: 30, tol: 30 },
    tags: ["14 salgados", "Mesa de Pães e Frios", "Menu 5 pratos", "Cerveja e espumante", "Gelato Borelli", "Doces personalizados"],
    groups: [
      { id: "salgados", name: "Salgados", icon: "utensils", sections: [
        { id: "s-fix", name: "5 salgados inclusos", type: "fixed", items: [...SALGADOS_FIXOS_5] },
        { id: "s-choice", name: "Escolha mais 6 variedades", type: "choice", required: true,
          rule: { mode: "pick", min: 6, max: 6 }, options: [...SALGADOS_REG_OPTIONS] },
        { id: "sf-choice", name: "Salgados Finos — escolha 3", type: "choice", required: true,
          rule: { mode: "pick", min: 3, max: 3 }, options: [...SALGADOS_FINOS_OPTIONS] },
      ]},
      { id: "bebidas", name: "Bebidas", icon: "glass", sections: [
        { id: "b-fix", name: "Bebidas", type: "fixed", items: [
          ...BEBIDAS_BASE, { id: "cerveja", name: "Cerveja" }, { id: "espumante", name: "Espumante" },
        ]},
      ]},
      { id: "mesa-frios", name: "Mesa de Pães e Frios", icon: "sandwich", highlight: true, sections: [
        { id: "mf-fix", name: "Mesa de Pães e Frios", type: "fixed", items: [{ id: "mesa-paes-frios", name: "Mesa completa de Pães e Frios" }] },
      ]},
      { id: "menu-principal", name: "Menu Principal", icon: "chef", sections: [
        { id: "entrada-fix", name: "Entradas", type: "fixed", items: [
          { id: "salada-mix", name: "Salada Mix de Folhas" },
          { id: "mini-quiche", name: "Mini quiche" },
        ]},
        { id: "principal-tipo", name: "Prato principal — escolha o tipo", type: "choice", required: true,
          desc: "Massa com molho ou trouxinha de copa lombo",
          rule: { mode: "pick_one", min: 1, max: 1 },
          options: [
            { id: "opcao-massa", name: "Massa (escolher tipo e molho)" },
            { id: "opcao-copa-lombo", name: "Trouxinha de copa lombo com purê de mandioquinha" },
          ],
        },
        { id: "principal-massa-tipo", name: "Tipo de massa", type: "choice", required: false,
          rule: { mode: "pick_one", min: 1, max: 1 },
          conditionalOn: { sectionId: "principal-tipo", value: "opcao-massa" },
          options: [...MASSAS_PRATO] },
        { id: "principal-molho", name: "Escolha o molho", type: "choice", required: false,
          rule: { mode: "pick_one", min: 1, max: 1 },
          conditionalOn: { sectionId: "principal-tipo", value: "opcao-massa" },
          options: [...MOLHOS] },
        { id: "sobremesa", name: "Sobremesa empratada", type: "choice", required: true,
          rule: { mode: "pick_one", min: 1, max: 1 },
          options: [
            { id: "mousse-chocolate", name: "Torta mousse de chocolate" },
            { id: "mousse-limao", name: "Torta mousse de limão" },
            { id: "mousse-maracuja", name: "Torta mousse de maracujá" },
            { id: "tiramissu", name: "Tiramissu" },
          ],
        },
      ]},
      { id: "bolo", name: "Bolo", icon: "cake", sections: [
        { id: "bolo-massa", name: "Massa do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 }, options: [...MASSAS_BOLO] },
        { id: "bolo-recheio", name: "Recheio do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 },
          options: [...RECHEIOS_BASE, RECHEIO_TRUFADO, RECHEIO_ABACAXI, RECHEIO_BRIG_MORANGO, RECHEIO_DL_MORANGO] },
      ]},
      { id: "doces", name: "Doces", icon: "candy", sections: [
        { id: "d-choice", name: "Docinhos Tradicionais", type: "choice", desc: "Servidos logo após o parabéns", required: true,
          rule: { mode: "pick", min: 3, max: 3 }, options: [...DOCINHOS_FULL] },
      ]},
      { id: "doces-personalizados", name: "Doces Personalizados", icon: "palette", sections: [
        { id: "dp-fix", name: "Doces Personalizados", type: "fixed",
          items: [{ id: "doces-pers", name: "Doces personalizados na mesa de decoração do salão" }] },
      ]},
      { id: "gelato", name: "Gelato", icon: "icecream", sections: [
        { id: "g-fix", name: "Gelato", type: "fixed", items: [{ id: "gelato-borelli", name: "Gelato Borelli" }] },
      ]},
      { id: "lembrancinhas", name: "Lembrancinhas", icon: "gift", sections: [
        { id: "l-fix", name: "Lembrancinhas", type: "fixed", items: [{ id: "bolas", name: "Bolas do Bala Balão" }] },
      ]},
    ],
  },
];

const CATEGORIES = [
  { id: "promocionais", name: "Festas Promocionais", desc: "Pacotes com excelente custo-benefício para dias de semana", icon: "sparkles" },
  { id: "tradicionais", name: "Festas Tradicionais", desc: "Pacotes completos para qualquer dia da semana", icon: "party" },
  { id: "premium", name: "Festas Premium", desc: "A experiência mais sofisticada do Bala Balão", icon: "crown" },
];

// ─── UTILS ───────────────────────────────────────────────
const formatPhone = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
};
const formatDuration = (dur) => {
  let s = `${dur.h}h`;
  if (dur.m) s += `${dur.m}min`;
  return s + ` + ${dur.tol}min de tolerância`;
};

const getChoiceSections = (pkg) => {
  const result = [];
  pkg.groups.forEach(g => g.sections.forEach(s => {
    if (s.type === "choice") result.push(s);
  }));
  return result;
};

const isAllComplete = (pkg, selections) => {
  const sections = getChoiceSections(pkg);
  for (const s of sections) {
    if (s.conditionalOn) {
      const parentSel = selections[s.conditionalOn.sectionId] || [];
      if (!parentSel.includes(s.conditionalOn.value)) continue;
    }
    if (!s.required && !s.conditionalOn) continue;
    const sel = selections[s.id] || [];
    if (sel.length < s.rule.min) return false;
  }
  return true;
};

const buildMessage = (pkg, clientInfo, selections) => {
  let msg = `🎈 *BALA BALÃO BUFFET INFANTIL*\n📋 Escolhas do Cardápio\n\n`;
  msg += `👤 *Dados do Cliente*\nNome: ${clientInfo.name}\nTelefone: ${clientInfo.phone}\nE-mail: ${clientInfo.email}\n\n`;
  msg += `🎂 *Dados da Festa*\nData: ${clientInfo.date ? new Date(clientInfo.date + 'T12:00:00').toLocaleDateString('pt-BR') : ''}\nAniversariante: ${clientInfo.childName}\nIdade: ${clientInfo.childAge} anos\n\n`;
  msg += `🎉 *Pacote: ${pkg.name}*\n⏱ Duração: ${formatDuration(pkg.dur)}\n\n`;

  pkg.groups.forEach(g => {
    msg += `── ${g.name} ──\n`;
    g.sections.forEach(s => {
      if (s.type === "fixed") {
        s.items.forEach(it => { msg += `✅ ${it.name}\n`; });
      } else {
        if (s.conditionalOn) {
          const parentSel = selections[s.conditionalOn.sectionId] || [];
          if (!parentSel.includes(s.conditionalOn.value)) return;
        }
        const sel = selections[s.id] || [];
        if (sel.length > 0) {
          msg += `*${s.name}:*\n`;
          sel.forEach(optId => {
            const opt = s.options.find(o => o.id === optId);
            if (opt) msg += `• ${opt.name}\n`;
          });
        }
      }
    });
    msg += `\n`;
  });
  msg += `───────────────\nEnviado pelo sistema Bala Balão Buffet`;
  return msg;
};

// ─── THEME ───────────────────────────────────────────────
const T = {
  bg: "#FAFAF7", bgCard: "#FFFFFF", bgHover: "#F5F3EE",
  text: "#2D2926", textSec: "#8A8680", textLight: "#B5B0AA",
  accent: "#B8956A", accentLight: "#D4BC9A", accentBg: "#F8F3ED",
  green: "#7BA88E", greenBg: "#F0F7F2",
  red: "#C27C6B", redBg: "#FDF3F1",
  border: "#E8E4DF", borderLight: "#F0ECE7",
};

const ICON_MAP = {
  utensils: Utensils, glass: GlassWater, candy: Star, cake: Cake,
  gift: Gift, coffee: Coffee, icecream: Snowflake, chef: ChefHat,
  sandwich: Sandwich, palette: Palette,
};

// ─── STYLE TAG ───────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: ${T.bg}; color: ${T.text}; }
    .font-display { font-family: 'Cormorant Garamond', serif; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    @keyframes checkPop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
    @keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-60px) rotate(360deg); opacity: 0; } }
    .anim-fade-up { animation: fadeUp 0.5s ease-out both; }
    .anim-fade-in { animation: fadeIn 0.4s ease-out both; }
    .anim-scale-in { animation: scaleIn 0.4s ease-out both; }
    .anim-check { animation: checkPop 0.3s ease-out both; }
    .delay-1 { animation-delay: 0.05s; } .delay-2 { animation-delay: 0.1s; } .delay-3 { animation-delay: 0.15s; }
    .delay-4 { animation-delay: 0.2s; } .delay-5 { animation-delay: 0.25s; } .delay-6 { animation-delay: 0.3s; }
    .delay-7 { animation-delay: 0.35s; } .delay-8 { animation-delay: 0.4s; }
    input:focus, select:focus { outline: none; border-color: ${T.accent} !important; box-shadow: 0 0 0 3px ${T.accentBg}; }
    ::selection { background: ${T.accentLight}; color: ${T.text}; }
    ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
  `}</style>
);

// ─── UI COMPONENTS ───────────────────────────────────────
const Btn = ({ children, onClick, variant = "primary", disabled, full, small, icon: Icon }) => {
  const base = { fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
    border: "none", borderRadius: 12, display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: 8, transition: "all 0.2s ease", width: full ? "100%" : "auto", opacity: disabled ? 0.4 : 1,
    fontSize: small ? 14 : 16, padding: small ? "10px 20px" : "14px 28px",
  };
  const styles = {
    primary: { ...base, background: T.accent, color: "#fff" },
    secondary: { ...base, background: "transparent", color: T.accent, border: `1.5px solid ${T.accent}` },
    ghost: { ...base, background: "transparent", color: T.textSec, padding: small ? "8px 16px" : "12px 20px" },
  };
  return (
    <button style={styles[variant]} onClick={disabled ? undefined : onClick}
      onMouseEnter={e => { if (!disabled) { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}}
      onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>
      {children} {Icon && <Icon size={small ? 14 : 18} />}
    </button>
  );
};

const Badge = ({ children, variant = "default" }) => {
  const colors = {
    default: { bg: T.accentBg, color: T.accent },
    green: { bg: T.greenBg, color: T.green },
    red: { bg: T.redBg, color: T.red },
    muted: { bg: T.borderLight, color: T.textSec },
  };
  const c = colors[variant];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 20,
      fontSize: 12, fontWeight: 600, background: c.bg, color: c.color, letterSpacing: 0.3 }}>
      {children}
    </span>
  );
};

const ProgressIndicator = ({ current, total, labels }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "16px 0" }}>
    {Array.from({ length: total }, (_, i) => (
      <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, transition: "all 0.4s ease",
        background: i <= current ? T.accent : T.border }} />
    ))}
  </div>
);

const SectionIcon = ({ icon, size = 20 }) => {
  const Ic = ICON_MAP[icon];
  return Ic ? <Ic size={size} strokeWidth={1.5} color={T.accent} /> : <Star size={size} strokeWidth={1.5} color={T.accent} />;
};

// ─── PAGE WRAPPER ────────────────────────────────────────
const Page = ({ children, maxW = 560 }) => (
  <div className="anim-fade-in" style={{ minHeight: "100vh", background: T.bg, padding: "0 16px 40px" }}>
    <div style={{ maxWidth: maxW, margin: "0 auto" }}>{children}</div>
  </div>
);

const Header = ({ onBack, step, totalSteps, title }) => (
  <div style={{ position: "sticky", top: 0, zIndex: 50, background: T.bg, paddingTop: 16, paddingBottom: 8 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
      {onBack ? (
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 4, color: T.textSec, fontSize: 14, fontFamily: "'DM Sans'" }}>
          <ChevronLeft size={18} /> Voltar
        </button>
      ) : <div />}
      {step !== undefined && (
        <span style={{ fontSize: 12, color: T.textLight, fontWeight: 500 }}>
          Passo {step} de {totalSteps}
        </span>
      )}
    </div>
    {step !== undefined && <ProgressIndicator current={step - 1} total={totalSteps} />}
    {title && (
      <h1 className="font-display" style={{ fontSize: 28, fontWeight: 600, color: T.text, lineHeight: 1.2, marginTop: 8 }}>
        {title}
      </h1>
    )}
  </div>
);

// ─── LANDING PAGE ────────────────────────────────────────
const LandingPage = ({ onNavigate }) => (
  <Page>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", textAlign: "center", gap: 40, padding: "40px 0" }}>
      <div className="anim-fade-up">
        <h1 className="font-display" style={{ fontSize: 42, fontWeight: 700, color: T.text, lineHeight: 1.1, marginBottom: 8 }}>
          Bala Balão
        </h1>
        <p className="font-display" style={{ fontSize: 18, color: T.textSec, fontWeight: 400, fontStyle: "italic", marginBottom: 8 }}>
          Buffet Infantil
        </p>
        <div style={{ width: 48, height: 1.5, background: T.accent, margin: "24px auto", borderRadius: 1 }} />
        <p style={{ fontSize: 15, color: T.textSec, lineHeight: 1.6, maxWidth: 360, margin: "0 auto" }}>
          Monte o cardápio da sua festa com carinho e praticidade. Escolha os sabores que vão fazer esse dia ainda mais especial.
        </p>
      </div>
      <div className="anim-fade-up delay-3" style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 320 }}>
        <Btn full onClick={() => onNavigate("category")} icon={ArrowRight}>
          Já comprei minha festa
        </Btn>
        <Btn full variant="secondary" onClick={() => onNavigate("showcase")}>
          Quero conhecer os pacotes
        </Btn>
      </div>
    </div>
  </Page>
);

// ─── SHOWCASE PAGE ───────────────────────────────────────
const ShowcasePage = ({ onNavigate }) => {
  const [expanded, setExpanded] = useState(null);
  return (
    <Page maxW={640}>
      <Header onBack={() => onNavigate("landing")} title="Nossos Pacotes" />
      <p style={{ color: T.textSec, fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
        Conheça todas as opções de festa do Bala Balão. Quando estiver pronto, clique no botão abaixo para fazer suas escolhas.
      </p>
      {CATEGORIES.map(cat => (
        <div key={cat.id} className="anim-fade-up" style={{ marginBottom: 24 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 12, color: T.text }}>
            {cat.name}
          </h2>
          {PACKAGES_DATA.filter(p => p.cat === cat.id).map(pkg => (
            <div key={pkg.id} style={{ background: T.bgCard, borderRadius: 16, border: `1px solid ${T.border}`,
              marginBottom: 12, overflow: "hidden", transition: "all 0.2s" }}>
              <button onClick={() => setExpanded(expanded === pkg.id ? null : pkg.id)}
                style={{ width: "100%", padding: "16px 20px", background: "none", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'DM Sans'" }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 600, fontSize: 16, color: T.text }}>{pkg.name}</div>
                  <div style={{ fontSize: 13, color: T.textSec, marginTop: 2 }}>{pkg.desc}</div>
                </div>
                <ChevronRight size={18} color={T.textSec}
                  style={{ transition: "transform 0.2s", transform: expanded === pkg.id ? "rotate(90deg)" : "none" }} />
              </button>
              {expanded === pkg.id && (
                <div className="anim-fade-in" style={{ padding: "0 20px 16px", borderTop: `1px solid ${T.borderLight}` }}>
                  <div style={{ display: "flex", gap: 12, marginTop: 12, marginBottom: 12, fontSize: 13, color: T.textSec }}>
                    <span><Clock size={13} style={{ verticalAlign: -2, marginRight: 4 }} />{formatDuration(pkg.dur)}</span>
                  </div>
                  <div style={{ fontSize: 13, color: T.textSec, marginBottom: 4 }}>
                    <Info size={13} style={{ verticalAlign: -2, marginRight: 4 }} />
                    {pkg.obs}
                  </div>
                  {pkg.groups.map(g => (
                    <div key={g.id} style={{ marginTop: 14 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.accent, marginBottom: 6,
                        display: "flex", alignItems: "center", gap: 6 }}>
                        <SectionIcon icon={g.icon} size={14} /> {g.name}
                      </div>
                      {g.sections.map(s => (
                        <div key={s.id} style={{ marginBottom: 6 }}>
                          {s.type === "fixed" ? (
                            <div style={{ fontSize: 13, color: T.text, display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
                              {s.items.map((it, idx) => (
                                <span key={it.id} style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                                  <CheckCircle2 size={11} color={T.green} style={{ flexShrink: 0 }} />
                                  <span>{it.name}</span>
                                  {idx < s.items.length - 1 && <span style={{ color: T.border, margin: "0 2px" }}>·</span>}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div style={{ background: T.accentBg, borderRadius: 8, padding: "8px 12px" }}>
                              <div style={{ fontSize: 12, fontWeight: 600, color: T.accent, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                                ✎ {s.name}
                                {s.rule && <span style={{ fontWeight: 400, color: T.textSec }}>
                                  ({s.rule.mode === "pick_one" ? "escolha 1" : `escolha ${s.rule.max}`} de {s.options.length} opções)
                                </span>}
                              </div>
                              <div style={{ fontSize: 12, color: T.textSec }}>
                                {s.options.map((o, idx) => (
                                  <span key={o.id}>{o.name}{idx < s.options.length - 1 ? " · " : ""}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      <div style={{ textAlign: "center", padding: "24px 0 40px" }}>
        <Btn onClick={() => onNavigate("category")} icon={ArrowRight}>Fazer minhas escolhas</Btn>
      </div>
    </Page>
  );
};

// ─── CATEGORY SELECT ─────────────────────────────────────
const CategorySelectPage = ({ onNavigate, onSelect }) => {
  const catIcons = { promocionais: Sparkles, tradicionais: Star, premium: Crown };
  return (
    <Page>
      <Header onBack={() => onNavigate("landing")} step={1} totalSteps={5} title="Escolha a categoria" />
      <p style={{ color: T.textSec, fontSize: 15, marginBottom: 24 }}>
        Selecione o tipo de festa que você contratou.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CATEGORIES.map((cat, i) => {
          const Ic = catIcons[cat.id];
          return (
            <button key={cat.id} className={`anim-fade-up delay-${i + 1}`}
              onClick={() => { onSelect(cat.id); onNavigate("package"); }}
              style={{ background: T.bgCard, border: `1.5px solid ${T.border}`, borderRadius: 16,
                padding: "24px 20px", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 16, fontFamily: "'DM Sans'" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.accentBg,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Ic size={22} color={T.accent} strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16, color: T.text }}>{cat.name}</div>
                <div style={{ fontSize: 13, color: T.textSec, marginTop: 2 }}>{cat.desc}</div>
              </div>
              <ChevronRight size={18} color={T.textLight} />
            </button>
          );
        })}
      </div>
    </Page>
  );
};

// ─── PACKAGE SELECT ──────────────────────────────────────
const PackageSelectPage = ({ category, onNavigate, onSelect }) => {
  const pkgs = PACKAGES_DATA.filter(p => p.cat === category);
  const catName = CATEGORIES.find(c => c.id === category)?.name;
  return (
    <Page>
      <Header onBack={() => onNavigate("category")} step={2} totalSteps={5} title="Escolha o pacote" />
      <p style={{ color: T.textSec, fontSize: 15, marginBottom: 24 }}>{catName}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {pkgs.map((pkg, i) => (
          <button key={pkg.id} className={`anim-fade-up delay-${i + 1}`}
            onClick={() => { onSelect(pkg.id); onNavigate("info"); }}
            style={{ background: T.bgCard, border: `1.5px solid ${T.border}`, borderRadius: 16,
              padding: "20px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", fontFamily: "'DM Sans'" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            <div style={{ fontWeight: 600, fontSize: 17, color: T.text, marginBottom: 4 }}>{pkg.name}</div>
            <div style={{ fontSize: 13, color: T.textSec, marginBottom: 10 }}>{pkg.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {pkg.tags.slice(0, 4).map(t => <Badge key={t}>{t}</Badge>)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: T.textSec }}>
              <span><Clock size={12} style={{ verticalAlign: -1, marginRight: 3 }} />{formatDuration(pkg.dur)}</span>
            </div>
            <div style={{ fontSize: 12, color: T.textLight, marginTop: 6 }}>{pkg.obs}</div>
          </button>
        ))}
      </div>
    </Page>
  );
};

// ─── CLIENT INFO ─────────────────────────────────────────
const Field = ({ label, icon: Icon, value, onChange, type = "text", placeholder, error, ...rest }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: T.textSec, marginBottom: 6 }}>{label}</label>
    <div style={{ position: "relative" }}>
      {Icon && <Icon size={16} color={T.textLight} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: "100%", padding: Icon ? "12px 14px 12px 40px" : "12px 14px", fontSize: 15,
          border: `1.5px solid ${error ? T.red : T.border}`, borderRadius: 12, background: T.bgCard,
          color: T.text, fontFamily: "'DM Sans'", transition: "all 0.2s" }} {...rest} />
    </div>
    {error && <span style={{ fontSize: 12, color: T.red, marginTop: 4, display: "block" }}>{error}</span>}
  </div>
);

const ClientInfoPage = ({ info, setInfo, onNavigate, pkg }) => {
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (!info.name || info.name.length < 3) e.name = "Informe seu nome completo";
    if (!info.phone || info.phone.replace(/\D/g, "").length < 10) e.phone = "Informe um telefone válido";
    if (!info.email || !info.email.includes("@")) e.email = "Informe um e-mail válido";
    if (!info.date) e.date = "Informe a data da festa";
    if (!info.childName) e.childName = "Informe o nome do aniversariante";
    if (!info.childAge || info.childAge < 1 || info.childAge > 17) e.childAge = "Informe uma idade válida (1-17)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const upd = (k, v) => setInfo(prev => ({ ...prev, [k]: v }));
  const today = new Date().toISOString().split("T")[0];
  return (
    <Page>
      <Header onBack={() => onNavigate("package")} step={3} totalSteps={5} title="Seus dados" />
      <p style={{ color: T.textSec, fontSize: 15, marginBottom: 24 }}>
        Pacote selecionado: <strong style={{ color: T.text }}>{pkg.name}</strong>
      </p>
      <div className="anim-fade-up">
        <Field label="Seu nome completo" icon={User} value={info.name} placeholder="Maria Silva"
          onChange={e => upd("name", e.target.value)} error={errors.name} />
        <Field label="Telefone" icon={Phone} value={info.phone} placeholder="(14) 99999-9999"
          onChange={e => upd("phone", formatPhone(e.target.value))} error={errors.phone} />
        <Field label="E-mail" icon={Mail} value={info.email} placeholder="maria@email.com" type="email"
          onChange={e => upd("email", e.target.value)} error={errors.email} />
        <Field label="Data da festa" icon={Calendar} value={info.date} type="date" min={today}
          onChange={e => upd("date", e.target.value)} error={errors.date} />
        <Field label="Nome do aniversariante" icon={Baby} value={info.childName} placeholder="Lucca"
          onChange={e => upd("childName", e.target.value)} error={errors.childName} />
        <Field label="Idade do aniversariante" icon={Hash} value={info.childAge} type="number" min="1" max="17"
          placeholder="5" onChange={e => upd("childAge", e.target.value)} error={errors.childAge} />
      </div>
      <div style={{ paddingTop: 8 }}>
        <Btn full onClick={() => { if (validate()) onNavigate("menu"); }} icon={ArrowRight}>
          Continuar para o cardápio
        </Btn>
      </div>
    </Page>
  );
};

// ─── MENU CHOICES ────────────────────────────────────────
const FixedItemRow = ({ item, idx }) => (
  <div className={`anim-fade-up delay-${Math.min(idx + 1, 8)}`}
    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
      background: T.greenBg, borderRadius: 10, marginBottom: 6 }}>
    <CheckCircle2 size={16} color={T.green} />
    <span style={{ fontSize: 14, color: T.text }}>{item.name}</span>
    <Badge variant="green">incluso</Badge>
  </div>
);

const ChoiceOption = ({ option, selected, onToggle, disabled, mode }) => {
  const isSelected = selected;
  return (
    <button onClick={onToggle} disabled={disabled && !isSelected}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", width: "100%",
        background: isSelected ? T.accentBg : T.bgCard, border: `1.5px solid ${isSelected ? T.accent : T.border}`,
        borderRadius: 10, marginBottom: 6, cursor: disabled && !isSelected ? "not-allowed" : "pointer",
        transition: "all 0.2s", opacity: disabled && !isSelected ? 0.4 : 1, fontFamily: "'DM Sans'", textAlign: "left" }}
      onMouseEnter={e => { if (!disabled || isSelected) e.currentTarget.style.borderColor = T.accent; }}
      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = T.border; }}>
      <div style={{ width: 22, height: 22, borderRadius: mode === "pick_one" ? "50%" : 6,
        border: `2px solid ${isSelected ? T.accent : T.border}`, display: "flex", alignItems: "center",
        justifyContent: "center", transition: "all 0.2s", background: isSelected ? T.accent : "transparent", flexShrink: 0 }}>
        {isSelected && <Check size={14} color="#fff" className="anim-check" />}
      </div>
      <span style={{ fontSize: 14, color: T.text, fontWeight: isSelected ? 500 : 400 }}>{option.name}</span>
    </button>
  );
};

const Counter = ({ current, max, label }) => {
  const done = current >= max;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px",
      background: done ? T.greenBg : T.accentBg, borderRadius: 8, marginBottom: 10 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: done ? T.green : T.accent }}>
        {current} de {max}
      </span>
      {label && <span style={{ fontSize: 12, color: T.textSec }}>{label}</span>}
      {done && <CheckCircle2 size={14} color={T.green} />}
    </div>
  );
};

const MenuChoicesPage = ({ pkg, selections, setSelections, onNavigate }) => {
  const toggle = (sectionId, optionId, mode, max) => {
    setSelections(prev => {
      const current = prev[sectionId] || [];
      if (mode === "pick_one") return { ...prev, [sectionId]: [optionId] };
      if (current.includes(optionId)) return { ...prev, [sectionId]: current.filter(x => x !== optionId) };
      if (current.length >= max) return prev;
      return { ...prev, [sectionId]: [...current, optionId] };
    });
  };

  const isSectionVisible = (section) => {
    if (!section.conditionalOn) return true;
    const parentSel = selections[section.conditionalOn.sectionId] || [];
    return parentSel.includes(section.conditionalOn.value);
  };

  const allDone = isAllComplete(pkg, selections);

  return (
    <Page maxW={600}>
      <Header onBack={() => onNavigate("info")} step={4} totalSteps={5} title="Monte seu cardápio" />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        <Badge>{pkg.name}</Badge>
        <span style={{ fontSize: 13, color: T.textSec }}>{formatDuration(pkg.dur)}</span>
      </div>
      {pkg.groups.map((group, gi) => (
        <div key={group.id} className={`anim-fade-up delay-${Math.min(gi + 1, 6)}`}
          style={{ marginBottom: 28, background: T.bgCard, borderRadius: 16, border: `1px solid ${T.border}`,
            padding: "20px", overflow: "hidden", ...(group.highlight ? { borderColor: T.accent, boxShadow: `0 0 0 1px ${T.accent}` } : {}) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.accentBg,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SectionIcon icon={group.icon} size={18} />
            </div>
            <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: T.text }}>{group.name}</h3>
            {group.highlight && <Badge>destaque</Badge>}
          </div>
          {group.sections.map(section => {
            if (!isSectionVisible(section)) return null;
            const sel = selections[section.id] || [];
            if (section.type === "fixed") {
              return (
                <div key={section.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.textSec, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>
                    {section.name}
                  </div>
                  {section.items.map((item, ii) => <FixedItemRow key={item.id} item={item} idx={ii} />)}
                </div>
              );
            }
            const { mode, max } = section.rule;
            const atLimit = sel.length >= max;
            return (
              <div key={section.id} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.textSec, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>
                  {section.name}
                </div>
                {section.desc && <p style={{ fontSize: 13, color: T.textSec, marginBottom: 8 }}>{section.desc}</p>}
                <Counter current={sel.length} max={max} label={atLimit ? "completo" : "selecionados"} />
                {section.options.map(opt => (
                  <ChoiceOption key={opt.id} option={opt} mode={mode}
                    selected={sel.includes(opt.id)} disabled={atLimit}
                    onToggle={() => toggle(section.id, opt.id, mode, max)} />
                ))}
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ position: "sticky", bottom: 0, padding: "16px 0", background: T.bg }}>
        <Btn full onClick={() => onNavigate("summary")} disabled={!allDone} icon={ArrowRight}>
          {allDone ? "Revisar minhas escolhas" : "Complete todas as seleções"}
        </Btn>
      </div>
    </Page>
  );
};

// ─── SUMMARY PAGE ────────────────────────────────────────
const SummaryPage = ({ pkg, clientInfo, selections, onNavigate }) => {
  const getOptionName = (section, optId) => {
    const opt = section.options?.find(o => o.id === optId);
    return opt?.name || optId;
  };
  return (
    <Page maxW={600}>
      <Header onBack={() => onNavigate("menu")} step={5} totalSteps={5} title="Revise suas escolhas" />

      {/* Client info card */}
      <div className="anim-fade-up" style={{ background: T.bgCard, borderRadius: 16, border: `1px solid ${T.border}`, padding: "20px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600 }}>Dados do Cliente</h3>
          <Btn small variant="ghost" onClick={() => onNavigate("info")}>Editar</Btn>
        </div>
        <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.8 }}>
          <div><strong style={{ color: T.text }}>{clientInfo.name}</strong></div>
          <div>{clientInfo.phone} · {clientInfo.email}</div>
          <div>Festa: {clientInfo.date ? new Date(clientInfo.date + 'T12:00:00').toLocaleDateString('pt-BR') : ''}</div>
          <div>Aniversariante: {clientInfo.childName}, {clientInfo.childAge} anos</div>
        </div>
      </div>

      {/* Package info */}
      <div className="anim-fade-up delay-1" style={{ background: T.accentBg, borderRadius: 16, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 24 }}>🎉</span>
        <div>
          <div style={{ fontWeight: 600, color: T.text }}>{pkg.name}</div>
          <div style={{ fontSize: 13, color: T.textSec }}>{formatDuration(pkg.dur)}</div>
        </div>
      </div>

      {/* Menu sections */}
      {pkg.groups.map((group, gi) => (
        <div key={group.id} className={`anim-fade-up delay-${Math.min(gi + 2, 8)}`}
          style={{ background: T.bgCard, borderRadius: 16, border: `1px solid ${T.border}`, padding: "16px 20px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <SectionIcon icon={group.icon} size={16} />
            <h4 style={{ fontSize: 14, fontWeight: 600, color: T.accent, textTransform: "uppercase", letterSpacing: 0.5 }}>{group.name}</h4>
          </div>
          {group.sections.map(section => {
            if (section.conditionalOn) {
              const parentSel = selections[section.conditionalOn.sectionId] || [];
              if (!parentSel.includes(section.conditionalOn.value)) return null;
            }
            return (
              <div key={section.id} style={{ marginBottom: 8 }}>
                {section.type === "fixed" ? (
                  <div style={{ fontSize: 14, color: T.textSec }}>
                    {section.items.map((it, i) => (
                      <span key={it.id}>{it.name}{i < section.items.length - 1 ? " · " : ""}</span>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 12, color: T.textLight, marginBottom: 4 }}>{section.name}:</div>
                    <div style={{ fontSize: 14, color: T.text }}>
                      {(selections[section.id] || []).map((optId, i, arr) => (
                        <span key={optId} style={{ fontWeight: 500 }}>
                          {getOptionName(section, optId)}{i < arr.length - 1 ? " · " : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      <div style={{ display: "flex", gap: 12, paddingTop: 16 }}>
        <Btn full variant="secondary" onClick={() => onNavigate("menu")}>Editar cardápio</Btn>
        <Btn full onClick={() => onNavigate("send")} icon={Send}>Enviar</Btn>
      </div>
    </Page>
  );
};

// ─── SEND PAGE ───────────────────────────────────────────
const SendPage = ({ pkg, clientInfo, selections, onNavigate }) => {
  const msg = buildMessage(pkg, clientInfo, selections);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <Page>
      <Header onBack={() => onNavigate("summary")} title="Enviar escolhas" />
      <p style={{ color: T.textSec, fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
        Tudo pronto! Envie suas escolhas diretamente para o Bala Balão Buffet pelo WhatsApp.
      </p>
      <div className="anim-fade-up" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ background: "#25D366", borderRadius: 16, padding: "20px", display: "flex", alignItems: "center",
            gap: 16, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,211,102,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            <MessageCircle size={28} color="#fff" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 16, color: "#fff" }}>Enviar por WhatsApp</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Abre o WhatsApp com a mensagem pronta</div>
            </div>
          </div>
        </a>
      </div>

      {/* Preview */}
      <div className="anim-fade-up delay-2" style={{ marginTop: 28 }}>
        <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Prévia da mensagem
        </h3>
        <div style={{ background: T.bgCard, borderRadius: 16, border: `1px solid ${T.border}`, padding: "16px 20px",
          fontSize: 13, color: T.textSec, whiteSpace: "pre-wrap", lineHeight: 1.6, maxHeight: 300, overflowY: "auto", fontFamily: "monospace" }}>
          {msg}
        </div>
      </div>

      <div style={{ textAlign: "center", paddingTop: 24 }}>
        <Btn variant="ghost" onClick={() => onNavigate("confirmation")}>
          Já enviei, concluir →
        </Btn>
      </div>
    </Page>
  );
};

// ─── CONFIRMATION ────────────────────────────────────────
const ConfirmationPage = ({ onNavigate }) => (
  <Page>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", textAlign: "center", gap: 24 }}>
      <div className="anim-scale-in" style={{ width: 80, height: 80, borderRadius: "50%", background: T.greenBg,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CheckCircle2 size={40} color={T.green} />
      </div>
      <div className="anim-fade-up delay-2">
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: T.text, marginBottom: 8 }}>
          Tudo certo!
        </h1>
        <p style={{ fontSize: 15, color: T.textSec, lineHeight: 1.6, maxWidth: 340, margin: "0 auto" }}>
          Suas escolhas foram organizadas e enviadas para o Bala Balão Buffet. Entraremos em contato para confirmar tudo.
        </p>
      </div>
      <div className="anim-fade-up delay-4" style={{ width: 48, height: 1.5, background: T.accent, borderRadius: 1 }} />
      <div className="anim-fade-up delay-5">
        <p style={{ fontSize: 14, color: T.textSec, marginBottom: 20 }}>
          Obrigado por escolher o Bala Balão!
        </p>
        <Btn variant="secondary" onClick={() => onNavigate("landing")}>Voltar ao início</Btn>
      </div>
    </div>
  </Page>
);

// ─── MAIN APP ────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [category, setCategory] = useState(null);
  const [packageId, setPackageId] = useState(null);
  const [clientInfo, setClientInfo] = useState({ name: "", phone: "", email: "", date: "", childName: "", childAge: "" });
  const [selections, setSelections] = useState({});

  const pkg = PACKAGES_DATA.find(p => p.id === packageId);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navigate = (p) => {
    if (p === "landing") {
      setCategory(null); setPackageId(null); setClientInfo({ name: "", phone: "", email: "", date: "", childName: "", childAge: "" }); setSelections({});
    }
    if (p === "category") { setPackageId(null); setSelections({}); }
    setPage(p);
    scrollTop();
  };

  return (
    <div>
      <GlobalStyle />
      {page === "landing" && <LandingPage onNavigate={navigate} />}
      {page === "showcase" && <ShowcasePage onNavigate={navigate} />}
      {page === "category" && <CategorySelectPage onNavigate={navigate} onSelect={setCategory} />}
      {page === "package" && <PackageSelectPage category={category} onNavigate={navigate} onSelect={(id) => { setPackageId(id); setSelections({}); }} />}
      {page === "info" && pkg && <ClientInfoPage info={clientInfo} setInfo={setClientInfo} onNavigate={navigate} pkg={pkg} />}
      {page === "menu" && pkg && <MenuChoicesPage pkg={pkg} selections={selections} setSelections={setSelections} onNavigate={navigate} />}
      {page === "summary" && pkg && <SummaryPage pkg={pkg} clientInfo={clientInfo} selections={selections} onNavigate={navigate} />}
      {page === "send" && pkg && <SendPage pkg={pkg} clientInfo={clientInfo} selections={selections} onNavigate={navigate} />}
      {page === "confirmation" && <ConfirmationPage onNavigate={navigate} />}
    </div>
  );
}
