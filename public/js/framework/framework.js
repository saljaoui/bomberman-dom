import { addCustomEventListener } from "./event.js";

const Framework = (function () {
  const state = [];
  let stateIndex = 0;

  function useState(initialValue) {
    const currentIndex = stateIndex;
    state[currentIndex] = state[currentIndex] !== undefined ? state[currentIndex] : initialValue;

    function setState(newValue) {
      state[currentIndex] = newValue;
      rerender();
    }

    stateIndex++;
    return [state[currentIndex], setState];
  }

  const effects = [];
  let effectsIndex = 0;

  function useEffect(callback, dependency) {
    const oldDependency = effects[effectsIndex];
    let hasChanged = true;

    if (oldDependency) {
      hasChanged = dependency.some((dep, i) => !Object.is(dep, oldDependency[i]));
    }

    if (hasChanged) {
      callback();
    }

    effects[effectsIndex] = dependency;
    effectsIndex++;
  }

  function jsx(tag, attrs, ...children) {
    if (typeof tag === "function") {
      return tag({ ...attrs, children });
    }

    return { tag, attrs: attrs || {}, children };
  }

  function createElement(node) {
    if (["string", "number"].includes(typeof node)) {
      return document.createTextNode(node.toString());
    }

    const element = document.createElement(node.tag);

    for (const [key, value] of Object.entries(node.attrs)) {
      if (key.startsWith("on") && typeof value === "function") {
        // addCustomEventListener(element, key.slice(2).toLowerCase(), value); // 👈🏼 hade event li drti a omar welah ma fhmt 7aja
        const event = key.slice(2).toLowerCase();
        element.addEventListener(event, value);
      } else {
        if (key === 'className') {
          element.setAttribute('class', value);
        } else {
          element.setAttribute(key, value);
        }
    }
}

    for (const child of node.children.flat()) {
      element.appendChild(createElement(child));
    }

    return element;
  }

  let rootContainer = null;
  let App = null;

  function rerender() {
    if (rootContainer && App) {
      stateIndex = 0;
      effectsIndex = 0;
      rootContainer.innerHTML = "";
      const vnode = App;
      const dom = createElement(vnode);
      rootContainer.appendChild(dom);
    }
  }

  function render(component, container) {
    App = component;
    rootContainer = container;
    rerender();
  }

  return {
    useState,
    useEffect,
    jsx,
    createElement,
    render,
    setApp: function (app) {
      App = app;
    },
  };
})();

export const { useState, useEffect, jsx, createElement, render, setApp } = Framework;
