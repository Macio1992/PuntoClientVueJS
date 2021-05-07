/* global describe, it, expect, beforeEach */

import { mount } from "@vue/test-utils";
import PuntoCard from "./PuntoCard.vue";

let wrapper;

describe("PuntoCard", () => {
  beforeEach(() => {
    wrapper = mount(PuntoCard);
  });

  it("should render one dot card when 'one' option is passed", async () => {
    await runTestForAllColors("one");
  });

  it("should render two dots card when 'two' option is passed", async () => {
    await runTestForAllColors("two");
  });

  it("should render three dots card when 'three' option is passed", async () => {
    await runTestForAllColors("three");
  });

  it("should render four dots card when 'four' option is passed", async () => {
    await runTestForAllColors("four");
  });

  it("should render five dots card when 'five' option is passed", async () => {
    await runTestForAllColors("five");
  });

  it("should render six dots card when 'six' option is passed", async () => {
    await runTestForAllColors("six");
  });

  it("should render seven dots card when 'seven' option is passed", async () => {
    await runTestForAllColors("seven");
  });

  it("should render eight dots card when 'eight' option is passed", async () => {
    await runTestForAllColors("eight");
  });

  it("should render nine dots card when 'nine' option is passed", async () => {
    await runTestForAllColors("nine");
  });
});

async function verifyDigitsWithColor(wrapper, option, color) {
  await wrapper.setProps({
    option,
    color,
  });

  await wrapper.vm.$nextTick();
  expect(wrapper.findAll(".puntoCard__dot").length).toBe(9);
  expect(wrapper.findAll(".puntoCard__dotWithColor").length).toBe(
    generateDotsAmount(option)
  );
  expect(wrapper.findAll(`.puntoCard__dotWithColor--${color}`).length).toBe(
    generateDotsAmount(option)
  );
}

function generateDotsAmount(option) {
  const digitWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return digitWords.indexOf(option) + 1;
}

async function runTestForAllColors(option) {
  wrapper = mount(PuntoCard, {
    props: {
      option,
      color: "red",
    },
  });

  await verifyDigitsWithColor(wrapper, option, "red");
  await verifyDigitsWithColor(wrapper, option, "green");
  await verifyDigitsWithColor(wrapper, option, "orange");
  await verifyDigitsWithColor(wrapper, option, "blue");
}
