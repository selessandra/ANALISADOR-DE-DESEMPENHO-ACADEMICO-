"use strict";
/* UTILITÁRIOS FUNCIONAIS — funções genéricas e reutilizáveis (ordem superior) */

// Congela o objeto e tudo dentro dele (imutabilidade).
const deepFreeze = obj => {
  Object.values(obj).forEach(v => {
    if (typeof v === "object" && v !== null && !Object.isFrozen(v)) deepFreeze(v);
  });
  return Object.freeze(obj);
};

// Composição: pipe(f, g, h)(x) === h(g(f(x))) — da esquerda para a direita.
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
// Composição: compose(f, g, h)(x) === f(g(h(x))) — da direita para a esquerda.
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// map/filter/reduce "curriados": recebem a função primeiro e devolvem outra
// função que espera a coleção (funções de primeira classe + composição).
const map = fn => lista => lista.map(fn);
const filter = predicado => lista => lista.filter(predicado);
const reduce = (fn, inicial) => lista => lista.reduce(fn, inicial);

const prop = chave => obj => obj[chave];
const identidade = x => x;
const somar = (a, b) => a + b;
